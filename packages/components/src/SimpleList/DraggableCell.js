import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import Cell from './Cell.js';

const elementSource = {
	beginDrag(props) {
		return props.extra.beginDrag(props.element);
	},
	endDrag(props) {
		props.extra.endDrag();
	},
};

const elementTarget = {
	canDrop(props, monitor) {
		const sourceItem = monitor.getItem();
		return props.extra.canDrop(sourceItem, props.element);
	},
	drop(props, monitor) {
		props.extra.drop(monitor.getItem(), props.element);
	},
};

function collectForDragSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
	};
}

function collectForDropTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

class DraggableCell extends Component {

  render() {
		const {
      data,
			className,
      connectDragSource,
      connectDropTarget,
		} = this.props;
		return connectDragSource(
			connectDropTarget(
				<span>
					<Cell
            data={data}
            className={className}
					/>
				</span>,
			),
		);
	}

}

DraggableCell.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
};

export default flow(
	DragSource('element', elementSource, collectForDragSource),
	DropTarget('element', elementTarget, collectForDropTarget),
)(DraggableCell);
