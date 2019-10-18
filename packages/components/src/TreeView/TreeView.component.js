import VTree from 'react-virtualized-tree';
import 'react-virtualized/styles.css';
import 'react-virtualized-tree/lib/main.css';
import 'material-icons/css/material-icons.css';
import Expandable from 'react-virtualized-tree/lib/renderers/Expandable';

import PropTypes from 'prop-types';
import React, { useState } from 'react';

import classNames from 'classnames';
import { Action } from '../';
import TreeViewItem from './TreeViewItem';
import Foldable from './renderers/Foldable';

import theme from './TreeView.scss';
import withTreeGesture from '../Gesture/withTreeGesture';

function renderLegacyHeaderContent({ headerText, addAction, addActionLabel, titleId, id }) {
	const spanHeaderText = <span id={titleId}>{headerText}</span>;
	if (addAction) {
		return (
			<React.Fragment>
				{spanHeaderText}
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
			</React.Fragment>
		);
	}
	return <span id={titleId}>{headerText}</span>;
}

function TreeViewHeader({ noHeader, headerRenderer, ...rest }) {
	return (
		<header className={classNames(theme['tc-treeview-header'], { 'sr-only': noHeader })}>
			{headerRenderer ? headerRenderer() : renderLegacyHeaderContent(rest)}
		</header>
	);
}
TreeViewHeader.displayName = 'TreeviewHeader';

if (process.env.NODE_ENV !== 'production') {
	TreeViewHeader.PropTypes = {
		id: PropTypes.string.isRequired,
		titleId: PropTypes.string.isRequired,
		headerText: PropTypes.string,
		onSelect: PropTypes.func.isRequired,
		addAction: PropTypes.func,
		headerRenderer: PropTypes.func,
		addActionLabel: PropTypes.string,
		noHeader: PropTypes.bool,
	};
}
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
export const COLLAPSED_CHILDREN = {
	id: 3,
	name: 'Leaf 3',
	state: {
		expanded: false,
		favorite: true,
		deletable: true,
	},
	children: [
		{
			id: 'c-3',
			name: 'Leaf 3 Child',
			state: {},
		},
	],
};

export const EXPANDED_CHILDREN = {
	id: 2,
	name: 'Leaf 2',
	state: {
		expanded: true,
		deletable: true,
	},
	children: [
		COLLAPSED_CHILDREN,
		{
			id: 4,
			name: 'Leaf 4',
		},
	],
};

export const EXPANDED_NODE_IN_ROOT = {
	id: 0,
	name: 'Leaf 1',
	state: {
		expanded: true,
	},
	children: [
		EXPANDED_CHILDREN,
		{
			id: 5,
			name: 'Leaf 5',
		},
	],
};

export const COLLAPSED_NODE_IN_ROOT = {
	id: 1,
	name: 'Leaf 6',
	state: {
		expanded: false,
		deletable: true,
	},
	children: [
		{
			id: 6,
			name: 'Leaf 7',
			state: {
				expanded: false,
			},
			children: [
				{
					id: 7,
					name: 'Leaf 8',
				},
				{
					id: 8,
					name: 'Leaf 9',
				},
			],
		},
		{
			id: 9,
			name: 'Leaf 10',
		},
	],
};

export const DELETABLE_IN_ROOT = {
	id: 'z',
	name: 'Leaf z',
	state: {
		deletable: true,
		favorite: true,
	},
};

export const DELETABLE_CHILDREN = EXPANDED_CHILDREN;

export const Nodes = [EXPANDED_NODE_IN_ROOT, COLLAPSED_NODE_IN_ROOT, DELETABLE_IN_ROOT];
function TreeView(props) {
	const {
		id,
		structure,
		onKeyDown,
		onSelect,
		onToggle,
		className,
		selectedId,
		headerRenderer,
		...rest
	} = props;
	const containerStyle = props.style;
	const [nodes, setNodes] = useState([]);
	const titleId = id && `${id}-title`;

	function nodeNameRenderer(rendererProps) {
		const {
			node: { name },
			children,
		} = rendererProps;
		return (
			<span>
				{name}
				{children}
			</span>
		);
	}

	function handleChange(_nodes) {
		setNodes(_nodes);
	}

	function createNodeRenderer() {
		return (nodeDisplay = this.state.nodeDisplay, props) => {
			const [nextNode, ...remainingNodes] = nodeDisplay;

			if (remainingNodes.length === 0) {
				return this.renderNodeDisplay(nextNode, props);
			}

			return this.renderNodeDisplay(
				nextNode,
				props,
				this.createNodeRenderer(remainingNodes, props),
			);
		};
	}

	//	style={containerStyle}

	return (
		<div
			className={classNames('tc-treeview', theme['tc-treeview'], className)}
			style={{ height: 500, position: 'relative' }}
		>
			<TreeViewHeader {...rest} id={id} titleId={titleId} headerRenderer={headerRenderer} />
			<VTree
				nodes={Nodes}
				height={500}
				width={500}
				defaultHeight={500}
				defaultWidth={500}
				onChange={handleChange}
			>
				{({ style, node, ...p }) => (
					<div style={style}>
						<Foldable node={node} {...rest}>
							{nodeNameRenderer({ node, p })}
						</Foldable>
					</div>
				)}
			</VTree>
		</div>
	);
}


//<Expandable node={node} {...rest}>
//{nodeNameRenderer({ node, p })}
//</Expandable>

//			<ul className={theme['tc-treeview-list']} role="tree" aria-labelledby={titleId}></ul>
// createNodeRenderer([NodeNameRenderer], p)

/*
				{structure.map((item, i) => (

				))}

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
	hideFolderIcon
/>
*/
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
		onKeyDown: PropTypes.func.isRequired,
		onToggle: PropTypes.func.isRequired,
		className: PropTypes.string,
		selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
		style: PropTypes.object,
		onSelect: PropTypes.func.isRequired,
		addAction: PropTypes.func,
		addActionLabel: PropTypes.string,
		noHeader: PropTypes.bool,
		headerRenderer: PropTypes.func,
	};
}

export default withTreeGesture(TreeView);
