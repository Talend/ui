import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import Items from './Items/Items.component';
import theme from './ListView.scss';

export const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
export const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
export const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
export const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';

function listviewClasses() {
	return classNames(theme['tc-listview'], 'tc-listview');
}

function ListView(props) {
	return (
		<div className={listviewClasses()}>
			<HeaderListView {...props} />
			<ItemsListView {...props} />
		</div>
	);
}

ListView.propTypes = {
	required: PropTypes.bool,
	headerError: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	items: PropTypes.arrayOf(PropTypes.object),
	headerLabel: PropTypes.string,
	toggleAllChecked: PropTypes.bool,
	toggleAllLabel: PropTypes.string,
	onToggleAll: PropTypes.func,
	searchCriteria: PropTypes.string,
};

ListView.defaultProps = {
	displayMode: DISPLAY_MODE_DEFAULT,
	headerLabel: 'Values',
	emptyLabel: 'This list is empty, click on + to add a value.',
	toggleAllLabel: 'All',
	items: [],
};

function ItemsListView(props) {
	// Default
	const { items, itemsProp, emptyLabel } = props;
	const { toggleAllChecked, toggleAllLabel, onToggleAll } = props;
	// Search
	const { searchCriteria } = props;
	const itemsProps = {
		items,
		itemsProp,
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

ItemsListView.propTypes = {
	items: ListView.propTypes.items,
	itemsProp: ListView.propTypes.itemsProp,
	emptyLabel: ListView.propTypes.emptyLabel,
	searchCriteria: ListView.propTypes.searchCriteria,
	toggleAllChecked: ListView.propTypes.toggleAllChecked,
	toggleAllLabel: ListView.propTypes.toggleAllLabel,
	onToggleAll: ListView.propTypes.onToggleAll,
};

function HeaderListView(props) {
	const {
		displayMode,
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
		};
		return <HeaderInput {...propsInput} />;
	}
	default: {
		const propsDefault = {
			headerDefault,
			headerLabel,
			required,
			nbItems: items.length,
			nbItemsSelected: items.filter(item => !!item.checked).length,
		};

		return <Header {...propsDefault} />;
	}
	}
}

HeaderListView.propTypes = {
	displayMode: ListView.propTypes.displayMode,
	headerDefault: ListView.propTypes.headerDefault,
	headerInput: ListView.propTypes.headerInput,
	onInputChange: ListView.propTypes.onInputChange,
	onAddKeyDown: ListView.propTypes.onAddKeyDown,
	headerLabel: ListView.propTypes.headerLabel,
	required: ListView.propTypes.required,
	items: ListView.propTypes.items,
};

export default ListView;
