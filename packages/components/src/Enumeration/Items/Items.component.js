import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Item from './Item/Item.component';
import ItemPropTypes from './Item/Item.propTypes';
import theme from './Items.scss';

const itemsClasses = () => classNames({
	[theme['tc-enumeration-items']]: true,
	'tc-enumeration-items': true,
});

function Items({ items }) {
	return (
		<ul className={itemsClasses()}>
			{ items.map((item, index) => <Item key={index} {...item} />) }
		</ul>
	);
}

Items.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape(ItemPropTypes)),
};

export default Items;
