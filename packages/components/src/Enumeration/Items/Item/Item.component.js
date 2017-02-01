import React from 'react';
import classNames from 'classnames';

import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

const itemClasses = () => classNames({
	[theme['tc-enumeration-item']]: true,
	'tc-enumeration-item': true,
});

function Item({ id, label }) {
	return (
		<li className={itemClasses()}>{label}</li>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
