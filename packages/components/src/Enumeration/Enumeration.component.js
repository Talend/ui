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
	]),
	headerDefault: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	headerSelected: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})).isRequired,
	itemsProp: PropTypes.shape({
		key: PropTypes.string,
		onSubmitItem: PropTypes.func,
		onChangeItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	onAddChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
	...ItemEditPropTypes,
};

function ItemsEnumeration({ items, itemsProp, currentEdit }) {
	if (items.length > 0) {
		return (<Items
			items={items}
			itemsProp={itemsProp}
			currentEdit={currentEdit}
		/>);
	}
	return null;
}

ItemsEnumeration.propTypes = {
	items: Enumeration.propTypes.items,
	itemsProp: Enumeration.propTypes.itemsProp,
	...ItemEditPropTypes,
};

function HeaderEnumeration({
	displayMode,
	onAddChange,
	onAddKeyDown,
	headerInput,
	headerDefault,
	headerSelected,
	items,
}) {
	switch (displayMode) {
	case DISPLAY_MODE_ADD: {
		const propsInput = {
			headerInput,
			onAddChange,
			onAddKeyDown,
		};

		return <HeaderInput {...propsInput} />;
	}
	case DISPLAY_MODE_DEFAULT: {
		const propsDefault = {
			headerDefault,
			onAddChange,
		};

		return <Header {...propsDefault} />;
	}

	case DISPLAY_MODE_EDIT: {
		const propsDefault = {
			headerDefault,
			onAddChange,
		};

		return <Header {...propsDefault} isEdit />;
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
	displayMode: Enumeration.propTypes.displayMode,
	headerInput: Enumeration.propTypes.headerInput,
	headerDefault: Enumeration.propTypes.headerDefault,
	headerSelected: Enumeration.propTypes.headerSelected,
	onAddChange: Enumeration.propTypes.onAddChange,
	onAddKeyDown: Enumeration.propTypes.onAddKeyDown,
	items: Enumeration.propTypes.items,
};

export default Enumeration;
