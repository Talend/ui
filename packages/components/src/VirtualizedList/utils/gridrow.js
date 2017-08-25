/**
 * This utility file contains any common functions that are used in row renderers
 * - get infos from parent props, content field, ...
 * - render a cell
 * - ...
 */

import React from 'react';
import CellTitle from '../CellTitle/CellTitle.component';
import { internalIds } from './constants';

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
	return parent.props.rowGetter(index);
}

/**
 * Get cell data
 * @param field The VirtualizedList.Content instance
 * @param parent The row instance
 * @param index The item index in collection
 */
export function getCellData(field, parent, index) {
	return field.props.cellDataGetter({
		columnData: getColumnData(parent, field),
		dataKey: getDataKey(field),
		rowData: getRowData(parent, index),
	});
}

/**
 * Extract the title VirtualizedList.Content from the other ones
 * @param parent The row parent
 */
export function extractSpecialFields(parent) {
	const children = React.Children.toArray(parent.props.children);
	const titleField = children.find(field => getCellRenderer(field) === CellTitle);
	const selectionField = children.find(field => field.props.id === internalIds.rowSelector);
	const otherFields = children.filter(field => field !== titleField && field !== selectionField);

	return { titleField, selectionField, otherFields };
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
