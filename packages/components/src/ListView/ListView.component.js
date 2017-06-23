import React, { PropTypes } from 'react';
import classNames from 'classnames';

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
			{
				props.items && props.items.length ? (
					<ItemsListView {...props} />
				) : (
					<span className={theme['empty-message']}>{ props.emptyLabel }</span>
				)
			}
		</div>
	);
}

ListView.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	emptyLabel: PropTypes.string,
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
			getItemHeight={props.getItemHeight}
		/>
	);
}

ItemsListView.propTypes = {
	items: ListView.propTypes.items,
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
