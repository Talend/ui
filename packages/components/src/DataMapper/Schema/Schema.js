import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchemaHeader from './SchemaHeader';
import * as Constants from '../Constants';

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

export default class Schema extends Component {
	constructor(props) {
		super(props);
		this.updateContentNodeRef = this.updateContentNodeRef.bind(this);
		this.onContentScroll = this.onContentScroll.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		// check first is a drag and drop is in progress
		let needUpdate = true;
		if (nextProps.dnd) {
			needUpdate = !(
				nextProps.dnd.pos != null ||
				(nextProps.dnd.source != null && nextProps.dnd.source.side === nextProps.side)
			);
		}
		// then check if rendering focused elements is needed
		if (
			needUpdate &&
			nextProps.trigger &&
			(nextProps.trigger.code === Constants.Events.ENTER_ELEM ||
				nextProps.trigger.code === Constants.Events.LEAVE_ELEM)
		) {
			if (this.props.dataAccessor.areEqual(this.props.focusedElements, nextProps.focusedElements)) {
				needUpdate = false;
			}
		}
		return needUpdate;
	}

	getNode(element) {
		const index = this.props.dataAccessor.getSchemaElementIndex(this.props.schema, element, true);
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

	onContentScroll() {
		this.props.onScroll(this.props.side);
	}

	getVisibleElements() {
		let visibleElements = [];
		if (this.contentNode) {
			const contentHeight = this.contentNode.offsetHeight;
			const elements = this.props.dataAccessor.getSchemaElements(this.props.schema, true);
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
		const { SchemaRenderer, ...tempProps } = this.props;
		const { dataAccessor, schema, side, filters, filterComponents, onFilterChange } = this.props;
		const contentProps = {
			...tempProps,
			updateContentNodeRef: this.updateContentNodeRef,
			isMapped,
			isSelected,
			isHighlighted,
			onScroll: this.onContentScroll,
		};
		return (
			<div className={`schema mapper-element ${side}`}>
				<SchemaHeader
					dataAccessor={dataAccessor}
					schema={schema}
					side={side}
					filters={filters}
					filterComponents={filterComponents}
					onFilterChange={onFilterChange}
				/>
				<div className="separator horizontal" />
				<SchemaRenderer {...contentProps} />
			</div>
		);
	}
}

Schema.propTypes = {
	dataAccessor: PropTypes.object,
	schema: PropTypes.object,
	SchemaRenderer: PropTypes.func,
	filters: PropTypes.array,
	filterComponents: PropTypes.object,
	onFilterChange: PropTypes.func,
	focusedElements: PropTypes.array,
	onScroll: PropTypes.func,
	side: PropTypes.string,
};
