import React from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { translate } from 'react-i18next';

import { removeDuplicates, allIndexOf } from './utils';
import Action from '../../../Actions/Action';
import theme from './Item.scss';
import { Checkbox } from '../../../Toggle';
import ItemPropTypes from './Item.propTypes';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import Icon from '../../../Icon';
import TooltipTrigger from '../../../TooltipTrigger';

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

function Item({ id, item, searchCriteria, showCheckboxes, style, t }) {
	const { key, actions, onSelectItem } = item.itemProps;
	const actualLabel = item[key] instanceof Array ? item[key].join(',') : item[key];

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
		return (
			<span>
				{/* Set the label to go on the first index if the index is not 0 */}
				{indexes[0] !== 0 ? label.substring(0, indexes[0]) : null}
				{indexes.map((matchIndex, index, matchIndexes) => (
					<span key={index}>
						{/* get the string from label with indexes ( to keep words case ) */}
						<strong>{label.substring(matchIndex, matchIndex + searchCriteria.length)}</strong>
						{/* get the string before next index if there is */}
						{index === matchIndex.length + 1
							? null
							: label.substring(matchIndex + searchCriteria.length, matchIndexes[index + 1])}
					</span>
				))}
			</span>
		);
	}

	function getActionLabel() {
		if (searchCriteria) {
			return (
				<button role="gridcell" className={itemLabelClasses()} disabled="disabled">
					{getSearchedLabel(actualLabel)}
				</button>
			);
		}

		return (
			<Button
				className={itemLabelClasses()}
				role="gridcell"
				onClick={event => onSelectItem(item, event)}
				key={item.index}
				aria-label={t('TC_ENUMERATION_SELECT', {
					defaultValue: 'Select item "{{label}}"',
					label: actualLabel,
				})}
			>
				{showCheckboxes && (
					<Checkbox
						aria-label={t('TC_ENUMERATION_CHECK', {
							defaultValue: 'Check item "{{label}}"',
							label: actualLabel,
						})}
						className={classNames(theme['tc-enumeration-checkbox'], 'tc-enumeration-checkbox')}
						checked={item.isSelected}
					/>
				)}
				<span>{actualLabel}</span>
				{item.icon && (
					<TooltipTrigger label={item.icon.title} tooltipPlacement="bottom">
						<Icon {...item.icon} aria-hidden="false" />
					</TooltipTrigger>
				)}
			</Button>
		);
	}

	return (
		<div role="row" className={itemClasses(item.isSelected)} id={id} style={style}>
			{getActionLabel()}
			<div className={itemDefaultActionsClasses()} role="gridcell">
				{actions
					.filter(action => !action.disabled)
					.map((action, index) => getAction(action, index))}
			</div>
		</div>
	);
}

Item.propTypes = ItemPropTypes;

export default translate(I18N_DOMAIN_COMPONENTS)(Item);
