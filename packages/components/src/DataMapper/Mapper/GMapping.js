import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MappingArea from './MappingArea.js';
import { SchemaType, ConnectionParams } from '../Constants';

function getShowAllButtonLabel(showAll) {
	return showAll ? 'Hide' : 'Show All';
}

export default class GMapping extends Component {

	constructor(props) {
		super(props);
		this.dndInProgress = this.dndInProgress.bind(this);
	}

	update() {
		const area = this.mappingArea.getDecoratedComponentInstance();
		area.updateCanvas(true, false, false);
	}

	dndInProgress(offset) {
		const area = this.mappingArea.getDecoratedComponentInstance();
		const pos = area.getMousePos(offset);
		const sourceYPos =
			this.props.getYPosition(
				this.props.dnd.source.element,
				this.props.dnd.source.type);
    const params = ConnectionParams.PENDING;
		// default case: source is input
		let x1 = params.anchorRadius;
		let y1 = sourceYPos;
		let x2 = pos.x;
		let y2 = pos.y;
		if (this.props.dnd.source.type === SchemaType.OUTPUT) {
    	x1 = pos.x;
			y1 = pos.y;
			x2 = area.getCanvasSize().width - params.arrowWidth / 2;
			y2 = sourceYPos;
		}
		area.updateCanvas(true, false, false);
		area.drawSingleConnection(x1, y1, x2, y2, params);
	}

	render() {
		const {
			clearConnection,
			clearMapping,
			getConnections,
			getYPosition,
			dnd,
			onShowAll,
			showAll,
		} = this.props;
		return (
			<div id="mapping" className="mapper-element">
				<div id="mapping-tools">
					<button id="show-all" onClick={onShowAll}>
						{getShowAllButtonLabel(showAll)}
					</button>
					<button id="clear-connection" onClick={clearConnection}>
						Clear
					</button>
					<button id="clear-mapping" onClick={clearMapping}>
						Clear All
					</button>
				</div>
				<MappingArea
					ref={area => {
						this.mappingArea = area;
					}}
					getConnections={getConnections}
					getYPosition={getYPosition}
					dnd={dnd}
					dndInProgress={this.dndInProgress}
				/>
			</div>
		);
	}
}

GMapping.propTypes = {
	getConnections: PropTypes.func,
	getYPosition: PropTypes.func,
	clearConnection: PropTypes.func,
	clearMapping: PropTypes.func,
	showAll: PropTypes.bool,
	onShowAll: PropTypes.func,
	dnd: PropTypes.object,
};
