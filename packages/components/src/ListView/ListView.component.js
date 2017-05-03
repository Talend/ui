import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import Items from './Items/Items.component';
import theme from './ListView.scss';

export const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
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
	displayMode: PropTypes.oneOf([
		DISPLAY_MODE_DEFAULT,
		DISPLAY_MODE_SEARCH,
	]),
	required: PropTypes.bool,
	headerError: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	items: PropTypes.arrayOf(PropTypes.object),
	headerLabel: PropTypes.string,
	toggleAllChecked: PropTypes.bool,
	toggleAllLabel: PropTypes.string,
	emptyLabel: PropTypes.string,
	onToggleAll: PropTypes.func,
	searchCriteria: PropTypes.string,
	searchPlaceholder: PropTypes.string,
	onInputChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
	getItemHeight: React.PropTypes.oneOfType([
		React.PropTypes.func,
		React.PropTypes.number,
	]),
};

ListView.defaultProps = {
	displayMode: DISPLAY_MODE_DEFAULT,
	headerLabel: 'Values',
	emptyLabel: 'This list is empty.',
	toggleAllLabel: 'All',
	searchPlaceholder: 'Search',
	items: [],
};

function ItemsListView(props) {
	return (
		<Items
			items={props.items}
			searchCriteria={props.searchCriteria}
			toggleAllChecked={props.toggleAllChecked}
			toggleAllLabel={props.toggleAllLabel}
			onToggleAll={props.onToggleAll}
			emptyLabel={props.emptyLabel}
			getItemHeight={props.getItemHeight}
		/>
	);
}

ItemsListView.propTypes = {
	items: ListView.propTypes.items,
	emptyLabel: ListView.propTypes.emptyLabel,
	searchCriteria: ListView.propTypes.searchCriteria,
	toggleAllChecked: ListView.propTypes.toggleAllChecked,
	toggleAllLabel: ListView.propTypes.toggleAllLabel,
	onToggleAll: ListView.propTypes.onToggleAll,
	getItemHeight: ListView.propTypes.getItemHeight,
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
		searchPlaceholder,
	} = props;

	switch (displayMode) {
	case DISPLAY_MODE_SEARCH: {
		const propsInput = {
			headerInput,
			onInputChange,
			onAddKeyDown,
			inputPlaceholder: searchPlaceholder,
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
	searchPlaceholder: ListView.propTypes.searchPlaceholder,
	required: ListView.propTypes.required,
	items: ListView.propTypes.items,
};

export default ListView;
