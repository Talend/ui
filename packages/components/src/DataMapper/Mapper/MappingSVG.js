import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Connection from './ConnectionSVG.js';
import * as Constants from '../Constants';

const elementTarget = {
	canDrop(props, monitor) {
		const clientOffset = monitor.getClientOffset();
		props.dndInProgress(clientOffset);
		return false;
	},
};

function collectForDropTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

function appendSVGConnection(connection, svgConnections, style, x1, x2) {
	const svgConnection = {
		x1,
		y1: connection.sourceYPos,
		x2,
		y2: connection.targetYPos,
		style,
	};
	return svgConnections.concat(svgConnection);
}

function appendSVGConnections(connections, svgConnections, style, x1, x2) {
	let svgcs = svgConnections.slice();
	for (let i = 0; i < connections.length; i += 1) {
		svgcs = appendSVGConnection(connections[i], svgcs, style, x1, x2);
	}
	return svgcs;
}

function buildSVGConnections(connections, dnd, container) {
	let svgConnections = [];
	if (container != null && connections != null) {
		const xLeft = 8;
		const xRight = container.clientWidth - 8;
		if (connections.all != null) {
			svgConnections = appendSVGConnections(
				connections.all,
				svgConnections,
				Constants.Connection.STYLE.ALL,
				xLeft,
				xRight,
			);
		}
		if (connections.current != null) {
			svgConnections = appendSVGConnections(
				connections.current,
				svgConnections,
				Constants.Connection.STYLE.CURRENT,
				xLeft,
				xRight,
			);
		}
		if (connections.pending != null) {
			svgConnections = appendSVGConnection(
				connections.pending,
				svgConnections,
				Constants.Connection.STYLE.PENDING,
				xLeft,
				xRight,
			);
		}
		if (connections.focused != null) {
			svgConnections = appendSVGConnections(
				connections.focused,
				svgConnections,
				Constants.Connection.STYLE.FOCUSED,
				xLeft,
				xRight,
			);
		}
		if (connections.dnd) {
			svgConnections = appendSVGConnection(
				connections.dnd,
				svgConnections,
				Constants.Connection.STYLE.PENDING,
				xLeft,
				xRight,
			);
		} else if (connections.dndInProgress) {
			const pos = connections.dndInProgress.pos;
			const sourceYPos = connections.dndInProgress.sourceYPos;
			// default case: source is input
			let x1 = xLeft;
			let y1 = sourceYPos;
			let x2 = pos.x;
			let y2 = pos.y;
			if (dnd.source.side === Constants.MappingSide.OUTPUT) {
				x1 = pos.x;
				y1 = pos.y;
				x2 = xRight;
				y2 = sourceYPos;
			}
			const svgConnection = {
				x1,
				y1,
				x2,
				y2,
				style: Constants.Connection.STYLE.PENDING,
			};
			svgConnections = svgConnections.concat(svgConnection);
		}
	}
	return svgConnections;
}

function getLineParams(connection) {
	return {
		kind: 'line',
		x1: connection.x1,
		y1: connection.y1,
		x2: connection.x2,
		y2: connection.y2,
		style: connection.style,
	};
}

function buildBezierPath(connection) {
	const x = (connection.x2 - connection.x1) / 2 + connection.x1;
	const start = `M ${connection.x1} ${connection.y1} `;
	const curve1 = `C ${x} ${connection.y1}, `;
	const curve2 = `${x} ${connection.y2}, `;
	const end = `${connection.x2} ${connection.y2}`;
	return start + curve1 + curve2 + end;
}

function buildArrowPath(connection) {
	const x = connection.x2;
	const y = connection.y2;
	const w = 4;
	const h = 4;
	const x1 = x - w;
	const y1 = y - h;
	const x2 = x + w;
	const y2 = y;
	const x3 = x1;
	const y3 = y + h;
	const start = `M ${x1} ${y1} `;
	const line1 = `L ${x2} ${y2} `;
	const line2 = `L ${x3} ${y3} `;
	const close = 'Z';
	return start + line1 + line2 + close;
}

function getBezierParams(connection) {
	const path = buildBezierPath(connection);
	const arrow = buildArrowPath(connection);
	return {
		kind: 'bezier',
		x1: connection.x1,
		y1: connection.y1,
		x2: connection.x2,
		y2: connection.y2,
		path,
		arrow,
		style: connection.style,
	};
}

function renderConnection(connection) {
	return <Connection params={getBezierParams(connection)} style={connection.style} />;
}

class MappingSVG extends Component {
	constructor(props) {
		super(props);
		this.updateSVGParentRef = this.updateSVGParentRef.bind(this);
		this.updateSVGRef = this.updateSVGRef.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.getHeight = this.getHeight.bind(this);
	}

	getMousePos(offset) {
		const rect = this.svg.getBoundingClientRect();
		return {
			x: offset.x - rect.left,
			y: offset.y - rect.top,
		};
	}

	getWidth() {
		if (this.svgParentElem) {
			return this.svgParentElem.clientWidth;
		}
		return 100;
	}

	getHeight() {
		if (this.svgParentElem) {
			return this.svgParentElem.clientHeight;
		}
		return 100;
	}

	update() {
		this.forceUpdate();
	}

	updateSVGParentRef(ref) {
		this.svgParentElem = ref;
	}

	updateSVGRef(ref) {
		this.svg = ref;
	}

	render() {
		const { connectDropTarget, getConnections, dnd } = this.props;
		const connections = getConnections();
		const svgConnections = buildSVGConnections(connections, dnd, this.svgParentElem);
		return connectDropTarget(
			<div ref={this.updateSVGParentRef} className="mapping-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					ref={this.updateSVGRef}
					width={this.getWidth()}
					height={this.getHeight()}
				>
					{svgConnections.map(connection => renderConnection(connection))}
				</svg>
			</div>,
		);
	}
}

MappingSVG.propTypes = {
	getConnections: PropTypes.func,
	connectDropTarget: PropTypes.func,
	dnd: PropTypes.object,
};

export default DropTarget(Constants.ItemTypes.ELEMENT, elementTarget, collectForDropTarget)(
	MappingSVG,
);
