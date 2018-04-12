import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import Row from './Row.js';
import { ItemTypes } from '../Constants';

const elementSource = {
	beginDrag(props) {
		return props.dndListener.beginDrag(props.element);
	},
	endDrag(props) {
		props.dndListener.endDrag();
	},
};

const elementTarget = {
	drop(props, monitor) {
		props.dndListener.drop(monitor.getItem(), props.element);
	},
	canDrop(props, monitor) {
		const sourceItem = monitor.getItem();
		return props.dndListener.canDrop(sourceItem, props.element);
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

/**
 * This component adds the draggable behaviour to the Row component.
 */
class DraggableRow extends Component {

	render() {
		const {
			element,
			classNameProvider,
			dataKeys,
			onClick,
			onDoubleClick,
			rowDataGetter,
			rowRenderers,
			onEnterElement,
			onLeaveElement,
			connectDragSource,
			connectDropTarget,
		} = this.props;
		return connectDragSource(
			connectDropTarget(
				<div>
					<Row
						element={element}
						onClick={onClick}
						onDoubleClick={onDoubleClick}
						classNameProvider={classNameProvider}
						dataKeys={dataKeys}
						rowDataGetter={rowDataGetter}
						rowRenderers={rowRenderers}
						onEnterElement={onEnterElement}
						onLeaveElement={onLeaveElement}
					/>
				</div>,
			),
		);
	}
}

DraggableRow.propTypes = {
	element: PropTypes.object,
	classNameProvider: PropTypes.object,
	dataKeys: PropTypes.array,
	rowDataGetter: PropTypes.object,
	rowRenderers: PropTypes.object,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
	dragOver: PropTypes.bool,
};

export default flow(
	DragSource(ItemTypes.ELEMENT, elementSource, collectForDragSource),
	DropTarget(ItemTypes.ELEMENT, elementTarget, collectForDropTarget),
)(DraggableRow);
