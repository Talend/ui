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
				<div className={theme['icon-cls']}>
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

function ItemContainer(props) {
	const {
		items,
		loading,
		loadingText,
		noResultText,
		searching,
		searchingText,
		containerProps,
		children,
	} = props;
	const { className, ...restProps } = containerProps;
	const containerClassName = classNames(className, theme['item-container']);
	if (searching) {
		return (
			<div className={`${containerClassName} ${theme['is-searching']}`} {...restProps}>
				<span className="is-searching">{searchingText}</span> <CircularProgress />
			</div>
		);
	}
	if (items && !items.length) {
		if (loading) {
			return (
				<div className={`${containerClassName} ${theme['is-loading']}`} {...restProps}>
					<span className="is-loading">{loadingText}</span>
				</div>
			);
		}
		return (
			<div className={`${containerClassName} ${theme['no-result']}`} {...restProps}>
				<span className="no-result">{noResultText}</span>
			</div>
		);
	}
	return <div {...containerProps} className={containerClassName} children={children} />;
}
ItemContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	containerProps: PropTypes.shape({
		className: PropTypes.string,
	}),
	items: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
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
		]),
	),
	loading: PropTypes.bool,
	loadingText: PropTypes.string,
	noResultText: PropTypes.string,
	searching: PropTypes.bool,
	searchingText: PropTypes.string,
};

export function renderItemsContainerFactory(
	items,
	noResultText,
	searching,
	searchingText,
	loading,
	loadingText,
) {
	const renderItemsContainerComponent = props => {
		const { id, key, ref, ...rest } = props;
		return (
			<div id={id} ref={ref} key={key}>
				<ItemContainer
					{...rest}
					items={items}
					noResultText={noResultText}
					searching={searching}
					searchingText={searchingText}
					loading={loading}
					loadingText={loadingText}
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
