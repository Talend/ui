import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import theme from './Items.scss';

const itemsClasses = () => classNames({
	[theme['tc-enumeration-items']]: true,
	'tc-enumeration-items': true,
});


const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';

function Items({ items, itemsProp }) {
	const getItem = (item, index) => {
		let itemProps = {
			key: itemsProp.key,
		};
		// affecting index to the item
		item.index = index;

		switch (item.displayMode) {
			case DISPLAY_MODE_EDIT:
				let itemPropsEdit = {
					key: itemsProp.key,
					actions: itemsProp.actionsEdit,
					onSubmitItem: itemsProp.onSubmitItem,
					onAbortItem: itemsProp.onAbortItem,
                    onItemChange: itemsProp.onItemChange,
				};
				item.itemProps = itemPropsEdit;

				return <ItemEdit
					key={`${index}-item`}
					id={`${index}-item`}
					item={item}
				/>;
			default:
				let itemPropDefault = {
					key: itemsProp.key,
					actions: itemsProp.actionsDefault,
				};
                item.itemProps = itemPropDefault;

				return <Item
					key={`${index}-item`}
					id={`${index}-item`}
					item={item}
					itemProps={itemPropDefault}
				/>;
		}
	};

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
};

export default Items;
