import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { ItemTypes, MappingSide } from '../../Constants';
import SchemaElement from './SchemaElement.js';

const elementSource = {
	beginDrag(props) {
		return props.dndListener.beginDrag(props.element, props.side);
	},
	endDrag(props) {
		props.dndListener.endDrag();
	},
};

const elementTarget = {
	drop(props, monitor) {
		const sourceItem = monitor.getItem();
		const targetItem = { element: props.element, side: props.side };
		props.dndListener.drop(sourceItem, targetItem);
	},
	canDrop(props, monitor) {
		const sourceItem = monitor.getItem();
		const targetItem = { element: props.element, side: props.side };
		return props.dndListener.canDrop(sourceItem, targetItem);
	},
};

function collectForDragSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectForDropTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		dragOver: monitor.isOver(),
	};
}

class DraggableSchemaElement extends Component {
	render() {
		const {
			dataAccessor,
			element,
			side,
			mapped,
			connectDragSource,
			connectDropTarget,
			onSelect,
			selected,
			highlighted,
			onEnterElement,
			onLeaveElement,
			revealConnectedElement,
		} = this.props;
		const isHighlighted = this.props.dragOver || highlighted;
		return connectDragSource(
			connectDropTarget(
				<div>
					<SchemaElement
						dataAccessor={dataAccessor}
						highlighted={isHighlighted}
						mapped={mapped}
						element={element}
						side={side}
						selected={selected}
						onSelect={onSelect}
						onEnterElement={onEnterElement}
						onLeaveElement={onLeaveElement}
						revealConnectedElement={revealConnectedElement}
					/>
				</div>,
			),
		);
	}
}

DraggableSchemaElement.propTypes = {
	dataAccessor: PropTypes.object,
	element: PropTypes.any.isRequired,
	side: PropTypes.string,
	mapped: PropTypes.bool,
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
	onSelect: PropTypes.func,
	dragOver: PropTypes.bool,
	selected: PropTypes.bool,
	highlighted: PropTypes.bool,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	revealConnectedElement: PropTypes.func,
};

export default flow(
	DragSource(ItemTypes.ELEMENT, elementSource, collectForDragSource),
	DropTarget(ItemTypes.ELEMENT, elementTarget, collectForDropTarget),
)(DraggableSchemaElement);
