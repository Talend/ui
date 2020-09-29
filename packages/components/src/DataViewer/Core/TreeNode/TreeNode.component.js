import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Tree from '../Tree';

/**
 * Return the type of the current node.
 * @param {string} type
 */
export function isBranch(type) {
	return type === 'array' || type === 'object';
}

/**
 * Check if the branch is currently opened with the help of the jonspath.
 * @param {boolean} expandAll
 * @param {number} index
 * @param {array} paths
 * @param {string} jsonpath
 */
export function isBranchOpened(expandAll, index, paths, jsonpath) {
	const isPresent = get(paths, index, []).indexOf(jsonpath) !== -1;
	return expandAll ? !isPresent : isPresent;
}

/**
 * Check if the node is highlight with the help of the jsonpath.
 * @param {array} highlighted
 * @param {string} jsonpath
 */
export function isNodeHighlighted(highlighted, jsonpath) {
	return !!highlighted.find(pattern => jsonpath.match(pattern));
}

/**
 * Check if children's branch has been selected and branch is closed.
 * if so the branch will be highlighted.
 * Only for object type.
 * @param {boolean} opened
 * @param {boolean} nodeHighlighted
 * @param {string} type
 */
export function isDeepNodeHighlighted(opened, nodeHighlighted, type) {
	if (type === 'object' || type === 'array') {
		return !opened && nodeHighlighted;
	}
	return nodeHighlighted;
}

/**
 * Render a branch or a leaf.
 * It gives the recursiveTree func to the branch to help render another tree.
 */
export default class TreeNode extends React.Component {
	static propTypes = {
		branch: PropTypes.func.isRequired,
		getItemType: PropTypes.func.isRequired,
		index: PropTypes.number,
		isAllExpanded: PropTypes.bool,
		jsonpath: PropTypes.string.isRequired,
		leaf: PropTypes.func.isRequired,
		level: PropTypes.number,
		paths: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		value: PropTypes.any,
	};

	recursiveTree = args => <Tree {...this.props} {...args} level={this.props.level + 1} />;

	render() {
		const type = this.props.getItemType(this.props.value);
		const opened = isBranchOpened(
			this.props.isAllExpanded,
			this.props.index,
			this.props.paths,
			this.props.jsonpath,
		);
		const nodeHighlighted = isNodeHighlighted(
			get(this.props, 'highlighted', []),
			this.props.jsonpath,
		);

		if (isBranch(type)) {
			return this.props.branch({
				...this.props,
				nodeHighlighted: isDeepNodeHighlighted(opened, nodeHighlighted, type),
				opened,
				recursive: this.recursiveTree,
				type,
			});
		}
		return this.props.leaf({ ...this.props, nodeHighlighted });
	}
}
