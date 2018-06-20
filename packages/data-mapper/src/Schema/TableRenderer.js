import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Table, DraggableComponent as draggable } from '@talend/react-components';

function getRowsClassNames(rowsClassName, side, elements, dataAccessor, schemaProps) {
	const {
		selection,
		pendingItem,
		dnd,
		focusedElements,
		mappedElements,
		isHighlighted,
		isMapped,
		isSelected,
	} = schemaProps;
	const rowsClassNames = {};
	for (let i = 0; i < elements.length; i += 1) {
		const element = elements[i];
		const elementId = dataAccessor.getElementId(element);
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

// function updateClassNames(classNames, side, elements, dataAccessor, schemaProps) {
// 	return {
// 		root: classNames && classNames.root,
// 		titleBar: classNames && classNames.titleBar,
// 		title: classNames && classNames.title,
// 		filtersBar: classNames && classNames.filtersBar,
// 		table: classnames('schema-content', classNames && classNames.table),
// 		header: classNames && classNames.header,
// 		body: classNames && classNames.body,
// 		row: classnames(classNames && classNames.row, 'draggable-row'),
// 		rows: getRowsClassNames(classNames, side, elements, dataAccessor, schemaProps),
// 	};
// }

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

	// updateClassNameWithIO(className) {
	// 	// specific input/output className added for data-mapper context
	// 	const classes = {
	// 		input: this.schemaProps.side === Constants.MappingSide.INPUT,
	// 		output: this.schemaProps.side === Constants.MappingSide.OUTPUT,
	// 	};
	// 	return classnames(classes, className);
	// }

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

	updateColumns(columns) {
		const columnsWithDnd = copyColumns(columns);
		// update columns classnames
		// for (let i = 0; i < columnsWithDnd.length; i += 1) {
		// 	columnsWithDnd[i].headClassName = this.updateClassNameWithIO(columnsWithDnd[i].headClassName);
		// 	columnsWithDnd[i].cellClassName = this.updateClassNameWithIO(columnsWithDnd[i].cellClassName);
		// }
		// add dnd baheviour on the first column
		this.addDnd(columnsWithDnd[0]);
		// add selection behaviour on the first column
		this.addSelection(columnsWithDnd[0]);
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
			case 'table':
				this.tableNode = node;
				break;
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

	getTableNode() {
		return this.tableNode;
	}

	getHeadNode() {
		return this.headNode;
	}

	getBodyNode() {
		return this.bodyNode;
	}
}

export default class TableRenderer extends Component {
	constructor(props) {
		super(props);
		this.columnUpdater = new ColumnUpdater();
		this.renderingListener = new TableRenderingListener();
		this.onEnterElement = this.onEnterElement.bind(this);
		this.onLeaveElement = this.onLeaveElement.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
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
		const childOffsetTop = child.offsetTop;
		const bodyOffsetTop = this.renderingListener.getBodyNode().offsetTop;
		const tableOffsetTop = this.renderingListener.getTableNode().offsetTop;
		return childOffsetTop;
	}

	getOffsetHeight() {
		return this.renderingListener.getBodyNode().offsetHeight;
	}

	getHeaderHeight() {
		return this.renderingListener.getHeadNode().offsetHeight;
	}

	render() {
		this.columnUpdater.update(this.props);
		const {
			dataAccessor,
			schema,
			onScroll,
			columns,
			rowsClassName,
			withHeader,
			filters,
			sorters,
			title,
			side,
		} = this.props;
		const elements = dataAccessor.getSchemaElements(schema, true);
		//const tableClassNames = updateClassNames(classNames, side, elements, dataAccessor, this.props)
		const columnsWithDnd = this.columnUpdater.updateColumns(columns);
		return (
			<Table
				title={title}
				elements={elements}
				columns={columnsWithDnd}
				rowsClassName={getRowsClassNames(rowsClassName, side, elements, dataAccessor, this.props)}
				withHeader={withHeader}
				filters={filters}
				onFilterChange={this.onFilterChange}
				sorters={sorters}
				onSortChange={this.onSortChange}
				onScroll={onScroll}
				onEnterRow={this.onEnterElement}
				onLeaveRow={this.onLeaveElement}
				renderingListener={this.renderingListener}
			/>
		);
	}
}

TableRenderer.propTypes = {
	dataAccessor: PropTypes.object,
	schema: PropTypes.object,
	title: PropTypes.string,
	columns: PropTypes.array,
	rowsClassName: PropTypes.objectOf(PropTypes.string),
	withHeader: PropTypes.bool,
	filters: PropTypes.array,
	onFilterChange: PropTypes.func,
	sorters: PropTypes.object,
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	side: PropTypes.string,
	onSelect: PropTypes.func,
	revealConnectedElement: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	isElementVisible: PropTypes.func,
};
