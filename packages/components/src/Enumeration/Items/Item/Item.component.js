import React from 'react';
import classNames from 'classnames';

import Action from '../../../Actions/Action';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

function itemClasses(isSelected) {
	return classNames({
		[theme['tc-enumeration-item']]: true,
		[theme['selected-item']]: isSelected,
		'tc-enumeration-item': true,
		'selected-item': isSelected,
	});
}

function itemLabelClasses() {
	return classNames({
		[theme['tc-enumeration-item-label']]: true,
		'tc-enumeration-item-label': true,
	});
}

function itemDefaultActionsClasses() {
	return classNames({
		[theme['tc-enumeration-item-actions']]: true,
		'tc-enumeration-item-actions': true,
		[theme.editable]: true,
	});
}

function Item({ id, item }) {
	const {
		key,
		actions,
		onSelectItem,
		selectedItems,
	} = item.itemProps;

	function getAction(action, index) {
		function onClick(event) {
			if (action.onClick) {
				action.onClick(event, {
					value: event.target.value,
					index: item.index,
				});
			}
		}

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
	}

	const selected = selectedItems.find(selectedItem => selectedItem === item.index);

	return (
		<li className={itemClasses(selected !== undefined)} id={id}>
			<Action
				key={item.index}
				label={item[key].join(',')}
				onClick={event => onSelectItem(item, event)}
				className={itemLabelClasses()}
			/>
			<div className={itemDefaultActionsClasses()}>
				{actions.map((action, index) => getAction(action, index))}
			</div>
		</li>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
