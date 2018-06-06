import React from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';

/**
 * This function adds the 'drag & drop' behaviour on the given component.
 * Its returns a new component which encaspulates the given one.
 * The new component is draggable and dropppable: it is both a drag source and a drop target.
 * The props of the component must have at least:
 * - element (object): the dragged element;
 * - beginDrag (function): called when the dragging starts;
 * - canDrop (function): specify whether the drop target is able to accept the dragged item;
 * - drop (function): called when the dragged item is dropped on the target;
 * - endDrag (function): called when the dragging stops;
 *
 * @param {Component} Comp - The component on which the dragd and drop behavior must be defined.
 * @param {string} type - Define the type of element which can be dragged and dropped.
 */
export default function getDraggable(Comp, type) {
	// This defines the drag source specifications.
	const sourceSpecifications = {
		/*
		 * Callback method called when the dragging starts.
		 * It returns a plain JavaScript object describing the data being dragged.
		 */
		beginDrag(props) {
			return props.beginDrag(props.element);
		},
		// Callback method called when the dragging stops.
		endDrag(props) {
			props.endDrag();
		},
	};

	// This defines the drop target specifications.
	const targetSpecifications = {
		// Used to specify whether the drop target is able to accept the item.
		canDrop(props, monitor) {
			return props.canDrop(monitor.getItem(), props.element);
		},
		// Called when a compatible item is dropped on the target.
		drop(props, monitor) {
			props.drop(monitor.getItem(), props.element);
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

	function DraggableComponent(props) {
		const { connectDragSource, connectDropTarget, ...rest } = props;
		return connectDragSource(
			connectDropTarget(
				<div className="draggable-component">
					<Comp {...rest} />
				</div>,
			),
		);
	}

	DraggableComponent.propTypes = {
		connectDragSource: PropTypes.func,
		connectDropTarget: PropTypes.func,
	};

	return flow(
		dragSource(type, sourceSpecifications, collectForDragSource),
		dropTarget(type, targetSpecifications, collectForDropTarget),
	)(DraggableComponent);
}
