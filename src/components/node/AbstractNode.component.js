import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';
import { scaleLinear } from 'd3-scale';
import { Map } from 'immutable';

import invariant from 'invariant';

import { NodeType } from '../../constants/flowdesigner.proptypes';
import { PositionRecord } from '../../constants/flowdesigner.model';

export const ABSTRACT_NODE_INVARIANT = `<AbstractNode /> should not be used without giving it a children
ex: <AbstractNode><rect /></AbstractNode>`;

/**
 * calculate the position of each ports for a given node information
 * @param ports
 * @param nodePosition
 * @param nodeSize
 */
function calculatePortPosition(ports, nodePosition, nodeSize) {
	let portsWithPosition = new Map();
	const emitterPorts = ports.filter(port => port.getIn(['graphicalAttributes', 'properties', 'type']) === 'EMITTER');
	const sinkPorts = ports.filter(port => port.getIn(['graphicalAttributes', 'properties', 'type']) === 'SINK');
	const range = [nodePosition.get('y'), nodePosition.get('y') + nodeSize.get('height')];
	const scaleYEmitter = scaleLinear()
		.domain([0, emitterPorts.size + 1])
		.range(range);
	const scaleYSink = scaleLinear()
		.domain([0, sinkPorts.size + 1])
		.range(range);
	let emitterNumber = 0;
	let sinkNumber = 0;
	emitterPorts.sort((a, b) => {
		if (a.getIndex() < b.getIndex()) {
			return -1;
		}
		if (a.getIndex() > b.getIndex()) {
			return 1;
		}
		return 0;
	}).forEach((port) => {
		emitterNumber += 1;
		const position = new PositionRecord({
			x: nodePosition.get('x') + nodeSize.get('width'),
			y: scaleYEmitter(emitterNumber),
		});
		portsWithPosition = portsWithPosition.set(port.id, port.setIn(['graphicalAttributes', 'position'], position));
	});
	sinkPorts.sort((a, b) => {
		if (a.getIndex() < b.getIndex()) {
			return -1;
		}
		if (a.getIndex() > b.getIndex()) {
			return 1;
		}
		return 0;
	}).forEach((port) => {
		sinkNumber += 1;
		const position = new PositionRecord({
			x: nodePosition.get('x'),
			y: scaleYSink(sinkNumber),
		});
		portsWithPosition = portsWithPosition.set(port.id, port.setIn(['graphicalAttributes', 'position'], position));
	});
	return portsWithPosition;
}


class AbstractNode extends React.Component {
	static propTypes = {
		node: NodeType.isRequired,
		moveNodeTo: PropTypes.func.isRequired,
		moveNodeToEnd: PropTypes.func.isRequired,
		onDragStart: PropTypes.func,
		onDrag: PropTypes.func,
		onDragEnd: PropTypes.func,
		onClick: PropTypes.func,
		children: PropTypes.node,
	};

	static calculatePortPosition = calculatePortPosition;

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	componentDidMount() {
		this.d3Node = select(this.nodeElement);
		this.d3Node.data([this.props.node.getPosition()]);
		this.d3Node.call(
			drag()
				.on('start', this.onDragStart)
				.on('drag', this.onDrag)
				.on('end', this.onDragEnd),
		);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps !== this.props;
	}

	componentWillUnmount() {
		this.d3Node.remove();
	}

	onClick(clickEvent) {
		if (this.props.onClick) {
			this.props.onClick(clickEvent);
		}
	}

	onDragStart() {
		if (this.props.onDragStart) {
			this.props.onDragStart(event);
		}
	}

	onDrag() {
		this.d3Node.data([this.props.node.getPosition()]);
		this.props.moveNodeTo(this.props.node.id, event);
		if (this.props.onDrag) {
			this.props.onDrag(event);
		}
	}

	onDragEnd() {
		this.props.moveNodeToEnd(this.props.node.id, event);
		if (this.props.onDragEnd) {
			this.props.onDragEnd(event);
		}
	}

	renderContent() {
		if (this.props.children) {
			return this.props.children;
		}
		invariant(false, ABSTRACT_NODE_INVARIANT);
		return null;
	}

	render() {
		const { node } = this.props;
		const { x, y } = node.getPosition();
		const transform = `translate(${x}, ${y})`;
		return (
			<g>
				<g
					transform={transform}
					ref={c => (this.nodeElement = c)}
					onClick={this.onClick}
				>
					{this.renderContent()}
				</g>
			</g>
		);
	}
}

export default AbstractNode;
