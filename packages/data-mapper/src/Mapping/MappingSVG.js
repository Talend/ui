import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Connection from './ConnectionSVG';
import Anchor from './AnchorSVG';
import DraggableAnchor from './DraggableAnchor';
import Constants from '../Constants';

const padding = 8;
const extraWidth = 24;

const elementTarget = {
	hover(props, monitor) {
		// verify whether a child, or just the current drop target is being hovered
		if (monitor.isOver({ shallow: true })) {
			props.dndListener.dndInProgress(monitor.getClientOffset());
		}
	},
	canDrop(props) {
		return false;
	},
};

function collectForDropTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

function appendSVGConnection(connection, svgConnections, style, x1, x2) {
	const visibility = connection.visibility
		? connection.visibility
		: Constants.Connection.VISIBILITY.FULL;
	const svgConnection = {
		x1,
		y1: connection.sourceYPos,
		x2,
		y2: connection.targetYPos,
		style,
		visibility,
		key: connection.key,
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
		if (connections.all) {
			svgConnections = appendSVGConnections(
				connections.all,
				svgConnections,
				Constants.Connection.STYLE.ALL,
				xLeft,
				xRight,
			);
		}
		if (connections.current) {
			svgConnections = appendSVGConnections(
				connections.current,
				svgConnections,
				Constants.Connection.STYLE.CURRENT,
				xLeft,
				xRight,
			);
		}
		if (connections.pending) {
			svgConnections = appendSVGConnection(
				connections.pending,
				svgConnections,
				Constants.Connection.STYLE.PENDING,
				xLeft,
				xRight,
			);
		}
		if (connections.focused) {
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
			const svgConnection = buildDndInProgressSVGConnection(
				dnd,
				connections.dndInProgress,
				xLeft,
				xRight,
			);
			svgConnections = svgConnections.concat(svgConnection);
		}
	}
	return svgConnections;
}

function buildDndInProgressSVGConnection(dnd, dndInProgress, xLeft, xRight) {
	const pos = dndInProgress.pos;
	const sourceYPos = dndInProgress.sourceYPos;
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
	return {
		x1,
		y1,
		x2,
		y2,
		style: Constants.Connection.STYLE.PENDING,
		key: dndInProgress.key,
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
		visibility: connection.visibility,
	};
}

function renderConnection(connection) {
	const connectionId = `${connection.key}-${connection.style}`;
	return (
		<Connection
			connectionId={connectionId}
			key={connectionId}
			params={getBezierParams(connection)}
			style={connection.style}
		/>
	);
}

function getAnchorClasses(anchor) {
	let classes = [];
	if (anchor.focused) {
		classes = classes.concat('focused');
	} else if (anchor.selected) {
		classes = classes.concat('selected');
	}
	if (anchor.mapped) {
		classes = classes.concat('mapped');
	} else {
		classes = classes.concat('unmapped');
	}
	return classes;
}

function appendSVGAnchor(svgAnchors, anchor, bounds) {
	const classes = getAnchorClasses(anchor);
	const svgAnchor = {
		x: anchor.side === Constants.MappingSide.INPUT ? bounds.left : bounds.right,
		y: anchor.yPos,
		element: anchor.element,
		side: anchor.side,
		key: anchor.key,
		classes,
		mapped: anchor.mapped,
	};
	return svgAnchors.concat(svgAnchor);
}

function appendSVGAnchors(svgAnchors, anchors, bounds) {
	let svga = svgAnchors.slice();
	const anchorKeys = Object.keys(anchors);
	for (let i = 0; i < anchorKeys.length; i += 1) {
		const anchor = anchors[anchorKeys[i]];
		if (anchor.visible) {
			svga = appendSVGAnchor(svga, anchor, bounds);
		}
	}
	return svga;
}

function buildSVGAnchors(anchors, bounds) {
	let svgAnchors = [];
	if (anchors.input) {
		svgAnchors = appendSVGAnchors(svgAnchors, anchors.input, bounds);
	}
	if (anchors.output) {
		svgAnchors = appendSVGAnchors(svgAnchors, anchors.output, bounds);
	}
	return svgAnchors;
}

function getAnchorParams(anchor) {
	switch (anchor.side) {
		case Constants.MappingSide.INPUT:
			return {
				r: 4,
			};
		case Constants.MappingSide.OUTPUT:
			if (anchor.mapped) {
				return {
					arrow: buildArrowPath(anchor.x, anchor.y),
				};
			}
			return {
				r: 4,
			};
		default:
			return null;
	}
}

function renderAnchor(anchor) {
	return <Anchor key={anchor.key} anchor={anchor} params={getAnchorParams(anchor)} />;
}

function renderDraggableAnchor(anchor, onEnterAnchor, onLeaveAnchor, dndListener) {
	const size = 22;
	const anchorStyle = {
		position: 'absolute',
		top: anchor.y - size / 2,
		left: anchor.x - size - 1,
		width: size,
		height: size,
	};
	return (
		<DraggableAnchor
			key={anchor.key}
			anchor={anchor}
			anchorStyle={anchorStyle}
			onEnterAnchor={onEnterAnchor}
			onLeaveAnchor={onLeaveAnchor}
			dndListener={dndListener}
		/>
	);
}

function renderGradientStops(gradientStops) {
	return gradientStops.map((stop, i) => (
		<stop key={i} id={`grad-stop-${stop.key}`} offset={`${stop.offset}%`} />
	));
}

function renderLinearGradients(gradientStops, key) {
	if (gradientStops) {
		return (
			<defs>
				<linearGradient id={`grad-left-top-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
					{renderGradientStops(gradientStops)}
				</linearGradient>
				<linearGradient id={`grad-left-bottom-${key}`} x1="0%" y1="100%" x2="100%" y2="0%">
					{renderGradientStops(gradientStops)}
				</linearGradient>
				<linearGradient id={`grad-right-top-${key}`} x1="100%" y1="0%" x2="0%" y2="100%">
					{renderGradientStops(gradientStops)}
				</linearGradient>
				<linearGradient id={`grad-right-bottom-${key}`} x1="100%" y1="100%" x2="0%" y2="0%">
					{renderGradientStops(gradientStops)}
				</linearGradient>
				<linearGradient id={`grad-left-right-${key}`} x1="0%" x2="100%">
					{renderGradientStops(gradientStops)}
				</linearGradient>
			</defs>
		);
	}
	return null;
}

function boundsAreEqual(bounds1, bounds2) {
	if (bounds1 && bounds2) {
		return bounds1.left === bounds2.left && bounds1.right === bounds2.right;
	}
	return false;
}

class MappingSVG extends Component {
	constructor(props) {
		super(props);
		this.updateSVGRef = this.updateSVGRef.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.getHeight = this.getHeight.bind(this);
		this.updateMappingContentRef = this.updateMappingContentRef.bind(this);
		this.checkMappingContentResize = this.checkMappingContentResize.bind(this);
		this.bounds = null;
		this.svgAnchors = null;
		this.svgAnchorsVersion = -1;
	}

	componentDidMount() {
		this.intervalRef = setInterval(this.checkMappingContentResize, 250);
	}

	componentWillUnmount() {
		clearInterval(this.intervalRef);
	}

	checkMappingContentResize() {
		const bounds = this.getBounds();
		if (!boundsAreEqual(this.bounds, bounds)) {
			this.forceUpdate();
		}
	}

	getMousePos(offset) {
		const rect = this.svg.getBoundingClientRect();
		return {
			x: offset.x - rect.left,
			y: offset.y - rect.top,
		};
	}

	getWidth() {
		return this.mappingContentRef ? this.mappingContentRef.clientWidth + extraWidth : 0;
	}

	getHeight() {
		return this.mappingContentRef ? this.mappingContentRef.clientHeight : 0;
	}

	reveal(connectionKey) {
		const styleKeys = Object.keys(Constants.Connection.STYLE);
		for (let i = 0; i < styleKeys.length; i += 1) {
			const style = Constants.Connection.STYLE[styleKeys[i]];
			const animationId = `anim-${connectionKey}-${style}`;
			const animation = document.getElementById(animationId);
			if (animation && animation.beginElement) {
				animation.beginElement();
			}
		}
	}

	getSVGAnchors(anchors, bounds) {
		if (
			!this.svgAnchors ||
			this.svgAnchorsVersion !== anchors.version ||
			!boundsAreEqual(this.bounds, bounds)
		) {
			this.svgAnchors = buildSVGAnchors(anchors, bounds);
			this.svgAnchorsVersion = anchors.version;
			this.bounds = {
				left: bounds.left,
				right: bounds.right,
			};
		}
		return this.svgAnchors;
	}

	getBounds() {
		const rightMargin = extraWidth - padding;
		return {
			left: padding,
			right: this.mappingContentRef
				? this.mappingContentRef.clientWidth + rightMargin
				: rightMargin,
		};
	}

	updateDND() {
		const dndConnectionElement = document.getElementById('dnd-in-progress-pending');
		if (dndConnectionElement) {
			const dndInProgressConnection = this.props.getConnections(true);
			// update connection directly!
			const bounds = this.getBounds();
			const svgConnection = buildDndInProgressSVGConnection(
				this.props.dnd,
				dndInProgressConnection,
				bounds.left,
				bounds.right,
			);
			const params = getBezierParams(svgConnection);
			// update start element attributes (cx & cy)
			const startElem = document.getElementById('dnd-in-progress-pending-start');
			if (startElem) {
				startElem.setAttribute('cx', params.x1);
				startElem.setAttribute('cy', params.y1);
			}
			// update curve element attribute (curve path)
			const curveElem = document.getElementById('dnd-in-progress-pending-curve');
			if (curveElem) {
				curveElem.setAttribute('d', params.path);
			}
			// update end element attributes (arrow path)
			const endElem = document.getElementById('dnd-in-progress-pending-end');
			if (endElem) {
				endElem.setAttribute('d', params.arrow);
			}
		}
	}

	update() {
		this.forceUpdate();
	}

	updateSVGRef(ref) {
		this.svg = ref;
	}

	updateMappingContentRef(ref) {
		this.mappingContentRef = ref;
	}

	render() {
		const {
			connectDropTarget,
			getConnections,
			getAnchors,
			dnd,
			dndListener,
			preferences,
			onEnterAnchor,
			onLeaveAnchor,
		} = this.props;

		const bounds = this.getBounds();
		const connections = getConnections();
		const svgConnections = buildSVGConnections(connections, dnd, bounds);

		const anchors = getAnchors();
		const svgAnchors = this.getSVGAnchors(anchors, bounds);

		return connectDropTarget(
			<div ref={this.updateMappingContentRef} className="mapping-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="mapping-svg"
					ref={this.updateSVGRef}
					width={this.getWidth()}
					height={this.getHeight()}
				>
					{renderLinearGradients(preferences.gradientStops50, '50')}
					{renderLinearGradients(preferences.gradientStops100, '100')}
					{svgAnchors.map(anchor => renderAnchor(anchor))}
					{svgConnections.map(connection => renderConnection(connection))}
				</svg>
				{svgAnchors.map(anchor =>
					renderDraggableAnchor(anchor, onEnterAnchor, onLeaveAnchor, dndListener),
				)}
			</div>,
		);
	}
}

MappingSVG.propTypes = {
	getConnections: PropTypes.func,
	getAnchors: PropTypes.func,
	connectDropTarget: PropTypes.func,
	dnd: PropTypes.object,
	dndListener: PropTypes.object,
	preferences: PropTypes.object,
	onEnterAnchor: PropTypes.func,
	onLeaveAnchor: PropTypes.func,
};

export default DropTarget('element', elementTarget, collectForDropTarget)(MappingSVG);
