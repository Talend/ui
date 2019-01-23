import PropTypes from 'prop-types';
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DebounceInput from 'react-debounce-input';
import classNames from 'classnames';
import Icon from '../Icon';
import CircularProgress from '../CircularProgress';
import Emphasis from '../Emphasis';
import theme from './Typeahead.scss';

export function renderInputComponent(props) {
	const { caret, key, debounceMinLength, debounceTimeout, icon, inputRef, ...rest } = props;

	const hasIcon = icon || caret;
	return (
		<div className={classNames(theme['typeahead-input-icon'], 'tc-typeahead-typeahead-input-icon')}>
			<ControlLabel srOnly htmlFor={key}>
				Search
			</ControlLabel>
			{debounceMinLength || debounceTimeout ? (
				<DebounceInput
					id={key}
					{...rest}
					autoFocus
					debounceTimeout={debounceTimeout}
					element={FormControl}
					minLength={debounceMinLength}
					ref={inputRef}
				/>
			) : (
				<FormControl id={key} autoFocus inputRef={inputRef} {...rest} />
			)}
			{hasIcon && (
				<div className={classNames(theme['icon-cls'], caret && theme['icon-caret'])}>
					{icon && <Icon {...icon} />}
					{caret && <Icon name="talend-caret-down" />}
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

	function ItemsContainerComponent(props) {
		const { id, ref, containerProps, children } = props;
		const { className, ...restProps } = containerProps;

		const containerClassName = classNames(className, theme['items-container'], {
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
			<div id={id} ref={ref} className={containerClassName} {...restProps}>
				{render(content, { searching, loading, noResult, isShown })}
			</div>
		);
	}

	ItemsContainerComponent.propTypes = {
		id: PropTypes.string,
		ref: PropTypes.func,
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

export function renderItem(item, { value }) {
	let title;
	let description;
	if (typeof item === 'string') {
		title = item;
	} else {
		title = (item.title || item.name || '').trim();
		description = item.description;
	}
	return (
		<div className={theme.item} title={title}>
			<span className={classNames(theme['item-title'], 'tc-typeahead-item-title')}>
				<Emphasis value={value} text={title} />
			</span>
			{description && (
				<p className={classNames(theme['item-description'], 'tc-typeahead-item-description')}>
					<Emphasis value={value} text={description} />
				</p>
			)}
		</div>
	);
}
