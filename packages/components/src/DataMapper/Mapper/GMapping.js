import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drawLine, drawBezier, drawPoint, drawArrow } from '../Drawing.js';
import { ConnectionParams } from '../Constants';

export default class GMapping extends Component {
	// resizeCanvas() {
	// 	console.log('RESIZE CANVAS')
	// }

	componentDidMount() {
		this.updateCanvasSize();
		// this.canvasParent = document.getElementById('mapping-content');
		// this.canvasParent.addEventListener('resize', this.resizeCanvas, false);
	}

	// componentWillUnmount() {
	// 	this.canvasParent.removeEventListener('resize', this.resizeCanvas, false);
	// }

	// componentWillUpdate() {
	// 	this.updateCanvasSize();
	// }

	componentDidUpdate() {
		this.updateCanvas(true, true);
	}

	updateCanvasSize() {
		this.canvas.width = this.canvasParentElem.clientWidth;
		this.canvas.height = this.canvasParentElem.clientHeight;
	}

	updateCanvas(clear, resetSize) {
		if (clear) {
			this.clearCanvas();
		}
		if (resetSize) {
			this.updateCanvasSize();
		}
		const connections = this.props.getConnections();
		if (connections != null) {
			if (connections.current != null) {
				for (let i = 0; i < connections.current.length; i += 1) {
  				this.drawConnection(connections.current[i], ConnectionParams.CURRENT);
				}
			}
			if (connections.pending != null) {
				this.drawConnection(connections.pending, ConnectionParams.PENDING);
			}
		}
	}

	clearCanvas() {
		const context = this.canvas.getContext('2d');
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// drawConnection(connection) {
	// 	if (connection.sourceYPos != null && connection.targetYPos != null) {
	// 		const x1 = 5;
	// 		const y1 = connection.sourceYPos;
	// 		const x2 = this.canvas.width - 5;
	// 		const y2 = connection.targetYPos;
	// 		drawPoint(x1, y1, 5, this.canvas);
	// 		drawBezier(x1, y1, x2, y2, 4, this.canvas);
	// 		drawArrow(x2, y2, 12, 12, this.canvas);
	// 	}
	// }

	drawConnection(connection, params) {
		if (connection.sourceYPos != null && connection.targetYPos != null) {
			const x1 = params.anchorRadius;
			const y1 = connection.sourceYPos;
			const x2 = this.canvas.width - params.anchorRadius;
			const y2 = connection.targetYPos;
			drawPoint(x1, y1, params.anchorRadius, this.canvas);
			drawBezier(x1, y1, x2, y2, params.lineWidth, params.lineDash, this.canvas);
			drawArrow(x2, y2, params.arrowWidth, params.arrowHeight, this.canvas);
		}
	}

	render() {
		return (
			<div id="mapping" className="mapper-element">
				<div id="mapping-tools">
					<button
						id="clear-connection"
						className="remove-action"
						onClick={this.props.clearConnection}
					>
						Clear
					</button>
					<button
						id="clear-mapping"
						className="remove-all-action"
						onClick={this.props.clearMapping}
					>
						Clear All
					</button>
				</div>
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
				</div>
			</div>
		);
	}
}

GMapping.propTypes = {
	getConnections: PropTypes.func,
	clearConnection: PropTypes.func,
	clearMapping: PropTypes.func,
};
