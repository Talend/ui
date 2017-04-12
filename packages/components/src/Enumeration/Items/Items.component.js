import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';

import { DISPLAY_MODE_EDIT } from '../Enumeration.component';
import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';

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

function Items({ items, itemsProp, currentEdit, searchCriteria, isSelectable }) {
	function getRowHeight({ index }) {
		const isEditMode = items[index].displayMode === DISPLAY_MODE_EDIT;
		return itemsProp.getItemHeight(isEditMode);
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
			if (isSelectable) {
				itemPropDefault.isSelectable = true;
			}
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

	function rowRenderer({
		key,   // eslint-disable-line react/prop-types
		index, // eslint-disable-line react/prop-types
		style, // eslint-disable-line react/prop-types
	}) {
		return (
			<div className={itemContainer()} key={key} style={style}>
				{getItem(items[index], index)}
			</div>
		);
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
	isSelectable: PropTypes.bool,
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
