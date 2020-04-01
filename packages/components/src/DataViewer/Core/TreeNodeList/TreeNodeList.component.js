import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TreeNode from '../TreeNode';

/**
 * Render a list of TreeNode (branch or leaf).
 */
export default function TreeNodeList({ treeClassName, nodeClassName, ...props }) {
	return (
		<ul className={treeClassName}>
			{props.value.map((node, index) => (
				<li key={index} className={nodeClassName}>
					<TreeNode
						{...props}
						{...node}
						index={props.index || 0}
						dataKey={get(node, 'dataKey')}
						value={get(node, 'value')}
						jsonpath={props.getJSONPath(get(node, 'dataKey'), {
							jsonpath: props.jsonpath,
							type: props.type,
							value: node,
						})}
					/>
				</li>
			))}
		</ul>
	);
}

TreeNodeList.propTypes = {
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	getJSONPath: PropTypes.func.isRequired,
	index: PropTypes.number,
	jsonpath: PropTypes.string,
	nodeClassName: PropTypes.string,
	paddingOffset: PropTypes.number,
	treeClassName: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.array.isRequired,
};
