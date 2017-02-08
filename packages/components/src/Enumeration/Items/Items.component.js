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

		switch (item.displayMode) {
			case DISPLAY_MODE_EDIT:
				itemProps.actions = itemsProp.actionsEdit;
				itemProps.onSubmitItem = itemsProp.onSubmitItem;
				itemProps.onAbortItem = itemsProp.onAbortItem;
				return <ItemEdit key={index} item={item} itemProps={itemProps} />;
			default:
				itemProps.actions = itemsProp.actionsDefault;
				return <Item key={index} item={item} itemProps={itemProps} />;
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
		id: PropTypes.number,
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
