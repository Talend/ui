import React, { PropTypes } from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DebounceInput from 'react-debounce-input';
import Icon from '../Icon';
import CircularProgress from '../CircularProgress';
import theme from './Typeahead.scss';

export const renderInputComponent = (props) => {
	const {
		key,
		debounceMinLength,
		debounceTimeout,
		icon,
		...rest
	} = props;

	const renderedIcon = icon && (<div className={theme['icon-cls']}>
		<Icon name={icon.name} title={icon.title} />
	</div>);

	return (
		<div className={theme['typeahead-input-icon']}>
			<ControlLabel srOnly htmlFor={key}>Search</ControlLabel>
			{(debounceMinLength || debounceTimeout) ?
				<DebounceInput
					id={key}
					{...rest}
					autoFocus
					element={FormControl}
					minLength={debounceMinLength}
					debounceTimeout={debounceTimeout}
				/> : <FormControl
					id={key}
					autoFocus
					{...rest}
				/> }
			{renderedIcon}
		</div>
	);
};
renderInputComponent.propTypes = {
	key: PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	icon: PropTypes.shape({
		name: PropTypes.string,
		title: PropTypes.string,
	}),
};

const ItemContainer = (props) => {
	const { items, noResultText, searching, searchingText, ...containerProps } = props;
	const { className, ...restProps } = containerProps;
	if (searching) {
		return (
			<div className={`${className} ${theme['is-searching']}`} {...restProps}>
				<span className="is-searching">{searchingText}</span> <CircularProgress />
			</div>
		);
	}
	if (items && !items.length) {
		return (
			<div className={`${className} ${theme['no-result']}`} {...restProps}>
				<span className="no-result">{noResultText}</span>
			</div>
		);
	}
	return (
		<div {...containerProps} />
	);
};
ItemContainer.propTypes = {
	className: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
			suggestions: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					description: PropTypes.string,
				}),
			),
		}),
	),
	noResultText: PropTypes.string,
	searching: PropTypes.bool,
	searchingText: PropTypes.string,
};

export const renderItemsContainerFactory = (items, noResultText, searching, searchingText) => {
	const renderItemsContainerComponent = (props) => {
		const { id, key, ref, ...rest } = props;
		return (
			<div
				id={id}
				ref={ref}
				key={key}
			>
				<ItemContainer
					{...rest}
					items={items}
					noResultText={noResultText}
					searching={searching}
					searchingText={searchingText}
				/>
			</div>
		);
	};

	renderItemsContainerComponent.propTypes = {
		id: PropTypes.string,
		key: PropTypes.string,
		ref: PropTypes.func,
	};

	return renderItemsContainerComponent;
};

export const renderSectionTitle = (section) => {
	if (section) {
		return (
			<div className={theme['section-header']}>
				{section.icon && <Icon name={section.icon.name} title={section.icon.title} />}
				<span className={theme['section-header-title']}>{section.title}</span>
			</div>
		);
	}
	return null;
};

function emphasise(text, value) {
	if (!text) {
		return '';
	}
	if (!value) {
		return [text];
	}

	const parts = text.split(new RegExp(`(${value})`, 'gi')).filter(Boolean);
	return parts.map((part) => {
		if (value && part.toUpperCase() === value.toUpperCase()) {
			return <em className={theme['highlight-match']}>{part}</em>;
		}
		return part;
	});
}

export const renderItem = (item, { value }) => {
	const title = item.title ? item.title.trim() : '';
	return (
		<div className={theme.item} title={title}>
			<span className={theme['item-title']}>
				{ emphasise(title, value) }
			</span>
			<p className={theme['item-description']}>
				{ emphasise(item.description, value) }
			</p>
		</div>
	);
};
