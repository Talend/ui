import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Action from '../Actions/Action';
import TreeViewItem from './TreeViewItem';

import theme from './TreeView.scss';
import withTreeGesture from '../Gesture/withTreeGesture';

/**
 * A view component to display any tree structure, like folders or categories.
 *
 * @param id, for qa purposes
 * @param structure optional, tree structure to display, see example below
 * @param headerText optional, specifies text in component's header
 * @param addAction optional, defines if 'add' button is displayed and
 *        specifies button click event callback
 * @param addActionLabel optional, specifies tooltip label for 'add' button
 * @param itemSelectCallback required, tree item click event callback function
 * @param itemToggleCallback required, tree item expand/collapse event callback function
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
 * 	itemSelectCallback: () => null,
 * 	itemToggleCallback: () => null,
 * }
 *
 * <TreeView {...defaultProps} />
 *
 */
function TreeView(props) {
	const {
		id,
		headerText,
		structure,
		addAction,
		addActionLabel,
		onKeyDown,
		onSelect,
		onToggle,
		noHeader,
		className,
		selectedId,
		style,
	} = props;
	const titleId = id && `${id}-title`;
	return (
		<div className={classNames('tc-treeview', theme['tc-treeview'], className)} style={style}>
			<header className={classNames(theme['tc-treeview-header'], { 'sr-only': noHeader })}>
				<span id={titleId}>{headerText}</span>
				{addAction && (
					<Action
						label={addActionLabel}
						icon="talend-plus"
						onClick={addAction}
						tooltipPlacement="right"
						hideLabel
						link
						id={id && `${id}-add`}
						key={addActionLabel}
					/>
				)}
			</header>
			<ul className={theme['tc-treeview-list']} role="tree" aria-labelledby={titleId}>
				{structure.map((item, i) => (
					<TreeViewItem
						id={id && `${id}-${i}`}
						item={item}
						siblings={structure}
						onKeyDown={onKeyDown}
						onSelect={onSelect}
						onToggle={onToggle}
						key={i}
						index={i + 1}
						selectedId={selectedId}
						level={1}
					/>
				))}
			</ul>
		</div>
	);
}

TreeView.displayName = 'TreeView';

TreeView.defaultProps = {
	id: 'tc-treeview',
	addActionLabel: 'Add folder',
	headerText: 'Folders',
};

if (process.env.NODE_ENV !== 'production') {
	TreeView.propTypes = {
		id: PropTypes.string.isRequired,
		headerText: PropTypes.string,
		structure: PropTypes.arrayOf(TreeViewItem.propTypes.item),
		addAction: PropTypes.func,
		addActionLabel: PropTypes.string,
		onKeyDown: PropTypes.func.isRequired,
		onToggle: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		noHeader: PropTypes.bool,
		className: PropTypes.string,
		selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
		style: PropTypes.object,
	};
}

export default withTreeGesture(TreeView);
