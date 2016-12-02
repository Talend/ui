import React, { PropTypes } from 'react';

import Action from '../../Actions/Action';
import Icon from '../../Icon';
import getClassNames from '../getClassNames';

import theme from './TreeViewItem.scss';

const getClassName = getClassNames(theme);
const getActionHandler = (func, item) => (e) => { e.stopPropagation(); func(item); };
const getIconAction = (label, iconName, onClickHandler, item) => (
	<Action
		label={label}
		icon={iconName}
		onClick={getActionHandler(onClickHandler, item)}
		tooltipPlacement="right"
		hideLabel
		link
	/>
);

/**
 *
 * Single item of TreeView component
 *
 * @param item required, item to display, consists of:
 * @param itemSelectCallback required, callback function to trigger once item was clicked
 * @param itemToggleCallback required, callback function to trigger once item was clicked
 * @param itemRemoveCallback optional, callback function to trigger once trash icon was clicked
 * @param itemRemoveLabel optional, label string for trash icon
 * @param depth optional, depth of an item in a tree
 *
 * @returns XML, jsx to display
 */

function TreeViewItem({
	item,
	itemSelectCallback,
	itemToggleCallback,
	itemRemoveCallback,
	itemRemoveLabel,
	depth,
}) {
	const toggleIconLabel = item.toggled ? 'Collapse' : 'Expand';
	const selectHandler = () => itemSelectCallback(item);

	return (
		<li className={getClassName('tc-treeview-li')} data-tc-treeview-hidden={item.hidden}>
			<div
				className={getClassName('tc-treeview-item')}
				onClick={selectHandler}
				data-tc-treeview-depth={depth}
				data-tc-treeview-selected={item.selected}
			>
				{item.children && (
					<div
						className={getClassName('tc-treeview-toggle')}
						data-tc-treeview-toggled={item.toggled}
					>
						{getIconAction(
							toggleIconLabel, 'talend-caret-down', itemToggleCallback, item
						)}
					</div>
				)}
				<span className={getClassName('tc-treeview-folder')}>
					<Icon name="talend-folder" />
				</span>
				<span>{item.name}</span>
				{itemRemoveCallback && (
					<div className={getClassName('tc-treeview-remove')}>
						{getIconAction(
							itemRemoveLabel, 'talend-trash', itemRemoveCallback, item
						)}
					</div>
				)}
			</div>
			{item.children && item.toggled && (
				<ul className={getClassName('tc-treeview-ul')}>
					{item.children.map(child => (
						<TreeViewItem
							item={child}
							itemSelectCallback={itemSelectCallback}
							itemToggleCallback={itemToggleCallback}
							itemRemoveCallback={itemRemoveCallback}
							itemRemoveLabel={itemRemoveLabel}
							depth={depth + 1}
							key={child.name}
						/>
					))}
				</ul>
			)}
		</li>
	);
}

TreeViewItem.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		toggled: PropTypes.bool,
		selected: PropTypes.bool,
		children: PropTypes.arrayOf(PropTypes.object),
	}),
	itemSelectCallback: PropTypes.func.isRequired,
	itemToggleCallback: PropTypes.func.isRequired,
	itemRemoveCallback: PropTypes.func,
	itemRemoveLabel: PropTypes.string,
	depth: PropTypes.number,
};

export default TreeViewItem;
