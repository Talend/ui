import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DebounceInput from 'react-debounce-input';
import classNames from 'classnames';

import CircularProgress from '../CircularProgress';
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
		<div />
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
			<div />
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
			<div />
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
		<div/>
	);
}
