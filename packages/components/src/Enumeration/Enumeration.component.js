import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ItemEditPropTypes from './Items/Item/ItemEdit.propTypes';
import Action from '../Actions/Action';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import Items from './Items/Items.component';
import theme from './Enumeration.scss';

export const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
export const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
export const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
export const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';

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
		DISPLAY_MODE_EDIT,
		DISPLAY_MODE_SEARCH,
	]),
	required: PropTypes.bool,
	headerError: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})).isRequired,
	headerLabel: PropTypes.string,
	emptyLabel: PropTypes.string,
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
		onLoadData: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	onInputChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	...ItemEditPropTypes,
};

Enumeration.defaultProps = {
	displayMode: DISPLAY_MODE_DEFAULT,
	headerLabel: 'Values',
	emptyLabel: 'This list is empty, click on + to add a value.',
	toggleAllLabel: 'All',
	items: [],
};

function ItemsEnumeration(props) {
	// Default
	const { items, itemsProp, emptyLabel } = props;
	const { toggleAllChecked, toggleAllLabel, onToggleAll } = props;
	// Edit
	const { currentEdit } = props;
	// Search
	const { searchCriteria } = props;
	const itemsProps = {
		items,
		itemsProp,
		currentEdit,
		searchCriteria,
		toggleAllChecked,
		toggleAllLabel,
		onToggleAll,
		emptyLabel,
	};
	return (
		<Items
			{...itemsProps}
		/>
	);
}

ItemsEnumeration.propTypes = {
	items: Enumeration.propTypes.items,
	itemsProp: Enumeration.propTypes.itemsProp,
	emptyLabel: Enumeration.propTypes.emptyLabel,
	searchCriteria: Enumeration.propTypes.searchCriteria,
	toggleAllChecked: Enumeration.propTypes.toggleAllChecked,
	toggleAllLabel: Enumeration.propTypes.toggleAllLabel,
	onToggleAll: Enumeration.propTypes.onToggleAll,
	...ItemEditPropTypes,
};

function HeaderEnumeration(props) {
	const {
		displayMode,
		headerError,
		onInputChange,
		onAddKeyDown,
		headerInput,
		headerDefault,
		headerLabel,
		items,
		required,
	} = props;

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
			headerLabel,
			required,
			nbItems: items.length,
			nbItemsSelected: items.filter(item => !!item.isSelected).length,
		};

		return <Header {...propsDefault} />;
	}
	default:
		return null;
	}
}

HeaderEnumeration.propTypes = {
	displayMode: Enumeration.propTypes.displayMode,
	headerDefault: Enumeration.propTypes.headerDefault,
	headerInput: Enumeration.propTypes.headerInput,
	headerError: Enumeration.propTypes.headerError,
	onInputChange: Enumeration.propTypes.onInputChange,
	onAddKeyDown: Enumeration.propTypes.onAddKeyDown,
	headerLabel: Enumeration.propTypes.headerLabel,
	required: Enumeration.propTypes.required,
	items: Enumeration.propTypes.items,
};

export default Enumeration;
