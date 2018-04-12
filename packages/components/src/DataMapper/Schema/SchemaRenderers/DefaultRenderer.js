import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchemaElement from '../SchemaElement/SchemaElement.js';
import DraggableSchemaElement from '../SchemaElement/DraggableSchemaElement.js';

function renderSchemaElement(props, element) {
	const {
		dataAccessor,
		side,
		draggable,
		mappedElements,
		selection,
		onSelect,
		pendingItem,
		onEnterElement,
		onLeaveElement,
		focusedElements,
		dndListener,
		revealConnectedElement,
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
				selected={selected}
				highlighted={highlighted}
				onSelect={onSelect}
				onEnterElement={onEnterElement}
				onLeaveElement={onLeaveElement}
				dndListener={dndListener}
				revealConnectedElement={revealConnectedElement}
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
			revealConnectedElement={revealConnectedElement}
		/>
	);
}

renderSchemaElement.propTypes = {
	dataAccessor: PropTypes.object,
	side: PropTypes.string,
	mappedElements: PropTypes.array,
	selection: PropTypes.object,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focusedElements: PropTypes.array,
	dndListener: PropTypes.object,
	revealConnectedElement: PropTypes.func,
	isMapped: PropTypes.func,
	isSelected: PropTypes.func,
	isHighlighted: PropTypes.func,
};

export default class DefaultRenderer extends Component {
	render() {
		const { dataAccessor, schema, onScroll, updateContentNodeRef } = this.props;
		const content = dataAccessor
			.getSchemaElements(schema, true)
			.map(elem => renderSchemaElement(this.props, elem));
		return (
			<div ref={updateContentNodeRef} className="schema-content" onScroll={onScroll}>
				{content}
			</div>
		);
	}
}

DefaultRenderer.propTypes = {
	dataAccessor: PropTypes.object,
	schema: PropTypes.object,
	onScroll: PropTypes.func,
	updateContentNodeRef: PropTypes.func,
};
