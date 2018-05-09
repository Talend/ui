import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import { mapOf } from 'react-immutable-proptypes';

import { NodeType } from '../../constants/flowdesigner.proptypes';

class NodesRenderer extends React.Component {
	static propTypes = {
		nodes: mapOf(NodeType).isRequired,
		nodeTypeMap: PropTypes.object.isRequired,
		startMoveNodeTo: PropTypes.func.isRequired,
		moveNodeTo: PropTypes.func.isRequired,
		moveNodeToEnd: PropTypes.func.isRequired,
		snapToGrid: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);
		this.renderNode = this.renderNode.bind(this);
	}

	renderNode(node) {
		const type = node.getNodeType();
		const ConcreteComponent = this.props.nodeTypeMap[type].component;
		if (!ConcreteComponent) {
			invariant(
				false,
				`<NodesRenderer />  the defined node type in your graph model hasn't been mapped into
				the dataflow configuration, check NodeType documentation`,
			);
		}
		return (
			<ConcreteComponent
				node={node}
				startMoveNodeTo={this.props.startMoveNodeTo}
				moveNodeTo={this.props.moveNodeTo}
				moveNodeToEnd={this.props.moveNodeToEnd}
				key={node.id}
				snapToGrid={this.props.snapToGrid}
			/>
		);
	}

	render() {
		return <g>{this.props.nodes.valueSeq().map(this.renderNode)}</g>;
	}
}

export default NodesRenderer;
