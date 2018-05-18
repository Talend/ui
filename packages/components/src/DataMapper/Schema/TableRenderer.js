import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	Table,
	TableCell,
	TableHeader,
	DraggableComponent,
} from '../../index';

import * as Constants from '../Constants';

class InternalClassNameProvider {
	update(schemaProps) {
		this.schemaProps = schemaProps;
	}

	getMain() {
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getMain) {
			return this.schemaProps.classNameProvider.getMain();
		}
		return 'tc-table-container';
	}

	getForTitle() {
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getForTitle) {
			return this.schemaProps.classNameProvider.getForTitle();
		}
		return 'tc-table-title';
	}

	getForFilters() {
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getForFilters) {
			return this.schemaProps.classNameProvider.getForFilters();
		}
		return 'tc-table-filters';
	}

	getForTable() {
		let className = 'tc-table';
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getForTable) {
			 className = this.schemaProps.classNameProvider.getForTable();
		}
		return `${className} schema-content ${this.schemaProps.side}`;
	}

	getForHeader(columnKey) {
		// default header className
		let className = 'tc-table-header';
		// custom header className
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getForHeader) {
			 className = this.schemaProps.classNameProvider.getForHeader();
		}
		// specific header className added for data-mapper context
		const classes = {
			input: this.schemaProps.side === Constants.MappingSide.INPUT,
			output: this.schemaProps.side === Constants.MappingSide.OUTPUT,
		};
		classes[columnKey] = true;
		return `${className} ${classnames(classes)}`;
	}

	getForRow(element) {
		// default row className
		let className = 'tc-table-row';
		// custom row className
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getForRow) {
			 className = this.schemaProps.classNameProvider.getForRow(element);
		}
		// specific row className added for data-mapper context
		const {
			dataAccessor,
			selection,
			side,
			pendingItem,
			dnd,
			focusedElements,
			mappedElements,
			isHighlighted,
			isMapped,
			isSelected,
		} = this.schemaProps;
		const addedClassNames = classnames({
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
			draggable: true,
		});
		return `${className} ${addedClassNames}`;
	}

	getForRowData(columnKey, element) {
		// default row className
		let className = `tc-table-row-data-${columnKey}`;
		// custom row className
		if (this.schemaProps.classNameProvider && this.schemaProps.classNameProvider.getForRowData) {
			 className = this.schemaProps.classNameProvider.getForRowData(columnKey, element);
		}
		return `${className} ${this.schemaProps.side}`;
	}
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

class InternalRowRenderer {
	constructor() {
		this.dndListener = new InternalDndListener();
		this.draggableCell = null;
	}

	update(schemaProps) {
		this.schemaProps = schemaProps;
		this.dndListener.update(schemaProps);
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

	needRowUpdate(rowProps) {
		let customNeedUpdate = false;
		if (this.schemaProps.rowRenderer && this.schemaProps.rowRenderer.needRowUpdate) {
			customNeedUpdate = this.schemaProps.rowRenderer.needRowUpdate(rowProps);
		}
		let needUpdate = false;
		if (this.schemaProps.trigger) {
			const code = this.schemaProps.trigger.code;
			if (this.isModelEvent(code) || this.isFilterOrSortEvent(code)) {
				needUpdate = true;
			}
		}
		if (!needUpdate) {
			needUpdate = this.schemaProps.isElementVisible(rowProps.element, this.schemaProps.side);
		}
		return needUpdate || customNeedUpdate;
	}

	isFirstColumn(columnKey) {
		return this.schemaProps.columnKeys &&
			this.schemaProps.columnKeys.length > 0 &&
			this.schemaProps.columnKeys[0] === columnKey;
	}

	getCellComponent(columnKey) {
		if (this.isFirstColumn(columnKey) && this.draggableCell) {
			return this.draggableCell;
		}
		// default cell component
		let cellComponent = TableCell;
		// check if there is a custom cell component
		if (this.schemaProps.rowRenderer && this.schemaProps.rowRenderer.getCellComponent) {
			cellComponent = this.schemaProps.rowRenderer.getCellComponent(columnKey);
		}
		if (this.isFirstColumn(columnKey)) {
			this.draggableCell = DraggableComponent(cellComponent);
			cellComponent = this.draggableCell;
		}
		return cellComponent;
	}

	getExtraProps(columnKey) {
		let extraProps = {};
		if (this.schemaProps.rowRenderer && this.schemaProps.rowRenderer.getExtraProps) {
			extraProps = this.schemaProps.rowRenderer.getExtraProps(columnKey);
		}
		if (this.isFirstColumn(columnKey)) {
			// add dnd extra props
			extraProps.beginDrag = this.dndListener.beginDrag;
			extraProps.canDrop = this.dndListener.canDrop;
			extraProps.drop = this.dndListener.drop;
			extraProps.endDrag = this.dndListener.endDrag;
		}
		return extraProps;
	}
}

class InternalHeaderRenderer {
	update(schemaProps) {
		this.schemaProps = schemaProps;
	}

	getHeaderComponent(columnKey) {
		let headerComponent = TableHeader;
		if (this.schemaProps.headerRenderer && this.schemaProps.headerRenderer.getHeaderComponent) {
			headerComponent = this.schemaProps.headerRenderer.getHeaderComponent(columnKey);
		}
		return headerComponent;
	}

	getExtraProps() {
		let extraProps = {};
		if (this.schemaProps.headerRenderer && this.schemaProps.headerRenderer.getExtraProps) {
			extraProps = this.schemaProps.headerRenderer.getExtraProps(columnKey);
		}
		return extraProps;
	}
}

export default class TableRenderer extends Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.revealConnectedElement = this.revealConnectedElement.bind(this);
		this.onEnterElement = this.onEnterElement.bind(this);
		this.onLeaveElement = this.onLeaveElement.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
		this.classNameProvider = new InternalClassNameProvider();
		this.rowRenderer = new InternalRowRenderer();
		this.headerRenderer = new InternalHeaderRenderer();
	}

	onEnterElement(element) {
		this.props.onEnterElement(element, this.props.side);
	}

	onLeaveElement(element) {
		this.props.onLeaveElement(element, this.props.side);
	}

	onFilterChange(filter) {
		this.props.onFilterChange(filter, this.props.side);
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
		this.classNameProvider.update(this.props);
		this.rowRenderer.update(this.props);
		this.headerRenderer.update(this.props);
		const {
			dataAccessor,
			schema,
			onScroll,
			columnKeys,
			updateContentNodeRef,
			withHeader,
			filters,
			filtersRenderer,
		} = this.props;
		return (
			<Table
				ref={this.updateTableNodeRef}
				classNameProvider={this.classNameProvider}
				elements={dataAccessor.getSchemaElements(schema, true)}
				columnKeys={columnKeys}
				rowDataGetter={dataAccessor}
				rowRenderer={this.rowRenderer}
				withHeader={withHeader}
				headerRenderer={this.headerRenderer}
				filters={filters}
				filtersRenderer={filtersRenderer}
				onFilterChange={this.onFilterChange}
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
	columnKeys: PropTypes.array,
	classNameProvider: PropTypes.object,
	rowRenderer: PropTypes.object,
	headerRenderer: PropTypes.object,
	withHeader: PropTypes.bool,
	filters: PropTypes.array,
	filtersRenderer: PropTypes.object,
	onFilterChange: PropTypes.func,
	onScroll: PropTypes.func,
	side: PropTypes.string,
	onSelect: PropTypes.func,
	revealConnectedElement: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	isElementVisible: PropTypes.func,
};
