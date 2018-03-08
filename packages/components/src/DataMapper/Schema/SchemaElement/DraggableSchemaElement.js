import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { ItemTypes, SchemaType } from '../../Constants';
import SchemaElement from './SchemaElement.js';

const elementSource = {
	beginDrag(props) {
		props.beginDrag(props.name, props.schemaType);
		return {
			elementId: props.name,
			schemaType: props.schemaType,
		};
	},
	endDrag(props) {
		props.endDrag();
	},
};

const elementTarget = {
	drop(props, monitor) {
		props.drop(props.name, props.schemaType);
		const sourceElem = monitor.getItem();
		if (sourceElem.schemaType === SchemaType.INPUT) {
			props.performMapping(sourceElem.elementId, props.name, SchemaType.OUTPUT);
		} else {
			props.performMapping(props.name, sourceElem.elementId, SchemaType.INPUT);
		}
	},
	canDrop(props, monitor) {
		props.canDrop(props.name, props.schemaType);
		const sourceElem = monitor.getItem();
		return props.schemaType !== sourceElem.schemaType;
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
			name,
			schemaType,
			mapped,
			connectDragSource,
			connectDropTarget,
			onSelect,
			selected,
			highlighted,
			onEnterElement,
			onLeaveElement,
		} = this.props;
		const isHighlighted = this.props.dragOver || highlighted;
		return connectDragSource(
			connectDropTarget(
				<div>
					<SchemaElement
						highlighted={isHighlighted}
						mapped={mapped}
						name={name}
						schemaType={schemaType}
						selected={selected}
						onSelect={onSelect}
						onEnterElement={onEnterElement}
						onLeaveElement={onLeaveElement}
					/>
				</div>,
			),
		);
	}
}

DraggableSchemaElement.propTypes = {
	name: PropTypes.string,
	schemaType: PropTypes.string,
	mapped: PropTypes.bool,
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
	onSelect: PropTypes.func,
	dragOver: PropTypes.bool,
	selected: PropTypes.bool,
	highlighted: PropTypes.bool,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
};

export default flow(
	DragSource(ItemTypes.ELEMENT, elementSource, collectForDragSource),
	DropTarget(ItemTypes.ELEMENT, elementTarget, collectForDropTarget),
)(DraggableSchemaElement);
