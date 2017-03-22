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

function Item({ id, item, searchCriteria }) {
	const {
		key,
		actions,
		onSelectItem,
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

	function allIndexOf(str, toSearch) {
		const indices = [];
		for (let pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
			indices.push(pos);
		}
		return indices;
	}

	function removeDuplicates(indexes, search) {
		const array = [];

		indexes.forEach((matchingIndex) => {
			if (array.length === 0) {
				array.push(matchingIndex);
			} else if (matchingIndex >= array[array.length - 1] + search.length) {
				array.push(matchingIndex);
			}
		});

		return array;
	}

	function getSearchedLabel(label) {
		let indexes = allIndexOf(label.toLowerCase(), searchCriteria.toLowerCase());
		indexes = removeDuplicates(indexes, searchCriteria);
		return (<span>
			{indexes[0] !== 0 ? label.substring(0, indexes[0]) : null}
			{indexes.map((matchIndex, index, matchIndexes) =>
				(
					<span key={index}>
						<strong>{label.substring(matchIndex, matchIndex + searchCriteria.length)}</strong>
						{index === matchIndex.length + 1 ? null :
							label.substring(matchIndex + searchCriteria.length, matchIndexes[index + 1])
						}
					</span>
				))
			}
		</span>);
	}

	let actionLabel = (<Action
		key={item.index}
		label={item[key].join(',')}
		onClick={event => onSelectItem(item, event)}
		className={itemLabelClasses()}
		tooltip
	/>);
	if (searchCriteria) {
		actionLabel = (
			<button
				className={itemLabelClasses()}
				disabled="disabled">
				{getSearchedLabel(item[key].join(','))}
			</button>
		);
	}

	return (
		<li className={itemClasses(item.isSelected)} id={id}>
			{actionLabel}
			<div className={itemDefaultActionsClasses()}>
				{actions.map((action, index) => getAction(action, index))}
			</div>
		</li>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
