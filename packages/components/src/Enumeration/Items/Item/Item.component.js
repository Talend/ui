import React from 'react';
import classNames from 'classnames';
import { removeDuplicates, allIndexOf } from './utils';
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

function Item({ id, item, itemProps, searchCriteria }) {
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
				inProgress={action.inProgress}
				tooltipPlacement="bottom"
				hideLabel
				link
			/>
		);
	}

	/**
	 * This function allow to get component rendering based on searchCriteria
	 * @param label the current label to parse & to render
	 */
	function getSearchedLabel(label) {
		let indexes = allIndexOf(label.toLowerCase(), searchCriteria.toLowerCase());
		indexes = removeDuplicates(indexes, searchCriteria);
		return (<span>
			{/* Set the label to go on the first index if the index is not 0 */}
			{indexes[0] !== 0 ? label.substring(0, indexes[0]) : null}
			{indexes.map((matchIndex, index, matchIndexes) =>
				(
					<span key={index}>
						{/* get the string from label with indexes ( to keep words case ) */}
						<strong>{label.substring(matchIndex, matchIndex + searchCriteria.length)}</strong>
						{/* get the string before next index if there is */}
						{index === matchIndex.length + 1 ? null :
							label.substring(matchIndex + searchCriteria.length, matchIndexes[index + 1])
						}
					</span>
				))
			}
		</span>);
	}

	function getActionLabel() {
		if (itemProps && itemProps.isSelectable) {
			const itemId = `enumeration-item-${item.index}`;
			return (
				<div
					className="checkbox"
					key={item.index}
				>
					<label htmlFor={itemId}>
						<input
							id={itemId}
							type="checkbox"
							onChange={event => onSelectItem(item, event)}
							checked={item.isSelected}
						/>
						<span
							className={itemLabelClasses()}
						>
							{item[key].join(',')}
						</span>
					</label>
				</div>
			);
		}
		if (searchCriteria) {
			return (
				<button
					className={itemLabelClasses()}
					disabled="disabled"
				>
					{getSearchedLabel(item[key].join(','))}
				</button>
			);
		}
		return (<Action
			key={item.index}
			label={item[key].join(',')}
			onClick={event => onSelectItem(item, event)}
			className={itemLabelClasses()}
			tooltip
		/>);
	}

	return (
		<li className={itemClasses(item.isSelected)} id={id}>
			{getActionLabel()}
			<div className={itemDefaultActionsClasses()}>
				{actions.map((action, index) => getAction(action, index))}
			</div>
		</li>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
