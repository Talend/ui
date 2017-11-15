import PropTypes from 'prop-types';
import React from 'react';

import { Action, Icon, Badge } from '../../';

import css from './TreeViewItem.scss';

const PADDING_NORMAL = 15;
const PADDING_LARGE = 20;

function getActionHandler(func, item) {
	return function actionHandler(event) {
		event.stopPropagation();
		func(item);
	};
}

/**
 *
 * Single item of TreeView component
 *
 * @param id, for qa purposes
 * @param item required, item to display
 * 		  item.actions optional, array with actions' to be displayed meta-info
 * @param onSelect required, callback function to trigger once item was clicked
 * @param onClick required, callback function to trigger once item was clicked
 * @param depth optional, depth of an item in a tree
 *
 * @returns XML, jsx to display
 */

function TreeViewItem({ id, item, depth = 0, onClick, onSelect }) {
	const {
		toggled = false,
		selected,
		hidden,
		name,
		children = [],
		showCounter,
		actions,
		icon = 'talend-folder',
		counter = children.length,
	} = item;
	const toggleIconLabel = toggled ? 'Collapse' : 'Expand';

	function selectHandler() {
		return onSelect(item);
	}

	function getTreeViewItem(child, i) {
		return (
			<TreeViewItem
				{...{
					id: id && `${id}-${i}`,
					item: child,
					onSelect,
					onClick,
					depth: depth + 1,
					key: i,
				}}
			/>
		);
	}

	function getIconAction(label, icon_, action, id_) {
		return (
			<Action
				label={label}
				icon={icon_}
				onClick={getActionHandler(action, item)}
				tooltipPlacement="right"
				hideLabel
				key={label}
				id={id_ || `${id}-${icon_}`}
				link
			/>
		);
	}
	const paddingLeft = `${depth * PADDING_NORMAL + PADDING_LARGE}px`;

	return (
		<li className={css['tc-treeview-li']} data-hidden={hidden}>
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className={css['tc-treeview-item']}
				data-selected={selected}
				onClick={selectHandler}
				id={id}
				style={{ paddingLeft }}
			>
				{!children.length || (
					<div className={css['tc-treeview-toggle']} data-toggled={toggled}>
						{getIconAction(
							toggleIconLabel,
							'talend-caret-down',
							onClick,
							`${id}-toggle`,
						)}
					</div>
				)}
				<span className={css['tc-treeview-folder']}>
					<Icon name={icon} key={icon} />
				</span>
				<span>{name}</span>
				<div className={css['tc-treeview-item-ctrl']}>
					{showCounter && <Badge label={counter.toString()} />}
					{actions && actions.map(a => getIconAction(a.label, a.icon, a.action))}
				</div>
			</div>
			{children &&
				toggled && <ul className={css['tc-treeview-ul']}>{children.map(getTreeViewItem)}</ul>}
		</li>
	);
}

TreeViewItem.propTypes = {
	id: PropTypes.string,
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		toggled: PropTypes.bool,
		selected: PropTypes.bool,
		children: PropTypes.arrayOf(PropTypes.object),
		icon: PropTypes.string,
		actions: PropTypes.arrayOf(
			PropTypes.shape({
				action: PropTypes.func,
				label: PropTypes.string,
				icon: PropTypes.string,
			}),
		),
		counter: PropTypes.number,
		showCounter: PropTypes.bool,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	depth: PropTypes.number,
};

export default TreeViewItem;
