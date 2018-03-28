import React from 'react';
import PropTypes from 'prop-types';
import SchemaElement from '../SchemaElement/SchemaElement.js';
import DraggableSchemaElement from '../SchemaElement/DraggableSchemaElement.js';

function renderSchemaElement(props, element) {
	const {
		dataAccessor,
		side,
		draggable,
		mappedElements,
		performMapping,
		selection,
		onSelect,
		pendingItem,
		onEnterElement,
		onLeaveElement,
		focusedElements,
		beginDrag,
		canDrop,
		drop,
		endDrag,
		revealConnection,
		isMapped,
		isSelected,
		isHighlighted,
	} = props;
	const key = dataAccessor.getElementId(element);
	const selected = isSelected(dataAccessor, selection, element, side);
	const highlighted = isHighlighted(
		dataAccessor,
		element,
		selection,
		side,
		pendingItem,
		focusedElements,
	);
	if (draggable) {
		return (
			<DraggableSchemaElement
				dataAccessor={dataAccessor}
				key={key}
				element={element}
				side={side}
				mapped={isMapped(dataAccessor, element, mappedElements)}
				performMapping={performMapping}
				selected={selected}
				highlighted={highlighted}
				onSelect={onSelect}
				onEnterElement={onEnterElement}
				onLeaveElement={onLeaveElement}
				beginDrag={beginDrag}
				canDrop={canDrop}
				drop={drop}
				endDrag={endDrag}
				revealConnection={revealConnection}
			/>
		);
	}
	return (
		<SchemaElement
			dataAccessor={dataAccessor}
			key={key}
			element={element}
			side={side}
			selected={selected}
			highlighted={highlighted}
			onSelect={onSelect}
			onEnterElement={onEnterElement}
			onLeaveElement={onLeaveElement}
			revealConnection={revealConnection}
		/>
	);
}

renderSchemaElement.propTypes = {
	dataAccessor: PropTypes.object,
	side: PropTypes.string,
	mappedElements: PropTypes.array,
	performMapping: PropTypes.func,
	selection: PropTypes.object,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focusedElements: PropTypes.array,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
	revealConnection: PropTypes.func,
	isMapped: PropTypes.func,
	isSelected: PropTypes.func,
	isHighlighted: PropTypes.func,
};

export default class DefaultRenderer {
	renderContent(props) {
		const { dataAccessor, schema, onScroll, updateContentNodeRef } = props;
		const content = dataAccessor
			.getSchemaElements(schema, true)
			.map(elem => renderSchemaElement(props, elem));
		return (
			<div ref={updateContentNodeRef} className="schema-content" onScroll={onScroll}>
				{content}
			</div>
		);
	}
}
