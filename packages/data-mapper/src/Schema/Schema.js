import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DraggableComponent as draggable } from '@talend/react-components';
import Table from '../Table';
import Constants from '../Constants';

function isMapped(dataAccessor, element, mappedElements) {
	return mappedElements == null ? false : dataAccessor.includes(mappedElements, element);
}

/**
 * This function indicates if the given (element, side) is selected
 * (i.e. if it appears in the selection)
 */
function isSelected(dataAccessor, selection, element, side) {
	return (
		selection != null &&
		dataAccessor.areElementsEqual(selection.element, element) &&
		selection.side === side
	);
}

function isHighlighted(dataAccessor, element, selection, side, pendingItem, focusedElements, dnd) {
	const connected =
		selection == null
			? false
			: selection.side !== side &&
			  selection.connected != null &&
			  dataAccessor.includes(selection.connected, element);
	const pending =
		pendingItem != null &&
		pendingItem.side === side &&
		dataAccessor.areElementsEqual(pendingItem.element, element);
	const focused = focusedElements != null && dataAccessor.includes(focusedElements, element);
	const isTarget = dnd && dnd.target && dataAccessor.areElementsEqual(dnd.target.element, element);
	return connected || pending || focused || isTarget;
}

function getRowsClassNames(rowsClassName, side, elements, dataAccessor, schemaProps) {
	const { selection, pendingItem, dnd, focusedElements, mappedElements } = schemaProps;
	const rowsClassNames = {};
	for (let i = 0; i < elements.length; i += 1) {
		const element = elements[i];
		const elementId = element.id;
		rowsClassNames[elementId] = classnames(
			{
				highlighted: isHighlighted(
					dataAccessor,
					element,
					selection,
					side,
					pendingItem,
					focusedElements,
					dnd,
				),
				mapped: isMapped(dataAccessor, element, mappedElements),
				selected: isSelected(dataAccessor, selection, element, side),
			},
			rowsClassName && rowsClassName[elementId],
		);
	}
	return rowsClassNames;
}

function copyColumn(column) {
	const newColumn = {};
	for (let k in column) {
		newColumn[k] = column[k];
	}
	return newColumn;
}

function copyColumns(columns) {
	let result = [];
	for (let i = 0; i < columns.length; i += 1) {
		result = result.concat(copyColumn(columns[i]));
	}
	return result;
}

class InternalDndListener {
	constructor() {
		this.beginDrag = this.beginDrag.bind(this);
		this.canDrop = this.canDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.endDrag = this.endDrag.bind(this);
	}

	update(schemaProps) {
		this.schemaProps = schemaProps;
	}

	beginDrag(element) {
		return this.schemaProps.dndListener.beginDrag(element, this.schemaProps.side);
	}

	canDrop(sourceItem, targetElement) {
		const targetItem = { element: targetElement, side: this.schemaProps.side };
		return this.schemaProps.dndListener.canDrop(sourceItem, targetItem);
	}

	drop(sourceItem, targetElement) {
		const targetItem = { element: targetElement, side: this.schemaProps.side };
		this.schemaProps.dndListener.drop(sourceItem, targetItem);
	}

	endDrag() {
		this.schemaProps.dndListener.endDrag();
	}
}

class InternalSelectionHandler {
	constructor() {
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
	}

	update(schemaProps) {
		this.schemaProps = schemaProps;
	}

	onClick(element, ev) {
		this.schemaProps.onSelect(ev.ctrlKey, element, this.schemaProps.side);
	}

	onDoubleClick(element) {
		this.schemaProps.revealConnectedElement(element, this.schemaProps.side);
	}
}

class ColumnUpdater {
	constructor() {
		this.dndListener = new InternalDndListener();
		this.selectionHandler = new InternalSelectionHandler();
		this.draggableCell = null;
	}

	update(schemaProps) {
		this.schemaProps = schemaProps;
		this.dndListener.update(schemaProps);
		this.selectionHandler.update(schemaProps);
	}

	addDnd(column) {
		if (!this.draggableCell) {
			this.draggableCell = draggable(column.cellRenderer || Table.Cell, 'element');
		}
		column.cellRenderer = this.draggableCell;
		// add dnd callback methods
		column.cellExtraProps = {};
		column.cellExtraProps.beginDrag = this.dndListener.beginDrag;
		column.cellExtraProps.canDrop = this.dndListener.canDrop;
		column.cellExtraProps.drop = this.dndListener.drop;
		column.cellExtraProps.endDrag = this.dndListener.endDrag;
	}

	addSelection(column) {
		column.cellExtraProps.onClick = this.selectionHandler.onClick;
		column.cellExtraProps.onDoubleClick = this.selectionHandler.onDoubleClick;
	}

	addPropsForSorter(column) {
		column.headExtraProps = {
			iconPosition: 'right',
			link: true,
		};
	}

	updateColumns(columns, sorters) {
		const columnsWithDnd = copyColumns(columns);
		// add dnd baheviour on the first column
		this.addDnd(columnsWithDnd[0]);
		// add selection behaviour on the first column
		this.addSelection(columnsWithDnd[0]);
		// add extra props for sorter
		columns.forEach(col => {
			if (sorters[col.key]) {
				this.addPropsForSorter(col);
			}
		});
		return columnsWithDnd;
	}
}

class TableRenderingListener {
	onMounted(part, node) {
		this.updateRef(part, node);
	}

	onUpdated(part, node) {
		this.updateRef(part, node);
	}

	updateRef(part, node) {
		switch (part) {
			case 'head':
				this.headNode = node;
				break;
			case 'body':
				this.bodyNode = node;
				break;
			default:
				break;
		}
	}

	getHeadNode() {
		if (this.headNode) {
			return this.headNode;
		}
		return {
			offsetHeight: 0,
		};
	}

	getBodyNode() {
		if (this.bodyNode) {
			return this.bodyNode;
		}
		return {
			childNodes: [],
			scrollTop: 0,
			offsetHeight: 0,
		};
	}
}

export default class Schema extends Component {
	constructor(props) {
		super(props);
		this.columnUpdater = new ColumnUpdater();
		this.renderingListener = new TableRenderingListener();
		this.onEnterElement = this.onEnterElement.bind(this);
		this.onLeaveElement = this.onLeaveElement.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.onContentScroll = this.onContentScroll.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		// check first is a drag and drop is in progress
		let needUpdate = true;
		if (nextProps.dnd) {
			needUpdate = !(nextProps.dnd.source != null && nextProps.dnd.source.side === nextProps.side);
		}
		// then check if rendering focused elements is needed
		if (
			needUpdate &&
			nextProps.trigger &&
			(nextProps.trigger.code === Constants.Events.ENTER_ELEM ||
				nextProps.trigger.code === Constants.Events.LEAVE_ELEM)
		) {
			if (
				this.props.dataAccessor.haveSameContent(
					this.props.focusedElements,
					nextProps.focusedElements,
				)
			) {
				needUpdate = false;
			}
		}
		return needUpdate;
	}


	getYPosition(element) {
		const scrollTop = this.getScrollTop();
		const child = this.getNode(element);
		if (child) {
			const childOffsetTop = this.getChildOffsetTop(child);
			return childOffsetTop + child.clientHeight / 2 - scrollTop;
		}
		return 0;
	}

	getElementAtPosition(position) {
		let theElement = null;
		let previousDist = -1;
		let currentDist = -1;
		const contentHeight = this.getOffsetHeight();
		const elements = this.props.dataAccessor.getSchemaElements(this.props.schema, true);
		const children = this.getChildNodes();
		const childrenArray = Array.from(children);
		for (let i = 0; i < childrenArray.length; i += 1) {
			previousDist = currentDist;
			const element = elements[i];
			const elemYPos = this.getYPosition(element);
			if (elemYPos > 0 && elemYPos < contentHeight) {
				currentDist = Math.abs(elemYPos - position);
				if (previousDist >= 0 && currentDist > previousDist) {
					break;
				}
				theElement = element;
			} else if (elemYPos > contentHeight) {
				break;
			}
		}
		return theElement;
	}

	onContentScroll() {
		this.props.onScroll(this.props.side);
	}

	getVisibleElements() {
		let visibleElements = [];
		const contentHeight = this.getOffsetHeight();
		const elements = this.props.dataAccessor.getSchemaElements(this.props.schema, true);
		const children = this.getChildNodes();
		const childrenArray = Array.from(children);
		if (elements.length != childrenArray.length) {
			visibleElements = visibleElements.concat(elements);
			return visibleElements;
		}
		const meanDist = this.computeMeanDist(elements);
		let startIndex = 0;
		if (meanDist > 0) {
			// compute start index
			const scrollTop = this.getScrollTop();
			const n = Math.floor(scrollTop / meanDist);
			startIndex = Math.max(0, n);
		}
		const headerHeight = this.getHeaderHeight();
		const bottomLimit = contentHeight + headerHeight;
		for (let i = startIndex; i < childrenArray.length; i += 1) {
			const element = elements[i];
			const elemYPos = this.getYPosition(element);
			if (elemYPos > headerHeight && elemYPos < bottomLimit) {
				// element is visible
				visibleElements = visibleElements.concat(element);
			} else if (elemYPos > bottomLimit) {
				break;
			}
		}

		return visibleElements;
	}

	computeMeanDist(elements) {
		if (elements.length > 1) {
			const y1 = this.getYPosition(elements[0]);
			const y2 = this.getYPosition(elements[1]);
			return Math.abs(y2 - y1);
		}
		return 0;
	}

	reveal(element) {
		if (!element) {
			return false;
		}
		const node = this.getNode(element);
		const nodeHeight = node.clientHeight;
		const elemYPos = this.getYPosition(element);
		const contentHeight = this.getOffsetHeight();
		const headerHeight = this.getHeaderHeight();
		let revealed = false;
		const scrollTop = this.getScrollTop();
		if (elemYPos < headerHeight) {
			const newScrollTop = scrollTop + elemYPos - headerHeight - nodeHeight / 2;
			this.setScrollTop(newScrollTop);
			revealed = true;
		} else if (elemYPos > contentHeight + headerHeight - nodeHeight) {
			const offset = elemYPos + nodeHeight - contentHeight - headerHeight;
			this.setScrollTop(scrollTop + offset);
			revealed = true;
		}
		return revealed;
	}

	onEnterElement(element) {
		this.props.onEnterElement(element, this.props.side);
	}

	onLeaveElement(element) {
		this.props.onLeaveElement(element, this.props.side);
	}

	onFilterChange(id, active, params) {
		this.props.onFilterChange(id, active, params, this.props.side);
	}

	onSortChange(columnKey) {
		this.props.onSortChange(columnKey, this.props.side);
	}

	getNode(element) {
		const index = this.props.dataAccessor.getSchemaElementIndex(this.props.schema, element, true);
		const children = this.getChildNodes();
		const childrenArray = Array.from(children);
		return childrenArray[index];
	}

	getChildNodes() {
		return this.renderingListener.getBodyNode().childNodes;
	}

	getScrollTop() {
		return this.renderingListener.getBodyNode().scrollTop;
	}

	setScrollTop(scrollTop) {
		this.renderingListener.getBodyNode().scrollTop = scrollTop;
	}

	getChildOffsetTop(child) {
		return child.offsetTop;
	}

	getOffsetHeight() {
		return this.renderingListener.getBodyNode().offsetHeight;
	}

	getHeaderHeight() {
		return this.renderingListener.getHeadNode().offsetHeight;
	}

	render() {
		const {
			dataAccessor,
			schema,
			side,
			columns,
			rowsClassName,
			withTitle,
			withHeader,
			filters,
			sorters,
			onScroll,
		} = this.props;
		this.columnUpdater.update(this.props);
		const elements = dataAccessor.getSchemaElements(schema, true);
		const columnsWithDnd = this.columnUpdater.updateColumns(columns, sorters);
		return (
			<div className={`schema mapper-element ${side}`}>
				<Table
					title={withTitle && schema.name}
					elements={elements}
					columns={columnsWithDnd}
					rowsClassName={getRowsClassNames(rowsClassName, side, elements, dataAccessor, this.props)}
					withHeader={withHeader}
					filters={filters}
					onFilterChange={this.onFilterChange}
					sorters={sorters}
					onSortChange={this.onSortChange}
					onScroll={this.onContentScroll}
					onEnterRow={this.onEnterElement}
					onLeaveRow={this.onLeaveElement}
					renderingListener={this.renderingListener}
				/>
			</div>
		);
	}
}

Schema.propTypes = {
	dataAccessor: PropTypes.object.isRequired,
	schema: PropTypes.object.isRequired,
	columns: PropTypes.array.isRequired,
	rowsClassName: PropTypes.objectOf(PropTypes.string),
	withTitle: PropTypes.bool,
	withHeader: PropTypes.bool,
	filters: PropTypes.array,
	onFilterChange: PropTypes.func,
	sorters: PropTypes.object,
	onSortChange: PropTypes.func,
	mappedElements: PropTypes.array,
	focusedElements: PropTypes.array,
	onScroll: PropTypes.func,
	side: PropTypes.string,
};
