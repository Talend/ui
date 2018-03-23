import React, { Component } from 'react';
import PropTypes from 'prop-types';

function isMapped(dataAccessor, element, mappedElements) {
	return mappedElements == null ?
		false : dataAccessor.includes(mappedElements, element);
}

/**
 * isSelected indicates if the given (element, side) is selected
 * (i.e. if it appears in the selection)
 */
export function isSelected(dataAccessor, selection, element, side) {
	return selection != null
		&& dataAccessor.areEquals(selection.element, element)
		&& selection.side === side;
}

function isHighlighted(dataAccessor, element, selection, side, pendingItem, focusedElements) {
	const connected =
		selection == null
			? false
			: selection.side !== side &&
			  selection.connected != null &&
			  dataAccessor.includes(selection.connected, element);
	const pending =
		pendingItem != null
		&& pendingItem.side === side
		&& dataAccessor.areEquals(pendingItem.element, element);
	const focused = focusedElements != null
		&& dataAccessor.includes(focusedElements, element);
	return connected || pending || focused;
}

export default class Schema2 extends Component {

  constructor(props) {
		super(props);
		this.updateContentNodeRef = this.updateContentNodeRef.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return !(nextProps.dnd != null && (
			nextProps.dnd.pos != null || (
				nextProps.dnd.source != null && nextProps.dnd.source.side === nextProps.side
			)
		));
	}

	getNode(element) {
		const index = this.props.dataAccessor.getSchemaElementIndex(this.props.schema, element);
		const children = this.contentNode.childNodes;
		const childrenArray = Array.from(children);
		return childrenArray[index];
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
      schemaRenderer,
      ...tempProps,
    } = this.props;
		const {
			dataAccessor,
			schema,
			side,
		} = this.props;
    const contentProps = {
      ...tempProps,
      updateContentNodeRef: this.updateContentNodeRef,
      isMapped,
      isSelected,
      isHighlighted,
    };
		return (
			<div className={`schema mapper-element ${side}`}>
				<div className="schema-name">{dataAccessor.getSchemaName(schema)}</div>
				{schemaRenderer.renderContent(contentProps)}
			</div>
		);
	}
}

Schema2.propTypes = {
	dataAccessor: PropTypes.object,
	schema: PropTypes.object,
	schemaRenderer: PropTypes.object,
};
