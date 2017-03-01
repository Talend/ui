import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';

function itemsClasses() {
	return classNames({
		[theme['tc-enumeration-items']]: true,
		'tc-enumeration-items': true,
	});
}

const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';

function Items({ items, itemsProp, currentEdit }) {
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
		<ul className={itemsClasses()}>
			{ items.map((item, index) => getItem(item, index)) }
		</ul>
	);
}

Items.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})),
	itemsProp: PropTypes.shape({
		key: PropTypes.string.isRequired,
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	...ItemEditPropTypes,
};

export default Items;
