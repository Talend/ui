import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Connection from './ConnectionSVG.js';
import Anchor from './AnchorSVG.js';
import * as Constants from '../Constants';

const padding = 8;
const extraWidth = 26;

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

function buildSVGConnections(connections, dnd, bounds) {
	let svgConnections = [];
	if (bounds != null && connections != null) {
		const xLeft = bounds.left;
		const xRight = bounds.right;
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

function buildArrowPath(x, y) {
	const w = 5;
	const h = 5;
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
	const arrow = buildArrowPath(connection.x2, connection.y2);
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

function appendSVGAnchor(anchorYPos, svgAnchors, bounds, part, style) {
	const svgAnchor = {
		x: part === Constants.Anchor.PART.START ? bounds.left : bounds.right,
		y: anchorYPos,
		part,
		style,
	};
	return svgAnchors.concat(svgAnchor);
}

function appendSVGAnchors(anchorYPositions, svgAnchors, part, style, bounds) {
	let svga = svgAnchors.slice();
	for (let i = 0; i < anchorYPositions.length; i += 1) {
		svga = appendSVGAnchor(anchorYPositions[i], svga, bounds, part, style);
	}
	return svga;
}

function appendStyledSVGAnchors(svgAnchors, anchors, bounds, style) {
	let result = svgAnchors.slice();
	if (anchors.input) {
		result = appendSVGAnchors(anchors.input, result, Constants.Anchor.PART.START, style, bounds);
	}
	if (anchors.output) {
		result = appendSVGAnchors(anchors.output, result, Constants.Anchor.PART.END, style, bounds);
	}
	return result;
}

function buildSVGAnchors(anchors, bounds) {
	let svgAnchors = [];
	if (anchors.unmapped) {
		svgAnchors = appendStyledSVGAnchors(
			svgAnchors,
			anchors.unmapped,
			bounds,
			Constants.Anchor.STYLE.UNMAPPED,
		);
	}
	if (anchors.selected) {
		svgAnchors = appendStyledSVGAnchors(
			svgAnchors,
			anchors.selected,
			bounds,
			Constants.Anchor.STYLE.SELECTED,
		);
	}
	if (anchors.focused) {
		svgAnchors = appendStyledSVGAnchors(
			svgAnchors,
			anchors.focused,
			bounds,
			Constants.Anchor.STYLE.FOCUSED,
		);
	}
	if (anchors.mapped) {
		svgAnchors = appendStyledSVGAnchors(svgAnchors, anchors.mapped, bounds,
			Constants.Anchor.STYLE.MAPPED);
	}
	return svgAnchors;
}

function getAnchorParams(anchor) {
	switch (anchor.part) {
		case Constants.Anchor.PART.START:
			return {
				r: 3,
			};
		case Constants.Anchor.PART.END:
			return {
				arrow: buildArrowPath(anchor.x, anchor.y),
			};
		default:
			return null;
	}
}

function renderAnchor(anchor) {
	return <Anchor anchor={anchor} params={getAnchorParams(anchor)} />;
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
			return this.svgParentElem.clientWidth + extraWidth;
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
		const { connectDropTarget, getConnections, getAnchors, dnd } = this.props;

		let bounds = null;
		if (this.svgParentElem != null) {
			bounds = {
				left: padding,
				right: this.svgParentElem.clientWidth - padding + extraWidth,
			};
		}

		const connections = getConnections();
		const svgConnections = buildSVGConnections(connections, dnd, bounds);

		const anchors = getAnchors();
		const svgAnchors = buildSVGAnchors(anchors, bounds);

		return connectDropTarget(
			<div ref={this.updateSVGParentRef} className="mapping-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="mapping-svg"
					ref={this.updateSVGRef}
					width={this.getWidth()}
					height={this.getHeight()}
				>
					{svgAnchors.map(anchor => renderAnchor(anchor))}
					{svgConnections.map(connection => renderConnection(connection))}
				</svg>
			</div>,
		);
	}
}

MappingSVG.propTypes = {
	getConnections: PropTypes.func,
	getAnchors: PropTypes.func,
	connectDropTarget: PropTypes.func,
	dnd: PropTypes.object,
};

export default DropTarget(Constants.ItemTypes.ELEMENT, elementTarget, collectForDropTarget)(
	MappingSVG,
);
