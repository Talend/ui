import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes, ConnectionParams } from '../Constants';
import { drawBezier, drawPoint, drawArrow } from '../Drawing.js';

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

class MappingArea extends Component {
	componentDidMount() {
		this.updateCanvasSize();
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
		this.canvas.width = this.canvasParentElem.clientWidth;
		this.canvas.height = this.canvasParentElem.clientHeight;
	}

	updateCanvas(clear, resetSize, renderDnd) {
		// console.log('updateCanvas(' + clear + ', ' + resetSize + ', ' + renderDnd + ')');
		if (clear) {
			this.clearCanvas();
		}
		if (resetSize) {
			this.updateCanvasSize();
		}
		const connections = this.props.getConnections();
		if (connections != null) {
			if (connections.all != null) {
				this.drawConnections(connections.all, ConnectionParams.ALL);
			}
			if (connections.current != null) {
				this.drawConnections(connections.current, ConnectionParams.CURRENT);
			}
			if (connections.pending != null) {
				this.drawConnection(connections.pending, ConnectionParams.PENDING);
			}
			if (connections.focused != null) {
				this.drawConnections(connections.focused, ConnectionParams.FOCUSED);
			}
			if (connections.dnd != null && renderDnd) {
				this.drawConnection(connections.dnd, ConnectionParams.PENDING);
			}
		}
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
		// console.log('drawSingleConnection(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ')');
		drawPoint(x1, y1, params.anchorRadius, params.color, this.canvas);
		drawBezier(x1, y1, x2, y2, params.lineWidth, params.color, params.lineDash, this.canvas);
		drawArrow(x2, y2, params.arrowWidth, params.arrowHeight, params.color, this.canvas);
	}

	render() {
		const { connectDropTarget } = this.props;
		return connectDropTarget(
			<div
				ref={c => {
					this.canvasParentElem = c;
				}}
				id="mapping-content"
			>
				<canvas
					ref={c => {
						this.canvas = c;
					}}
					id="mapping-canvas"
				/>
			</div>,
		);
	}
}

MappingArea.propTypes = {
	getConnections: PropTypes.func,
	connectDropTarget: PropTypes.func,
};

export default DropTarget(ItemTypes.ELEMENT, elementTarget, collectForDropTarget)(MappingArea);
