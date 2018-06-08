import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	Table,
	TableClickableCell,
	TableCell,
	TableConfiguration,
	DraggableComponent,
} from '../../../Table';
import MandatoryField from '../../List/MandatoryField';

import * as Constants from '../../Constants';

class SchemaClassNameProvider {
	updateProps(props) {
		this.props = props;
	}

	getForTable() {
		return `comp-simple-table schema-content ${this.props.side}`;
	}

	getForHeader(columnKey) {
		const classes = {
			'comp-simple-table-header': true,
			input: this.props.side === Constants.MappingSide.INPUT,
			output: this.props.side === Constants.MappingSide.OUTPUT,
		};
		classes[columnKey] = true;
		return classnames(classes);
	}

	getForRow(element) {
		const {
			dataAccessor,
			selection,
			side,
			pendingItem,
			dnd,
			draggable,
			focusedElements,
			mappedElements,
			isHighlighted,
			isMapped,
			isSelected,
		} = this.props;
		return classnames({
			'comp-simple-table-row': true,
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
			input: side === Constants.MappingSide.INPUT,
			output: side === Constants.MappingSide.OUTPUT,
			draggable,
		});
	}

	getForRowData(columnKey) {
		return `comp-simple-table-row-data-${columnKey} ${this.props.side}`;
	}
}

class SchemaDndListener {
	updateProps(props) {
		this.props = props;
	}

	beginDrag(element) {
		return this.props.dndListener.beginDrag(element, this.props.side);
	}

	canDrop(sourceItem, targetElement) {
		const targetItem = { element: targetElement, side: this.props.side };
		return this.props.dndListener.canDrop(sourceItem, targetItem);
	}

	drop(sourceItem, targetElement) {
		const targetItem = { element: targetElement, side: this.props.side };
		this.props.dndListener.drop(sourceItem, targetItem);
	}

	endDrag() {
		this.props.dndListener.endDrag();
	}
}

class RowDataGetter {
	updateProps(props) {
		this.props = props;
	}

	getId(element) {
		return this.props.dataAccessor.getElementId(element);
	}

	getHeaderData(columnKey) {
		switch (columnKey) {
			case Constants.Schema.DATA_KEYS.NAME:
				return 'Name';
			case Constants.Schema.DATA_KEYS.TYPE:
				return 'Type';
			case Constants.Schema.DATA_KEYS.DESC:
				return 'Description';
			default:
				return columnKey;
		}
	}

	getRowData(element, columnKey) {
		switch (columnKey) {
			case Constants.Schema.DATA_KEYS.NAME:
				if (this.props.side === Constants.MappingSide.INPUT) {
					return this.props.dataAccessor.getElementName(element);
				}
				return {
					value: this.props.dataAccessor.getElementName(element),
					mandatory: this.props.dataAccessor.isElementMandatory(element),
				};
			case Constants.Schema.DATA_KEYS.TYPE:
				return this.props.dataAccessor.getElementType(element);
			case Constants.Schema.DATA_KEYS.DESC:
				return this.props.dataAccessor.getElementDescription(element);
			default:
				return 'No data available!';
		}
	}
}

class RowRenderer {
	constructor() {
		this.dndListener = new SchemaDndListener();
		this.draggableCell = DraggableComponent(TableCell);
		this.draggableMandatoryField = DraggableComponent(MandatoryField);
	}

	updateProps(props) {
		this.props = props;
		this.dndListener.updateProps(props);
	}

	isModelEvent(code) {
		return (
			code === Constants.Events.UNDO ||
			code === Constants.Events.REDO ||
			code === Constants.Events.ADD_MAPPING ||
			code === Constants.Events.REMOVE_MAPPING ||
			code === Constants.Events.CLEAR_MAPPING
		);
	}

	isFilterOrSortEvent(code) {
		return (
			code === Constants.Events.FILTERING ||
			code === Constants.Events.SORT ||
			code === Constants.Events.CLEAR_SORT
		);
	}

	needRowUpdate(props) {
		if (this.props.trigger) {
			const code = this.props.trigger.code;
			if (this.isModelEvent(code) || this.isFilterOrSortEvent(code)) {
				return true;
			}
		}
		return this.props.isElementVisible(props.element, this.props.side);
	}

	getCellComponent(columnKey) {
		switch (columnKey) {
			case Constants.Schema.DATA_KEYS.NAME:
				if (this.props.side === Constants.MappingSide.INPUT) {
					return TableCell;
				}
				return this.draggableMandatoryField;
			case Constants.Schema.DATA_KEYS.TYPE:
				if (this.props.side === Constants.MappingSide.INPUT) {
					return this.draggableCell;
				}
				return TableCell;
			default:
				return TableCell;
		}
	}

	getExtraProps(columnKey) {
		return this.dndListener;
	}
}

export default class TableRenderer extends Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.revealConnectedElement = this.revealConnectedElement.bind(this);
		this.onEnterElement = this.onEnterElement.bind(this);
		this.onLeaveElement = this.onLeaveElement.bind(this);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
		this.classNameProvider = new SchemaClassNameProvider();
		this.rowDataGetter = new RowDataGetter();
		this.rowRenderer = new RowRenderer();
	}

	onEnterElement(element) {
		this.props.onEnterElement(element, this.props.side);
	}

	onLeaveElement(element) {
		this.props.onLeaveElement(element, this.props.side);
	}

	getElement(ev) {
		const node = ev.currentTarget;
		const elementId = node.dataset.id;
		return this.props.dataAccessor.getSchemaElementFromId(this.props.schema, elementId);
	}

	select(ev) {
		const element = this.getElement(ev);
		this.props.onSelect(ev.ctrlKey, element, this.props.side);
	}

	revealConnectedElement(ev) {
		const element = this.getElement(ev);
		this.props.revealConnectedElement(element, this.props.side);
	}

	updateTableNodeRef(ref) {
		this.tableNode = ref;
	}

	getChildNodes() {
		return this.tableNode.getBodyNode().childNodes;
	}

	getScrollTop() {
		return this.tableNode.getBodyNode().scrollTop;
	}

	setScrollTop(scrollTop) {
		this.tableNode.getBodyNode().scrollTop = scrollTop;
	}

	getChildOffsetTop(child) {
		const childOffsetTop = child.offsetTop;
		const tableOffsetTop = this.tableNode.getTableNode().offsetTop;
		return childOffsetTop + tableOffsetTop;
	}

	getOffsetHeight() {
		return this.tableNode.getBodyNode().offsetHeight;
	}

	getHeaderHeight() {
		return this.tableNode.getHeadNode().offsetHeight;
	}

	render() {
		this.classNameProvider.updateProps(this.props);
		this.rowDataGetter.updateProps(this.props);
		this.rowRenderer.updateProps(this.props);
		const {
			dataAccessor,
			schema,
			draggable,
			onScroll,
			columnKeys,
			updateContentNodeRef,
		} = this.props;
		return (
			<Table
				ref={this.updateTableNodeRef}
				classNameProvider={this.classNameProvider}
				elements={dataAccessor.getSchemaElements(schema, true)}
				columnKeys={columnKeys}
				rowDataGetter={this.rowDataGetter}
				rowRenderer={this.rowRenderer}
				withHeader={true}
				headerRenderer={TableConfiguration.headerRenderer}
				onScroll={onScroll}
				onClick={this.select}
				onDoubleClick={this.revealConnectedElement}
				onEnterRow={this.onEnterElement}
				onLeaveRow={this.onLeaveElement}
			/>
		);
	}
}

TableRenderer.propTypes = {
	dataAccessor: PropTypes.object,
	schema: PropTypes.object,
	draggable: PropTypes.bool,
	onScroll: PropTypes.func,
	columnKeys: PropTypes.array,
	side: PropTypes.string,
	onSelect: PropTypes.func,
	revealConnectedElement: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	isElementVisible: PropTypes.func,
};
