import { Component } from 'react';
import type { MouseEventHandler, MouseEvent } from 'react';
import { scaleLinear, drag, select } from 'd3';
import { Map } from 'immutable';

import invariant from 'invariant';

import { Node, Port, Position, Size } from '../../api';
import { GRID_SIZE, PORT_SINK, PORT_SOURCE } from '../../constants/flowdesigner.constants';
import {
	PortRecordMap,
	Position as PositionType,
	Size as SizeType,
	NodeRecord,
	Id,
} from '../../customTypings/index.d';

export const ABSTRACT_NODE_INVARIANT = `<AbstractNode /> should not be used without giving it a children
ex: <AbstractNode><rect /></AbstractNode>`;

/**
 * calculate the position of each ports for a given node information
 * @param ports
 * @param nodePosition
 * @param nodeSize
 */
function calculatePortPosition(
	ports: PortRecordMap,
	nodePosition: PositionType,
	nodeSize: SizeType,
) {
	let portsWithPosition = Map();
	const emitterPorts = ports.filter(port => Port.getTopology(port) === PORT_SOURCE);
	const sinkPorts = ports.filter(port => Port.getTopology(port) === PORT_SINK);
	const range = [
		Position.getYCoordinate(nodePosition),
		Position.getYCoordinate(nodePosition) + Size.getHeight(nodeSize),
	];
	const scaleYEmitter = scaleLinear()
		.domain([0, emitterPorts.size + 1])
		.range(range);
	const scaleYSink = scaleLinear()
		.domain([0, sinkPorts.size + 1])
		.range(range);
	let emitterNumber = 0;
	let sinkNumber = 0;
	emitterPorts
		.sort((a, b) => {
			if (Port.getIndex(a) < Port.getIndex(b)) {
				return -1;
			}
			if (Port.getIndex(a) > Port.getIndex(b)) {
				return 1;
			}
			return 0;
		})
		.forEach(port => {
			emitterNumber += 1;

			const position = Position.create(
				Position.getXCoordinate(nodePosition) + Size.getWidth(nodeSize),
				scaleYEmitter(emitterNumber),
			);
			portsWithPosition = portsWithPosition.set(Port.getId(port), Port.setPosition(port, position));
		});
	sinkPorts
		.sort((a, b) => {
			if (Port.getIndex(a) < Port.getIndex(b)) {
				return -1;
			}
			if (Port.getIndex(a) > Port.getIndex(b)) {
				return 1;
			}
			return 0;
		})
		.forEach(port => {
			sinkNumber += 1;
			const position = Position.create(
				Position.getXCoordinate(nodePosition),
				scaleYSink(sinkNumber),
			);
			portsWithPosition = portsWithPosition.set(Port.getId(port), Port.setPosition(port, position));
		});
	return portsWithPosition;
}

type Props = {
	node: NodeRecord;
	startMoveNodeTo: (nodeId: Id, nodePosition: PositionType) => void;
	moveNodeTo: (nodeId: Id, nodePosition: PositionType) => void;
	moveNodeToEnd: (nodeId: Id, nodePosition: PositionType) => void;
	snapToGrid?: boolean;
	onDragStart?: (event: any) => void;
	onDrag?: (event: any) => void;
	onDragEnd?: (event: any) => void;
	onClick?: MouseEventHandler;
	onDoubleClick?: MouseEventHandler;
	children?: any;
};

class AbstractNode extends Component<Props> {
	static calculatePortPosition = calculatePortPosition;

	d3Node: any;

	nodeElement: any;

	squaredDeltaDrag = 0;

	constructor(props: Props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.getEventPosition = this.getEventPosition.bind(this);
	}

	componentDidMount() {
		this.d3Node = select(this.nodeElement);
		this.d3Node.data([this.props.node.getPosition()]);
		this.d3Node.call(
			drag().on('start', this.onDragStart).on('drag', this.onDrag).on('end', this.onDragEnd),
		);
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.node !== this.props.node) {
			const nextPosition = Node.getPosition(this.props.node);
			if (nextPosition !== Node.getPosition(prevProps.node)) {
				this.d3Node.data([nextPosition]);
			}
		}
	}

	shouldComponentUpdate(nextProps: Props) {
		return nextProps !== this.props;
	}

	componentWillUnmount() {
		this.d3Node.remove();
	}

	onClick(clickEvent: MouseEvent) {
		if (this.props.onClick) {
			this.props.onClick(clickEvent);
		}
	}

	onDoubleClick(clickEvent: MouseEvent) {
		if (this.props.onDoubleClick) {
			this.props.onDoubleClick(clickEvent);
		}
	}

	onDragStart(event: any) {
		this.squaredDeltaDrag = 0;
		const position = {
			x: event.x,
			y: event.y,
		};
		this.props.startMoveNodeTo(this.props.node.id, position);
		if (this.props.onDragStart) {
			this.props.onDragStart(event);
		}
	}

	onDrag(event: any) {
		this.squaredDeltaDrag += event.dx * event.dx + event.dy * event.dy;
		const position = {
			x: event.x,
			y: event.y,
			movementX: event.sourceEvent.movementX,
			movementY: event.sourceEvent.movementY,
		};
		this.props.moveNodeTo(this.props.node.id, position);
		if (this.props.onDrag) {
			this.props.onDrag(position);
		}
	}

	onDragEnd(event: any) {
		// Ok this is pretty specific
		// for a chrome windows bug
		// where d3 inhibit onCLick propagation
		// if there is any delta between down and up of the mouse
		// here we add a tolerance, so the underlying click doesn't
		// get smooshed if the user do not initiate drag
		if (this.squaredDeltaDrag < 1) {
			select(window).on('click.drag', null);
		}
		const position = this.getEventPosition(event);
		this.props.moveNodeToEnd(this.props.node.id, position);
		this.d3Node.data([position]);
		if (this.props.onDragEnd) {
			this.props.onDragEnd(position);
		}
	}

	getEventPosition(event: any) {
		if (this.props.snapToGrid) {
			return {
				x: event.x - (event.x % GRID_SIZE),
				y: event.y - (event.y % GRID_SIZE),
			};
		}
		return { x: event.x, y: event.y };
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
		const { x, y } = Node.getPosition(node);
		const transform = `translate(${x}, ${y})`;
		return (
			<g>
				<g
					transform={transform}
					ref={c => {
						this.nodeElement = c;
					}}
					onClick={this.onClick}
					onDoubleClick={this.onDoubleClick}
					data-testid={`group.${node.id}`}
				>
					{this.renderContent()}
				</g>
			</g>
		);
	}
}

export default AbstractNode;
