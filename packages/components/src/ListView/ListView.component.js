import PropTypes from 'prop-types';
import React from 'react';
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
	const label = props.displayMode === DISPLAY_MODE_SEARCH ? props.noResultLabel : props.emptyLabel;
	return (
		<div className={listviewClasses()}>
			<HeaderListView {...props} />
			{
				props.items && props.items.length ? (
					<ItemsListView {...props} />
				) : (
					<span className={theme['empty-message']}>{label}</span>
				)
			}
		</div>
	);
}

ListView.propTypes = {
	emptyLabel: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object),
	noResultLabel: PropTypes.string,
};

ListView.defaultProps = {
	emptyLabel: 'This list is empty.',
	items: [],
	noResultLabel: 'No result found.',
};

function ItemsListView(props) {
	return (
		<Items
			id={props.id}
			items={props.items}
			searchCriteria={props.searchCriteria}
			toggleAllChecked={props.toggleAllChecked}
			toggleAllLabel={props.toggleAllLabel}
			onToggleAll={props.onToggleAll}
			getItemHeight={props.getItemHeight}
			emptyLabel={props.emptyLabel}
		/>
	);
}

ItemsListView.defaultProps = {
	toggleAllLabel: 'All',
};

ItemsListView.propTypes = {
	emptyLabel: PropTypes.string,
	getItemHeight: PropTypes.func,
	id: PropTypes.string,
	items: ListView.propTypes.items,
	onToggleAll: PropTypes.func,
	searchCriteria: PropTypes.string,
	toggleAllChecked: PropTypes.bool,
	toggleAllLabel: PropTypes.string,
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

HeaderListView.defaultProps = {
	displayMode: DISPLAY_MODE_DEFAULT,
	headerLabel: 'Values',
	searchPlaceholder: 'Search',
};

HeaderListView.propTypes = {
	displayMode: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.object),
	headerInput: PropTypes.arrayOf(PropTypes.object),
	headerLabel: PropTypes.string,
	items: ListView.propTypes.items,
	onInputChange: PropTypes.func,
	onAddKeyDown: PropTypes.func,
	required: PropTypes.bool,
	searchPlaceholder: PropTypes.string,
};

export default ListView;
