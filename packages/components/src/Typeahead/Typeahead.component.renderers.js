import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DebounceInput from 'react-debounce-input';
import classNames from 'classnames';
import { Popper } from 'react-popper';

import Icon from '../Icon';
import CircularProgress from '../CircularProgress';
import Emphasis from '../Emphasis';
import theme from './Typeahead.scss';

export function renderInputComponent(props) {
	const {
		caret,
		key,
		debounceMinLength,
		debounceTimeout,
		icon,
		inputRef,
		disabled,
		readOnly,
		...rest
	} = props;

	const hasCaret = caret && !disabled && !readOnly;
	const hasIcon = icon || hasCaret;
	const typeaheadContainerIconClasses = classNames(
		'tc-typeahead-typeahead-input-icon',
		theme['typeahead-input-container'],
		hasIcon && theme['typeahead-input-icon'],
		hasCaret && theme['typeahead-input-caret'],
	);
	return (
		<div className={typeaheadContainerIconClasses}>
			<ControlLabel srOnly htmlFor={key}>
				Search
			</ControlLabel>
			{debounceMinLength || debounceTimeout ? (
				<DebounceInput
					autoFocus
					{...rest}
					id={key}
					disabled={disabled}
					readOnly={readOnly}
					debounceTimeout={debounceTimeout}
					element={FormControl}
					minLength={debounceMinLength}
					inputRef={node => {
						// eslint-disable-next-line react/no-find-dom-node
						inputRef.current = ReactDOM.findDOMNode(node);
					}}
				/>
			) : (
				<FormControl
					autoFocus
					{...rest}
					id={key}
					disabled={disabled}
					readOnly={readOnly}
					inputRef={inputRef}
				/>
			)}
			{hasIcon && (
				<div className={classNames(theme['icon-cls'], hasCaret && theme['icon-caret'])}>
					{icon && <Icon {...icon} />}
					{hasCaret && <Icon name="talend-caret-down" />}
				</div>
			)}
		</div>
	);
}

renderInputComponent.propTypes = {
	key: PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	icon: PropTypes.shape({
		name: PropTypes.string,
		title: PropTypes.string,
	}),
	inputRef: PropTypes.func,
	caret: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
};

function computePopperPosition(data) {
	const GAP = 45; // the offset between the end of items container and screen boundaries
	const inputDimensions = data.offsets.reference;
	const { top, height } = inputDimensions;
	const offsetTop = top - GAP;
	const offsetBottom = window.innerHeight - top - height - GAP;
	const placements = data.placement.split('-');
	let newPlacement = data.placement;
	if (placements[0] === 'top' && offsetBottom > offsetTop) {
		newPlacement = `bottom-${placements[1]}`;
	}
	const maxHeight = newPlacement.includes('top') ? offsetTop : offsetBottom;

	return {
		...data,
		placement: newPlacement,
		styles: {
			...data.styles,
			width: inputDimensions.width,
			maxHeight,
		},
	};
}

export function renderItemsContainerFactory(
	items,
	noResultText,
	searching,
	searchingText,
	loading,
	loadingText,
	inputRef,
	render = content => content,
) {
	const isShown = items;
	const noResult = items && !items.length;

	function ItemsContainerComponent({ containerProps, children }) {
		if (!isShown) {
			return undefined;
		}

		const containerClassName = classNames(containerProps.className, theme['items-container'], {
			[theme['container-open']]: searching || noResult,
		});

		let content;
		if (searching) {
			content = (
				<div key="searching" className={`${theme['is-searching']} is-searching`}>
					{searchingText}
					<CircularProgress />
				</div>
			);
		} else if (noResult && loading) {
			content = (
				<div key="loading" className={`${theme['is-loading']} is-loading`}>
					{loadingText}
				</div>
			);
		} else if (noResult) {
			content = (
				<div key="no-result" className={`${theme['no-result']} no-result`}>
					{noResultText}
				</div>
			);
		} else {
			content = children;
		}

		return (
			<Popper
				modifiers={{
					hide: {
						enabled: false,
					},
					preventOverflow: {
						enabled: false,
					},
					shift: {
						enabled: false,
					},
					computePosition: {
						enabled: true,
						fn: computePopperPosition,
					},
				}}
				positionFixed
				boundariesElement="viewport"
				referenceElement={inputRef.current}
				placement="bottom-start"
			>
				{({ placement = '', ref, scheduleUpdate, style }) => {
					if (placement.includes('top')) {
						// @see https://github.com/FezVrasta/react-popper/issues/283#issuecomment-512879262
						scheduleUpdate();
					}

					return (
						<div
							className={containerClassName}
							id={containerProps.id}
							key={containerProps.key}
							ref={ref}
							role={containerProps.role}
							style={style}
						>
							<div
								ref={containerProps.ref}
								className={theme['items-body']}
								style={{ maxHeight: style.maxHeight }}
							>
								{render(
									content,
									{
										isShown,
										loading,
										noResult,
										searching,
									},
									containerProps.ref,
								)}
							</div>
						</div>
					);
				}}
			</Popper>
		);
	}

	ItemsContainerComponent.propTypes = {
		containerProps: PropTypes.object,
		children: PropTypes.node,
	};

	return ItemsContainerComponent;
}

export function renderSectionTitle(section) {
	if (section && (section.icon || section.title)) {
		return (
			<div className={classNames(theme['section-header'], 'tc-typeahead-section-header')}>
				{section.icon && <Icon name={section.icon.name} title={section.icon.title} />}
				<span
					className={classNames(theme['section-header-title'], 'tc-typeahead-section-header-title')}
				>
					{section.title}
				</span>
			</div>
		);
	}
	return null;
}

export function renderItem(item, { value, ...rest }) {
	let title;
	let description;
	if (typeof item === 'string') {
		title = item;
	} else {
		title = (item.title || item.name || '').trim();
		description = item.description;
	}
	return (
		<div
			className={classNames(theme.item, {
				[theme.disabled]: item.disabled,
				[theme.selected]: value === title,
			})}
			title={title}
			data-feature={rest['data-feature']}
		>
			{get(item, 'icon') && <Icon className={theme['item-icon']} {...item.icon} />}
			<div className={theme['item-text']}>
				<span className={classNames(theme['item-title'], 'tc-typeahead-item-title')}>
					<Emphasis value={value} text={title} />
				</span>
				{description && (
					<p className={classNames(theme['item-description'], 'tc-typeahead-item-description')}>
						<Emphasis value={value} text={description} />
					</p>
				)}
			</div>
		</div>
	);
}
