import React from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';

/*
 * This constant allows to specify which drag sources and drop targets are compatible.
 */
export const DRAGGABLE_ELEMENT_TYPE = 'element';

/**
 * This function adds the 'drag & drop' behaviour on the given component.
 * Its returns a new component which encaspulates the given one.
 * The new component is draggable and dropppable.
 */
export default function getDraggable(Comp) {
	/*
	 * This defines the drag source specifications.
	 */
	const elementSource = {
		/*
		 * Callback method called when the dragging starts.
		 * It returns a plain JavaScript object describing the data being dragged.
		 */
		beginDrag(props) {
			return props.extra.beginDrag(props.element);
		},
		/*
		 * Callback method called when the dragging stops.
		 */
		endDrag(props) {
			props.extra.endDrag();
		},
	};

	/*
	 * This defines the drop target specifications.
	 */
	const elementTarget = {
		/*
		 * Used to specify whether the drop target is able to accept the item.
		 */
		canDrop(props, monitor) {
			return props.extra.canDrop(monitor.getItem(), props.element);
		},
		/*
		 * Called when a compatible item is dropped on the target.
		 */
		drop(props, monitor) {
			props.extra.drop(monitor.getItem(), props.element);
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
		dragSource(DRAGGABLE_ELEMENT_TYPE, elementSource, collectForDragSource),
		dropTarget(DRAGGABLE_ELEMENT_TYPE, elementTarget, collectForDropTarget),
	)(DraggableComponent);
}
