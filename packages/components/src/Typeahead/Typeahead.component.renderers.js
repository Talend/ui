import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DebounceInput from 'react-debounce-input';
import classNames from 'classnames';
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
			{get(props, 'selecteditem.icon') && (
				<Icon {...props.selecteditem.icon} className={theme['item-icon']} />
			)}
			{debounceMinLength || debounceTimeout ? (
				<DebounceInput
					id={key}
					{...rest}
					autoFocus
					disabled={disabled}
					readOnly={readOnly}
					debounceTimeout={debounceTimeout}
					element={FormControl}
					minLength={debounceMinLength}
					ref={inputRef}
				/>
			) : (
				<FormControl
					id={key}
					autoFocus
					disabled={disabled}
					readOnly={readOnly}
					inputRef={inputRef}
					{...rest}
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
	selecteditem: PropTypes.object,
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
	render = content => content,
) {
	const isShown = items;
	const noResult = items && !items.length;

	function ItemsContainerComponent({ containerProps, children }) {
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
			<div
				className={containerClassName}
				id={containerProps.id}
				key={containerProps.key}
				ref={containerProps.ref}
				role={containerProps.role}
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
			className={classNames(theme.item, item.className, {
				[theme.disabled]: item.disabled,
				[theme.selected]: value === title,
			})}
			title={title}
			data-feature={rest['data-feature']}
		>
			{item.icon && <Icon {...item.icon} className={theme['item-icon']} />}
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
