import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchemaElement from './SchemaElement/SchemaElement.js';
import DraggableSchemaElement from './SchemaElement/DraggableSchemaElement.js';

function isMapped(element, mapped) {
	return mapped == null ? false : mapped.includes(element);
}

/**
 * isSelected indicates if the given (element, type) is selected
 * (i.e. if it appears in the selection)
 */
export function isSelected(selection, element, type) {
	return selection != null && selection.element === element && selection.type === type;
}

function isHighlighted(element, selection, type, pendingItem, focusedElements) {
	const connected =
		selection == null
			? false
			: selection.type !== type &&
			  selection.connected != null &&
			  selection.connected.includes(element);
	const pending =
		pendingItem != null && pendingItem.type === type && pendingItem.element === element;
	const focused = focusedElements != null && focusedElements.includes(element);
	return connected || pending || focused;
}

function renderSchemaElement(
	type,
	elem,
	draggable,
	mapped,
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
) {
	if (draggable) {
		return (
			<DraggableSchemaElement
				key={elem}
				name={elem}
				schemaType={type}
				mapped={isMapped(elem, mapped)}
				performMapping={performMapping}
				selected={isSelected(selection, elem, type)}
				highlighted={isHighlighted(elem, selection, type, pendingItem, focusedElements)}
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
			key={elem}
			name={elem}
			schemaType={type}
			selected={isSelected(selection, elem, type)}
			highlighted={isHighlighted(elem, selection, type, pendingItem, focusedElements)}
			onSelect={onSelect}
			onEnterElement={onEnterElement}
			onLeaveElement={onLeaveElement}
			revealConnection={revealConnection}
		/>
	);
}

export default class Schema extends Component {
	getNode(element) {
		const children = this.contentNode.childNodes;
		const childrenArray = Array.from(children);
		return childrenArray.find(c => c.firstChild.innerHTML === element);
	}

	getYPosition(element) {
		const scrollTop = this.contentNode.scrollTop;
		const child = this.getNode(element);
		const childOffsetTop = child.offsetTop;
		const parentOffsetTop = this.contentNode.offsetTop;
		const y = childOffsetTop - parentOffsetTop + child.clientHeight / 2 - scrollTop;
		return y;
	}

	getVisibleElements() {
		let visibleElements = [];
		const contentHeight = this.contentNode.offsetHeight;
		const elements = this.props.schema.elements;
		const children = this.contentNode.childNodes;
		const childrenArray = Array.from(children);
		for (let i = 0; i < childrenArray.length; i += 1) {
			const element = elements[i];
			const elemYPos = this.getYPosition(element);
			if (elemYPos > 0 && elemYPos < contentHeight) {
				// element is visible
				visibleElements = visibleElements.concat(element);
			} else if (elemYPos > contentHeight) {
				break;
			}
		}
		return visibleElements;
	}

	reveal(element) {
		const node = this.getNode(element);
		const nodeHeight = node.clientHeight;
		const elemYPos = this.getYPosition(element);
		const contentHeight = this.contentNode.offsetHeight;
		if (elemYPos < 0) {
			this.contentNode.scrollTop = this.contentNode.scrollTop + elemYPos - nodeHeight / 2;
		} else if (elemYPos > contentHeight - nodeHeight) {
			const offset = elemYPos + nodeHeight - contentHeight;
			this.contentNode.scrollTop = this.contentNode.scrollTop + offset;
		}
	}

	render() {
		const {
			type,
			schema,
			draggable,
			mapped,
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
		} = this.props;
		return (
			<div className="schema mapper-element">
				<div className="schema-name">{schema.name}</div>
				<div
					ref={content => {
						this.contentNode = content;
					}}
					className="schema-content"
					onScroll={this.props.onScroll}
				>
					{schema.elements.map(elem =>
						renderSchemaElement(
							type,
							elem,
							draggable,
							mapped,
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
						),
					)}
				</div>
			</div>
		);
	}
}

Schema.propTypes = {
	type: PropTypes.string,
	schema: PropTypes.object,
	mapped: PropTypes.array,
	performMapping: PropTypes.func,
	selection: PropTypes.object,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	onScroll: PropTypes.func,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focusedElements: PropTypes.array,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
	revealConnection: PropTypes.func,
};
