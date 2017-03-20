import React from 'react';
import TitleCell from '../CellTitle/CellTitle.component';

export function getCellRenderer(field) {
	return field.props.cellRenderer;
}

export function getId(parent) {
	return parent.props.id;
}

export function getColumnData(parent, field) {
	return {
		...field.props.columnData,
		id: getId(parent),
	};
}

export function getDataKey(field) {
	return field.props.dataKey;
}

export function getLabel(field) {
	return field.props.label;
}

export function getRowData(parent, index) {
	return parent.props.collection[index];
}

export function getCellData(field, parent, index) {
	const item = getRowData(parent, index);
	return item[getDataKey(field)];
}

export function extractTitle(parent) {
	const children = React.Children.toArray(parent.props.children);
	const titleField = children.find(field => getCellRenderer(field) === TitleCell);
	const otherFields = children.filter(field => field !== titleField);

	return { titleField, otherFields };
}

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
