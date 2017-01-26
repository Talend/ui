import React, { PropTypes } from 'react';

import Action from '../Actions/Action';

import TreeViewItem from './TreeViewItem/';
import getClassNames from './getClassNames';
import theme from './TreeView.scss';

const getClassName = getClassNames(theme);
/**
 * A view component to display any tree structure, like folders or categories.
 *
 * @param structure optional, tree structure to display, see example below
 * @param headerText optional, specifies text in component's header
 * @param addAction optional, defines either 'add' button will be displayed and
 *        specifies button click event callback
 * @param addActionLabel optional, specifies tooltip label for 'add' button
 * @param itemRemoveLabel optional, specifies tooltip label for 'remove' button
 * @param itemSelectCallback required, tree item click event callback function
 * @param itemToggleCallback required, tree item expand/collapse event callback function
 * @param itemRemoveCallback optional, tree item removal event callback function
 *
 * const defaultProps = {
 * 	structure: [{
 * 		name: 'grandpa',
 * 		children: [
 * 			{
 * 				name: 'mami',
 * 				toggled: true,
 * 				children: [
 * 					{ name: 'me', selected: true },
 * 					{ name: 'bro' },
 * 				],
 * 			},
 * 			{ name: 'aunt', toggled: false, children: [{ name: 'cousin' }] },
 * 		],
 * 		toggled: true
 * 	}],
 * 	headerText: 'some elements',
 * 	addAction: () => null,
 * 	addActionLabel: 'add element',
 * 	itemRemoveLabel: 'remove element',
 * 	itemSelectCallback: () => null,
 * 	itemToggleCallback: () => null,
 * 	itemRemoveCallback: () => null,
 * }
 *
 * <TreeView {...defaultProps} />
 *
 */

const TreeView = ({
	headerText,
	structure,
	addAction,
	addActionLabel,
	itemRemoveLabel,
	itemSelectCallback,
	itemToggleCallback,
	itemRemoveCallback,
}) => (
	<div className={getClassName('tc-treeview')}>
		<header className={getClassName('tc-treeview-header')}>
			<span>{headerText}</span>
			{ addAction && <Action
				label={addActionLabel}
				icon="talend-plus"
				onClick={addAction}
				tooltipPlacement="right"
				hideLabel
				link
			/>}
		</header>
		<nav className={getClassName('tc-treeview-nav')}>
			<ul className={getClassName('tc-treeview-ul')}>
				{structure.map(item => <TreeViewItem
					item={item}
					itemSelectCallback={itemSelectCallback}
					itemToggleCallback={itemToggleCallback}
					itemRemoveCallback={itemRemoveCallback}
					itemRemoveLabel={itemRemoveLabel}
					depth={0}
					key={item.name}
				/>)}
			</ul>
		</nav>
	</div>
);

TreeView.propTypes = {
	headerText: PropTypes.string,
	structure: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		toggled: PropTypes.bool,
		selected: PropTypes.bool,
		children: PropTypes.array,
	})),
	addAction: PropTypes.func,
	addActionLabel: PropTypes.string,
	itemRemoveLabel: PropTypes.string,
	itemSelectCallback: PropTypes.func.isRequired,
	itemToggleCallback: PropTypes.func.isRequired,
	itemRemoveCallback: PropTypes.func,
};

TreeView.defaultProps = {
	addActionLabel: 'Add folder',
	headerText: 'Folders',
	itemRemoveLabel: 'Remove folder',
};

export default TreeView;
