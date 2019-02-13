import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ColumnDisplayer from '../ColumnDisplayer';

const COLUMN_CHOOSER_ROW = 'COLUMN_CHOOSER_ROW';

const columnDisplaySource = {
	beginDrag(props) {
		return props;
	},
};

const columnDisplayTarget = {
	drop(props, monitor) {
		monitor.getItem().onDragAndDrop(props);
	},
};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

const ColumnDisplayerDraggable = ({ connectDropTarget, connectDragSource, ...rest }) => {
	return connectDropTarget(
		connectDragSource(
			<div>
				<ColumnDisplayer {...rest} />
			</div>,
		),
	);
};

/*
The column displayer is draggable but also a drop target.
So we need to wrap with react dnd hoc, one time for the source, the other for the target.
*/
export default new DropTarget(COLUMN_CHOOSER_ROW, columnDisplayTarget, collectTarget)(
	new DragSource(COLUMN_CHOOSER_ROW, columnDisplaySource, collectSource)(ColumnDisplayerDraggable),
);
