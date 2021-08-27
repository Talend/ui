import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeNode from '../TreeNode';
import TreeNodeList from '../TreeNodeList';
import theme from './Tree.scss';

/**
 * Check if we are at the root level of the tree.
 * @param {number} level
 */
export function isRoot(level) {
	return level === 0;
}

/**
 * Create a generic tree.
 * Css customization with border available.
 */
export default function Tree({ className, noRoot, withNodeBorder, ...props }) {
	const treeClassNames = classNames(theme['tc-tree'], 'tc-tree', className);
	const recursiveTree = args => <Tree {...props} {...args} level={props.level + 1} />;
	if (isRoot(props.level)) {
		if (noRoot) {
			return <TreeNodeList {...props} recursive={recursiveTree} treeClassName={treeClassNames} />;
		}
		return (
			<TreeNode
				{...props}
				recursive={recursiveTree}
				className={treeClassNames}
				dataKey={props.dataKey || 0}
				index={props.index || 0}
			/>
		);
	}
	return (
		<TreeNodeList
			{...props}
			recursive={recursiveTree}
			treeClassName={classNames(theme['tc-tree-list'], 'tc-tree-list')}
			nodeClassName={classNames({
				[theme['tc-tree-node-border']]: withNodeBorder,
				'tc-tree-node-border': withNodeBorder,
			})}
		/>
	);
}

Tree.defaultProps = {
	withNodeBorder: true,
};

Tree.propTypes = {
	className: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	index: PropTypes.number,
	level: PropTypes.number,
	noRoot: PropTypes.bool,
	withNodeBorder: PropTypes.bool,
};
