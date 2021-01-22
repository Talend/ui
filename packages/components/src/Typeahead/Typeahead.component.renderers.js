import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DebounceInput from 'react-debounce-input';
import classNames from 'classnames';

import { getTheme } from '../theme';
import Icon from '../Icon';
import CircularProgress from '../CircularProgress';
import Emphasis from '../Emphasis';
import theme from './Typeahead.scss';

const css = getTheme(theme);

export function renderInputComponent(props) {
	const {
		caret,
		key,
		debounceMinLength,
		debounceTimeout,
		icon,
		setReferenceElement,
		disabled,
		readOnly,
		...rest
	} = props;

	const hasCaret = caret && !disabled && !readOnly;
	const typeaheadContainerIconClasses = classNames(
		'tc-typeahead-typeahead-input-icon',
		theme['typeahead-input-container'],
		icon && theme['typeahead-input-icon'],
		hasCaret && theme['typeahead-input-caret'],
	);
	return (
		<div className={typeaheadContainerIconClasses}>
			<ControlLabel srOnly htmlFor={key}>
				Search
			</ControlLabel>
			{icon && (
				<div className={css('icon-cls', { 'icon-caret': hasCaret })}>
					{icon && <Icon {...icon} />}
				</div>
			)}
			{debounceMinLength || debounceTimeout ? (
				<DebounceInput
					autoFocus
					id={key}
					{...rest}
					disabled={disabled}
					readOnly={readOnly}
					debounceTimeout={debounceTimeout}
					element={FormControl}
					minLength={debounceMinLength}
					inputRef={node => {
						// eslint-disable-next-line react/no-find-dom-node
						setReferenceElement(ReactDOM.findDOMNode(node));
					}}
				/>
			) : (
				<FormControl
					id={key}
					autoFocus
					{...rest}
					disabled={disabled}
					readOnly={readOnly}
					inputRef={setReferenceElement}
				/>
			)}
			{hasCaret && (
				<div className={css('icon-cls', { 'icon-caret': hasCaret })}>
					<Icon name="talend-caret-down" />
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

export function renderItemsContainerFactory(
	items,
	noResultText,
	searching,
	searchingText,
	loading,
	loadingText,
	referenceElement,
	render = content => content,

	setPopperElement,
	styles,
	attributes,
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
					<CircularProgress />
					<span>{searchingText}</span>
				</div>
			);
		} else if (noResult && loading) {
			content = (
				<div key="loading" className={`${theme['is-loading']} is-loading`}>
					<span>{loadingText}</span>
				</div>
			);
		} else if (noResult) {
			content = (
				<div key="no-result" className={`${theme['no-result']} no-result`}>
					<Icon name="talend-fieldglass" title={noResultText} />
					<span>{noResultText}</span>
				</div>
			);
		} else {
			content = children;
		}

		return (
			<div
				className={containerClassName}
				id={containerProps.id}
				key={containerProps.key}
				role={containerProps.role}
				ref={setPopperElement}
				style={styles.popper}
				{...attributes.popper}
			>
				<div
					ref={containerProps.ref}
					className={theme['items-body']}
					style={{ maxHeight: styles.popper.maxHeight }}
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
	}

	ItemsContainerComponent.propTypes = {
		containerProps: PropTypes.object,
		children: PropTypes.node,
	};

	return ItemsContainerComponent;
}

export function renderSectionTitle(section) {
	if (section && (section.icon || section.title)) {
		const { hint } = section;
		return (
			<div className={css('section-header', 'tc-typeahead-section-header')}>
				{section.icon && <Icon name={section.icon.name} title={section.icon.title} />}
				<span
					className={css('section-header-title', 'tc-typeahead-section-header-title', { hint })}
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
				[theme.multiline]: title && description,
			})}
			title={title}
			data-feature={item['data-feature'] || rest['data-feature']}
		>
			{get(item, 'icon') && <Icon className={theme['item-icon']} {...item.icon} />}
			<div className={theme['item-text']}>
				<span className={css('item-title', 'tc-typeahead-item-title')}>
					<Emphasis value={value} text={title} />
				</span>
				{description && (
					<p className={css('item-description', 'tc-typeahead-item-description')}>
						<Emphasis value={value} text={description} />
					</p>
				)}
			</div>
		</div>
	);
}
