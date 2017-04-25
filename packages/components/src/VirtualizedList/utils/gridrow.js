import React from 'react';
import TitleCell from '../CellTitle/CellTitle.component';

/**
 * Get the cell renderer from VirtualizedList.Content configuration
 * @param field The VirtualizedList.Content instance
 */
export function getCellRenderer(field) {
	return field.props.cellRenderer;
}

/**
 * Get the id from row parent instance
 * @param parent The row parent instance
 */
export function getId(parent) {
	return parent.props.id;
}

/**
 * Enhance VirtualizedList.Content columnData with the row parent id
 * @param parent The row parent instance
 * @param field The VirtualizedList.Content instance
 */
export function getColumnData(parent, field) {
	return {
		...field.props.columnData,
		id: getId(parent),
	};
}

/**
 * Get the data property key from VirtualizedList.Content instance
 * @param field The VirtualizedList.Content instance
 */
export function getDataKey(field) {
	return field.props.dataKey;
}

/**
 * Get the content label from VirtualizedList.Content instance
 * @param field The VirtualizedList.Content instance
 */
export function getLabel(field) {
	return field.props.label;
}

/**
 * Get the collection item
 * @param parent The row parent instance
 * @param index The item index in the collection
 */
export function getRowData(parent, index) {
	return parent.props.collection[index];
}

/**
 * Get cell data
 * @param field The VirtualizedList.Content instance
 * @param parent The row instance
 * @param index The item index in collection
 */
export function getCellData(field, parent, index) {
	const item = getRowData(parent, index);
	return item[getDataKey(field)];
}

/**
 * Extract the title VirtualizedList.Content from the other ones
 * @param parent The row parent
 */
export function extractTitle(parent) {
	const children = React.Children.toArray(parent.props.children);
	const titleField = children.find(field => getCellRenderer(field) === TitleCell);
	const otherFields = children.filter(field => field !== titleField);

	return { titleField, otherFields };
}

/**
 * Render a cell
 * @param index The item index in collection
 * @param parent The row parent instance
 * @param field The VirtualizedList.Content instance
 */
export function renderCell(index, parent, field) {
	const cellRenderer = getCellRenderer(field);
	return cellRenderer({
		cellData: getCellData(field, parent, index),
		columnData: getColumnData(parent, field),
		dataKey: getDataKey(field),
		rowData: getRowData(parent, index),
		rowIndex: index,
	});
}
