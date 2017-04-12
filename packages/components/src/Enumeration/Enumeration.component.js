import React, { PropTypes } from 'react';
import classNames from 'classnames';

import headerPropTypes from './Header/Header.propTypes';
import ItemEditPropTypes from './Items/Item/ItemEdit.propTypes';
import Action from '../Actions/Action';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import HeaderSelected from './Header/HeaderSelected.component';
import HeaderCheckbox from './Header/HeaderCheckbox.component';
import Items from './Items/Items.component';
import theme from './Enumeration.scss';

export const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
export const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
export const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
export const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
export const DISPLAY_MODE_SELECTED = 'DISPLAY_MODE_SELECTED';
export const DISPLAY_MODE_CHECKBOX = 'DISPLAY_MODE_CHECKBOX';

function enumerationClasses() {
	return classNames(theme['tc-enumeration'], 'tc-enumeration');
}

function Enumeration(props) {
	return (
		<div className={enumerationClasses()}>
			<HeaderEnumeration {...props} />
			<ItemsEnumeration {...props} />
		</div>
	);
}

Enumeration.propTypes = {
	displayMode: PropTypes.oneOf([
		DISPLAY_MODE_DEFAULT,
		DISPLAY_MODE_ADD,
		DISPLAY_MODE_SELECTED,
		DISPLAY_MODE_EDIT,
		DISPLAY_MODE_SEARCH,
		DISPLAY_MODE_CHECKBOX,
	]),
	required: PropTypes.bool,
	headerError: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	headerSelected: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})).isRequired,
	toggleAllChecked: PropTypes.bool,
	toggleAllLabel: PropTypes.string,
	onToggleAll: PropTypes.func,
	searchCriteria: PropTypes.string,
	itemsProp: PropTypes.shape({
		key: PropTypes.string,
		getItemHeight: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.number,
		]),
		onSubmitItem: PropTypes.func,
		onChangeItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	onInputChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	...ItemEditPropTypes,
};

function ItemsEnumeration({ displayMode, items, itemsProp, searchCriteria, currentEdit }) {
	if (items.length > 0) {
		const itemsProps = {
			items,
			itemsProp,
			currentEdit,
			searchCriteria,
		};
		if (displayMode === DISPLAY_MODE_CHECKBOX) {
			itemsProps.isSelectable = true;
		}
		return (<Items
			{...itemsProps}
		/>);
	}
	return null;
}

ItemsEnumeration.propTypes = {
	displayMode: Enumeration.propTypes.displayMode,
	items: Enumeration.propTypes.items,
	itemsProp: Enumeration.propTypes.itemsProp,
	searchCriteria: Enumeration.propTypes.searchCriteria,
	...ItemEditPropTypes,
};

function HeaderEnumeration({
	displayMode, headerError, onInputChange, onAddKeyDown,
	headerInput, headerDefault, headerSelected, items, required,
	...rest,
}) {
	switch (displayMode) {
	case DISPLAY_MODE_SEARCH: {
		const propsInput = {
			headerInput,
			onInputChange,
			onAddKeyDown,
			headerError,
			inputPlaceholder: 'Search',
		};
		return <HeaderInput {...propsInput} />;
	}
	case DISPLAY_MODE_ADD : {
		const propsInput =
			{
				headerInput,
				onInputChange,
				onAddKeyDown,
				headerError,
				inputPlaceholder: 'New entry',
			};
		return <HeaderInput {...propsInput} />;
	}
	case DISPLAY_MODE_DEFAULT: {
		const propsDefault = {
			headerDefault,
			required,
		};

		return <Header {...propsDefault} />;
	}

	case DISPLAY_MODE_SELECTED: {
		const propsSelected = {
			headerSelected,
			nbItemsSelected: items.filter(item => item.isSelected && item.isSelected === true).length,
		};
		return <HeaderSelected {...propsSelected} />;
	}

	case DISPLAY_MODE_CHECKBOX: {
		const { toggleAllChecked, toggleAllLabel, onToggleAll } = rest;
		const propsCheckbox = {
			headerDefault,
			toggleAllChecked,
			toggleAllLabel,
			onToggleAll,
		};

		return <HeaderCheckbox {...propsCheckbox} />;
	}

	default:
		return null;
	}
}

HeaderEnumeration.propTypes = {
	headerError: Enumeration.propTypes.headerError,
	displayMode: Enumeration.propTypes.displayMode,
	headerInput: Enumeration.propTypes.headerInput,
	headerDefault: Enumeration.propTypes.headerDefault,
	headerSelected: Enumeration.propTypes.headerSelected,
	onInputChange: Enumeration.propTypes.onInputChange,
	onAddKeyDown: Enumeration.propTypes.onAddKeyDown,
	items: Enumeration.propTypes.items,
	required: Enumeration.propTypes.required,
};

export default Enumeration;
