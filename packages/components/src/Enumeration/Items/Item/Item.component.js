import React from 'react';
import classNames from 'classnames';

import Action from '../../../Actions/Action';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

const itemClasses = () => classNames({
	[theme['tc-enumeration-item']]: true,
	'tc-enumeration-item': true,
});
const itemLabelClasses = () => classNames({
	[theme['tc-enumeration-item-label']]: true,
	'tc-enumeration-item-label': true,
});

const itemDefaultActionsClasses = () => classNames({
	[theme['tc-enumeration-item-actions']]: true,
	'tc-enumeration-item-actions': true,
	[theme['editable']]: true,
});

function Item({ id, item }) {
	const {
		key,
		actions,
	} = item.itemProps;

	const getAction = (action, index) => {
		const onClick = action.onClick &&
			(event => action.onClick(event, { value: event.target.value, index: item.index }));

		return (
			<Action
				key={index}
				label={action.label}
				icon={action.icon}
				onClick={onClick}
				tooltipPlacement="bottom"
				hideLabel
				link
			/>
		);
	};

	return (
		<li className={itemClasses()} id={id}>
			<div className={itemLabelClasses()}>{item[key].join(',')}</div>
			<div className={itemDefaultActionsClasses()}>
				{actions.map((action, index) => getAction(action, index))}
			</div>
		</li>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
