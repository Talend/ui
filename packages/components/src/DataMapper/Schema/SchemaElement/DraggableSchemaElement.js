import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { ItemTypes, MappingSide } from '../../Constants';
import SchemaElement from './SchemaElement.js';

const elementSource = {
	beginDrag(props) {
		props.beginDrag(props.element, props.side);
		return {
			element: props.element,
			side: props.side,
		};
	},
	endDrag(props) {
		props.endDrag();
	},
};

const elementTarget = {
	drop(props, monitor) {
		props.drop(props.element, props.side);
		const sourceItem = monitor.getItem();
		if (sourceItem.side === MappingSide.INPUT) {
			props.performMapping(sourceItem.element, props.element, MappingSide.OUTPUT);
		} else {
			props.performMapping(props.element, sourceItem.element, MappingSide.INPUT);
		}
	},
	canDrop(props, monitor) {
		const targetItem = { element: props.element, side: props.side };
		const sourceItem = monitor.getItem();
		return props.canDrop(sourceItem, targetItem);
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
			revealConnection,
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
						revealConnection={revealConnection}
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
	revealConnection: PropTypes.func,
};

export default flow(
	DragSource(ItemTypes.ELEMENT, elementSource, collectForDragSource),
	DropTarget(ItemTypes.ELEMENT, elementTarget, collectForDropTarget),
)(DraggableSchemaElement);
