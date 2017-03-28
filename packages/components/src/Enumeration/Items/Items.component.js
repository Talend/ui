import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';
import { AutoSizer, List } from 'react-virtualized';

function listClasses() {
	return classNames({
		[theme['tc-list-items']]: true,
	});
}

function itemsClasses() {
	return classNames({
		[theme['tc-enumeration-items']]: true,
		'tc-enumeration-items': true,
	});
}

function itemContainer() {
	return classNames({
		[theme['tc-item-container']]: true,
		'tc-item-container': true,
	});
}

const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';

function Items({ items, itemsProp, currentEdit, searchCriteria }) {

	function getRowHeight({ index }) {
		const isEditMode = items[index].displayMode === DISPLAY_MODE_EDIT;
		return itemsProp.getItemHeight(isEditMode);
	}
	function rowRenderer ({
		key,         // Unique key within array of rows
			index,       // Index of row within collection
			isScrolling, // The List is currently being scrolled
			isVisible,   // This row is visible within the List (eg it is not an overscanned row)
		style        // Style object to be applied to row (to position it)
	}) {
		return (
			<div className={itemContainer()} key={key} style={style}>
				{getItem(items[index], index)}
			</div>
		)
	}


	function getItem(item, index) {
		// affecting index to the item
		const itemWithIndex = {
			...item,
			index,
		};

		switch (item.displayMode) {
		case DISPLAY_MODE_EDIT: {
			const itemPropsEdit = {
				key: itemsProp.key,
				actions: itemsProp.actionsEdit,
				onSubmitItem: itemsProp.onSubmitItem,
				onAbortItem: itemsProp.onAbortItem,
				onChangeItem: itemsProp.onChangeItem,
			};
			itemWithIndex.itemProps = itemPropsEdit;

			return (
				<ItemEdit
					key={`${index}-item`}
					id={`${index}-item`}
					item={itemWithIndex}
					currentEdit={currentEdit}
				/>
			);
		}
		default: {
			const itemPropDefault = {
				key: itemsProp.key,
				actions: itemsProp.actionsDefault,
				onSelectItem: itemsProp.onSelectItem,
			};
			itemWithIndex.itemProps = itemPropDefault;

			return (
				<Item
					key={`${index}-item`}
					id={`${index}-item`}
					item={itemWithIndex}
					itemProps={itemPropDefault}
					searchCriteria={searchCriteria}
				/>
			);
		}
		}
	}

	return (
		<ul className={itemsClasses()}>
			<AutoSizer>
				{({ height, width }) => (
					<List
						className={listClasses()}
						rowRenderer={rowRenderer}
						width={width}
						height={height}
						rowCount={items.length}
						rowHeight={getRowHeight}
					/>
				)}
			</AutoSizer>
		</ul>
	);
}

Items.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})),
	searchCriteria: PropTypes.string,
	itemsProp: PropTypes.shape({
		key: PropTypes.string.isRequired,
		getItemHeight: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.number,
		]),
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	...ItemEditPropTypes,
};

export default Items;
