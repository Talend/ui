import React from 'react';
import invariant from 'invariant';
import get from 'lodash/get';
import { NodeRecordMap, NodeRecord, Id, Position } from '../../customTypings/index.d';

type Props = {
	nodes: NodeRecordMap;
	nodeTypeMap: Object;
	startMoveNodeTo: (nodeId: Id, nodePosition: string) => void;
	moveNodeTo: (nodeId: Id, nodePosition: Position) => void;
	moveNodeToEnd: (nodeId: Id, nodePosition: Position) => void;
	snapToGrid: boolean;
};

class NodesRenderer extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.renderNode = this.renderNode.bind(this);
	}

	renderNode(node: NodeRecord) {
		const type = node.getNodeType();
		const ConcreteComponent = get((this.props.nodeTypeMap as any)[type], 'component');
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
