import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';
import { AutoSizer, List } from 'react-virtualized';

function itemsClasses() {
	return classNames({
		[theme['tc-enumeration-items']]: true,
		'tc-enumeration-items': true,
	});
}

const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';

function Items({ items, itemsProp, currentEdit }) {
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
			<div
				key={key}
				style={style}
			>
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
			};
			itemWithIndex.itemProps = itemPropDefault;

			return (
				<Item
					key={`${index}-item`}
					id={`${index}-item`}
					item={itemWithIndex}
					itemProps={itemPropDefault}
				/>
			);
		}
		}
	}

	return (
		<AutoSizer>
			{({ height, width }) => (
				<List
					rowRenderer={rowRenderer}
					width={width}
					height={height}
					rowCount={items.length}
					rowHeight={getRowHeight}
				/>
			)}
		</AutoSizer>
	);
}

Items.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})),
	itemsProp: PropTypes.shape({
		key: PropTypes.string.isRequired,
		getItemHeight: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.number,
		]),
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	...ItemEditPropTypes,
};

export default Items;
