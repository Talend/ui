import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GMapping extends Component {

	componentDidMount() {
		this.initCanvasSize();
	}

	componentDidUpdate() {
		this.updateCanvas();
	}

	initCanvasSize() {
		this.canvas.width = this.canvasParent.clientWidth;
		this.canvas.height = this.canvasParent.clientHeight;
	}

	updateCanvas() {
		this.clearCanvas();
		const connection = this.props.getConnection();
		if (connection != null && connection.sourceYPos != null && connection.targetYPos != null) {
			this.drawConnection(connection);
		}
	}

	clearCanvas() {
		const context = this.canvas.getContext('2d');
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawConnection(connection) {
		const radius = 5;
		const x1 = radius;
		const y1 = connection.sourceYPos;
		const x2 = this.canvas.width - radius;
		const y2 = connection.targetYPos;
		this.drawPoint(x1, y1, radius);
		this.drawLine(x1, y1, x2, y2, 3);
		this.drawPoint(x2, y2, radius);
	}

	drawLine(x1, y1, x2, y2, width) {
		const context = this.canvas.getContext('2d');
		context.beginPath();
		context.lineWidth = width;
		context.lineJoin = 'round';
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
		context.closePath();
	}

	drawPoint(x, y, radius) {
		const context = this.canvas.getContext('2d');
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI * 2);
		context.fill();
		context.closePath();
	}

	render() {
		return (
			<div id="mapping" className="mapper-element">
				<div className="mapping-tools">
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
				<div ref={c => { this.canvasParent = c; }} className="mapping-content">
					<canvas ref={c => { this.canvas = c; }} id="mapping-canvas" />
				</div>
			</div>
		);
	}
}

GMapping.propTypes = {
	getConnection: PropTypes.func,
	clearConnection: PropTypes.func,
	clearMapping: PropTypes.func,
};
