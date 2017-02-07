import React, { PropTypes } from 'react';
import invariant from 'invariant';

class NodeType extends React.Component {
	static displayName = 'NodeType';
	static propTypes = {
		type: PropTypes.string.isRequired,
		component: PropTypes.func.isRequired,
	}

	render() {
		invariant(
			false,
			'<NodeType> elements are for DataFlow configuration only and should not be rendered'
		);
		return null;
	}
}

export default NodeType;
