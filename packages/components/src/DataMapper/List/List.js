import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Row from './Row.js';
import DraggableRow from './DraggableRow.js';

/**
 * This function is responsible for rendering an element in the list.
 * A row can be draggable or not (depending on the draggable property).
 */
function renderRow(
	element,
	classNameProvider,
	dataKeys,
	rowDataGetter,
	rowRenderers,
	draggable,
	dndListener,
	onClick,
	onDoubleClick,
	onEnterElement,
	onLeaveElement,
) {
	if (draggable) {
		return (
			<DraggableRow
				key={rowDataGetter.getId(element)}
				element={element}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
				classNameProvider={classNameProvider}
				dataKeys={dataKeys}
				rowDataGetter={rowDataGetter}
				rowRenderers={rowRenderers}
				onEnterElement={onEnterElement}
				onLeaveElement={onLeaveElement}
				dndListener={dndListener}
			/>
		);
	}
	return (
		<Row
			key={rowDataGetter.getId(element)}
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
	);
}

/**
 * This component displays a list of elements.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The rowDataGetter object provides the data for each element.
 * The dataKeys array provides the column keys. These keys are used to get the element data.
 * The rowRenderers object provides the components used to display the element data.
 */
export default class List extends Component {
	render() {
		const {
			classNameProvider,
			elements,
			dataKeys,
			rowDataGetter,
			rowRenderers,
			onScroll,
			draggable,
			dndListener,
			onClick,
			onDoubleClick,
			updateListNodeRef,
			onEnterElement,
			onLeaveElement,
		} = this.props;
		return (
			<div
				className={`comp-list ${classnames(classNameProvider.get())}`}
				ref={updateListNodeRef}
				onScroll={onScroll}
			>
				{elements.map(elem =>
					renderRow(
						elem,
						classNameProvider,
						dataKeys,
						rowDataGetter,
						rowRenderers,
						draggable,
						dndListener,
						onClick,
						onDoubleClick,
						onEnterElement,
						onLeaveElement,
					),
				)}
			</div>
		);
	}
}

List.propTypes = {
	elements: PropTypes.array,
	classNameProvider: PropTypes.object,
	dataKeys: PropTypes.array,
	rowDataGetter: PropTypes.object,
	rowRenderers: PropTypes.object,
	onScroll: PropTypes.func,
	draggable: PropTypes.bool,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	dndListener: PropTypes.object,
	updateListNodeRef: PropTypes.func,
};
