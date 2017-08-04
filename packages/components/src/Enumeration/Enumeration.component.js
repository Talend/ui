import React, { PropTypes } from 'react';
import classNames from 'classnames';

import headerPropTypes from './Header/Header.propTypes';
import ItemEditPropTypes from './Items/Item/ItemEdit.propTypes';
import Action from '../Actions/Action';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import HeaderSelected from './Header/HeaderSelected.component';
import Items from './Items/Items.component';
import theme from './Enumeration.scss';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
const DISPLAY_MODE_SELECTED = 'DISPLAY_MODE_SELECTED';

function enumerationClasses() {
	return classNames({
		[theme['tc-enumeration']]: true,
		'tc-enumeration': true,
	});
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
	]),
	inputRef: PropTypes.func,
	required: PropTypes.bool,
	headerError: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	headerSelected: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})).isRequired,
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
		onLoadData: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	onInputChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	inputValue: PropTypes.string,
	label: PropTypes.string,
	...ItemEditPropTypes,
};

function ItemsEnumeration({ items, itemsProp, searchCriteria, currentEdit }) {
	if (items.length > 0) {
		return (<Items
			items={items}
			itemsProp={itemsProp}
			currentEdit={currentEdit}
			searchCriteria={searchCriteria}
		/>);
	}
	return null;
}

ItemsEnumeration.propTypes = {
	items: Enumeration.propTypes.items,
	itemsProp: Enumeration.propTypes.itemsProp,
	searchCriteria: Enumeration.propTypes.searchCriteria,
	...ItemEditPropTypes,
};

function HeaderEnumeration({
		displayMode, headerError, onInputChange, onAddKeyDown,
		headerInput, headerDefault, headerSelected, items, required,
		inputValue, inputRef, label,
	}) {
	switch (displayMode) {
	case DISPLAY_MODE_SEARCH: {
		const propsInput = {
			headerInput,
			onInputChange,
			onAddKeyDown,
			headerError,
			inputRef,
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
				inputRef,
				value: inputValue,
				inputPlaceholder: 'New entry',
			};
		return <HeaderInput {...propsInput} />;
	}
	case DISPLAY_MODE_DEFAULT: {
		const propsDefault = {
			headerDefault,
			required,
			label,
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
	inputValue: Enumeration.propTypes.inputValue,
	inputRef: Enumeration.propTypes.inputRef,
	label: Enumeration.propTypes.label,
};

export default Enumeration;
