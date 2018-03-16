import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchemaElement from './SchemaElement/SchemaElement.js';
import DraggableSchemaElement from './SchemaElement/DraggableSchemaElement.js';

function isMapped(dataAccessor, element, mappedElements) {
	return mappedElements == null ? false : dataAccessor.includes(mappedElements, element);
}

/**
 * isSelected indicates if the given (element, side) is selected
 * (i.e. if it appears in the selection)
 */
export function isSelected(dataAccessor, selection, element, side) {
	return (
		selection != null &&
		dataAccessor.areEquals(selection.element, element) &&
		selection.side === side
	);
}

function isHighlighted(dataAccessor, element, selection, side, pendingItem, focusedElements) {
	const connected =
		selection == null
			? false
			: selection.side !== side &&
			  selection.connected != null &&
			  dataAccessor.includes(selection.connected, element);
	const pending =
		pendingItem != null &&
		pendingItem.side === side &&
		dataAccessor.areEquals(pendingItem.element, element);
	const focused = focusedElements != null && dataAccessor.includes(focusedElements, element);
	return connected || pending || focused;
}

function renderSchemaElement(
	dataAccessor,
	side,
	element,
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
) {
	if (draggable) {
		return (
			<DraggableSchemaElement
				dataAccessor={dataAccessor}
				key={dataAccessor.getElementId(element)}
				element={element}
				side={side}
				mapped={isMapped(dataAccessor, element, mappedElements)}
				performMapping={performMapping}
				selected={isSelected(dataAccessor, selection, element, side)}
				highlighted={isHighlighted(
					dataAccessor,
					element,
					selection,
					side,
					pendingItem,
					focusedElements,
				)}
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
			key={dataAccessor.getElementId(element)}
			element={element}
			side={side}
			selected={isSelected(dataAccessor, selection, element, side)}
			highlighted={isHighlighted(
				dataAccessor,
				element,
				selection,
				side,
				pendingItem,
				focusedElements,
			)}
			onSelect={onSelect}
			onEnterElement={onEnterElement}
			onLeaveElement={onLeaveElement}
			revealConnection={revealConnection}
		/>
	);
}

export default class Schema extends Component {
	constructor(props) {
		super(props);
		this.updateContentNodeRef = this.updateContentNodeRef.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return !(
			nextProps.dnd != null &&
			(nextProps.dnd.pos != null ||
				(nextProps.dnd.source != null && nextProps.dnd.source.side === nextProps.side))
		);
	}

	getNode(element) {
		const children = this.contentNode.childNodes;
		const childrenArray = Array.from(children);
		return childrenArray.find(
			c => c.firstChild.innerHTML === this.props.dataAccessor.getElementName(element),
		);
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
		if (this.contentNode) {
			const contentHeight = this.contentNode.offsetHeight;
			const elements = this.props.dataAccessor.getSchemaElements(this.props.schema);
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

	updateContentNodeRef(ref) {
		this.contentNode = ref;
	}

	render() {
		const {
			dataAccessor,
			side,
			schema,
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
		} = this.props;
		return (
			<div className="schema mapper-element">
				<div className="schema-name">{dataAccessor.getSchemaName(schema)}</div>
				<div
					ref={this.updateContentNodeRef}
					className="schema-content"
					onScroll={this.props.onScroll}
				>
					{dataAccessor
						.getSchemaElements(schema)
						.map(elem =>
							renderSchemaElement(
								dataAccessor,
								side,
								elem,
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
							),
						)}
				</div>
			</div>
		);
	}
}

Schema.propTypes = {
	dataAccessor: PropTypes.object,
	side: PropTypes.string,
	schema: PropTypes.object,
	mappedElements: PropTypes.array,
	performMapping: PropTypes.func,
	selection: PropTypes.object,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	onScroll: PropTypes.func,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focusedElements: PropTypes.array,
	dnd: PropTypes.object,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
	revealConnection: PropTypes.func,
};
