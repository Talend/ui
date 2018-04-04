import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
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

function drawLine(x1, y1, x2, y2, width, color, canvas) {
	const context = canvas.getContext('2d');
	context.beginPath();
	context.lineWidth = width;
	context.lineJoin = 'round';
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.strokeStyle = color;
	context.stroke();
	context.closePath();
}

function drawBezier(x1, y1, x2, y2, width, color, lineDash, canvas) {
	const context = canvas.getContext('2d');
	const x = (x2 - x1) / 2 + x1;
	context.beginPath();
	context.lineWidth = width;
	context.lineJoin = 'round';
	if (lineDash != null) {
		context.setLineDash(lineDash);
	} else {
		context.setLineDash([]);
	}
	context.moveTo(x1, y1);
	context.bezierCurveTo(x, y1, x, y2, x2, y2);
	context.strokeStyle = color;
	context.stroke();
	context.closePath();
}

function drawPoint(x, y, radius, color, canvas) {
	const context = canvas.getContext('2d');
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

function drawArrow(x, y, width, height, color, canvas) {
	const context = canvas.getContext('2d');
	const w = width / 2;
	const h = height / 2;
	const x1 = x - w;
	const y1 = y - h;
	const x2 = x + w;
	const y2 = y;
	const x3 = x1;
	const y3 = y + h;
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}

class MappingCanvas extends Component {
	constructor(props) {
		super(props);
		this.updateCanvasRef = this.updateCanvasRef.bind(this);
	}

	componentDidMount() {
		this.updateCanvas(true, true, true);
	}

	componentDidUpdate() {
		this.updateCanvas(true, true, true);
	}

	getMousePos(offset) {
		const rect = this.canvas.getBoundingClientRect();
		return {
			x: offset.x - rect.left,
			y: offset.y - rect.top,
		};
	}

	getCanvasSize() {
		return {
			width: this.canvas.width,
			height: this.canvas.height,
		};
	}

	updateCanvasSize() {
		this.canvas.width = this.props.width;
		this.canvas.height = this.props.height;
	}

	updateCanvas(clear, resetSize, renderDnd) {
		if (clear) {
			this.clearCanvas();
		}
		if (resetSize) {
			this.updateCanvasSize();
		}
		const connections = this.props.getConnections();
		if (connections != null) {
			if (connections.all != null) {
				this.drawConnections(connections.all, Constants.ConnectionParams.ALL);
			}
			if (connections.current != null) {
				this.drawConnections(connections.current, Constants.ConnectionParams.CURRENT);
			}
			if (connections.pending != null) {
				this.drawConnection(connections.pending, Constants.ConnectionParams.PENDING);
			}
			if (connections.focused != null) {
				this.drawConnections(connections.focused, Constants.ConnectionParams.FOCUSED);
			}
			if (connections.dnd != null && renderDnd) {
				this.drawConnection(connections.dnd, Constants.ConnectionParams.PENDING);
			}
			if (connections.dndInProgress && renderDnd) {
				this.drawDndInProgress(connections.dndInProgress, Constants.ConnectionParams.PENDING);
			}
		}
	}

	update() {
		this.updateCanvas(true, false, false);
	}

	drawDndInProgress(dndInProgress, params) {
		const pos = dndInProgress.pos;
		const sourceYPos = dndInProgress.sourceYPos;
		// default case: source is input
		let x1 = params.anchorRadius;
		let y1 = sourceYPos;
		let x2 = pos.x;
		let y2 = pos.y;
		if (this.props.dnd.source.side === Constants.MappingSide.OUTPUT) {
			x1 = pos.x;
			y1 = pos.y;
			x2 = this.getCanvasSize().width - params.arrowWidth / 2;
			y2 = sourceYPos;
		}
		this.drawSingleConnection(x1, y1, x2, y2, params);
	}

	clearCanvas() {
		const context = this.canvas.getContext('2d');
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawConnections(connections, params) {
		for (let i = 0; i < connections.length; i += 1) {
			this.drawConnection(connections[i], params);
		}
	}

	drawConnection(connection, params) {
		if (connection.sourceYPos != null && connection.targetYPos != null) {
			const x1 = params.anchorRadius;
			const y1 = connection.sourceYPos;
			const x2 = this.canvas.width - params.arrowWidth / 2;
			const y2 = connection.targetYPos;
			this.drawSingleConnection(x1, y1, x2, y2, params);
		}
	}

	drawSingleConnection(x1, y1, x2, y2, params) {
		drawPoint(x1, y1, params.anchorRadius, params.color, this.canvas);
		drawBezier(x1, y1, x2, y2, params.lineWidth, params.color, params.lineDash, this.canvas);
		drawArrow(x2, y2, params.arrowWidth, params.arrowHeight, params.color, this.canvas);
	}

	updateCanvasRef(ref) {
		this.canvas = ref;
	}

	render() {
		const { connectDropTarget } = this.props;
		return connectDropTarget(<canvas ref={this.updateCanvasRef} className="mapping-canvas" />);
	}
}

MappingCanvas.propTypes = {
	getConnections: PropTypes.func,
	connectDropTarget: PropTypes.func,
	dnd: PropTypes.object,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default DropTarget(Constants.ItemTypes.ELEMENT, elementTarget, collectForDropTarget)(
	MappingCanvas,
);
