import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drawLine, drawBezier, drawPoint, drawArrow } from '../Drawing.js';
import { ConnectionParams } from '../Constants';

function getShowAllButtonLabel(showAll) {
	return showAll ? 'Hide' : 'Show All';
}

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
			const x2 = this.canvas.width - params.anchorRadius;
			const y2 = connection.targetYPos;
			drawPoint(x1, y1, params.anchorRadius, params.color, this.canvas);
			drawBezier(x1, y1, x2, y2, params.lineWidth, params.color, params.lineDash, this.canvas);
			drawArrow(x2, y2, params.arrowWidth, params.arrowHeight, params.color, this.canvas);
		}
	}

	render() {
		return (
			<div id="mapping" className="mapper-element">
				<div id="mapping-tools">
					<button
						id="show-all"
						onClick={this.props.onShowAll}
					>
						{getShowAllButtonLabel(this.props.showAll)}
					</button>
					<button
						id="clear-connection"
						onClick={this.props.clearConnection}
					>
						Clear
					</button>
					<button
						id="clear-mapping"
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
	showAll: PropTypes.bool,
	onShowAll: PropTypes.func,
};
