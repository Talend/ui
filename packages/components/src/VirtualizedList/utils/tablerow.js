/**
 * This file contains all utility functions that applies to table
 */
import React from 'react';
import classNames from 'classnames';
import { Column } from 'react-virtualized';

import CellCheckboxRenderer from '../CellCheckbox';
import HeaderCheckboxRenderer from '../HeaderCheckbox';
import { internalIds } from './constants';

/**
 * Insert a checkbox column configuration to select a row.
 */
export function insertSelectionConfiguration(props) {
	const { collection, children, isSelected, onToggleAll, selectionToggle } = props;
	let contentsConfiguration = React.Children.toArray(children);
	if (selectionToggle && isSelected) {
		const toggleColumn = (
			<Column
				id={internalIds.rowSelector}
				label={''}
				dataKey={''}
				disableSort
				width={35}
				flexShrink={0}
				flexGrow={0}
				cellDataGetter={({ rowData }) => isSelected(rowData)}
				columnData={{
					label: 'Select this element',
					onChange: selectionToggle,
					onToggleAll,
					collection,
					isSelected,
				}}
				{...CellCheckboxRenderer}
				{...HeaderCheckboxRenderer}
			/>
		);
		contentsConfiguration = [toggleColumn].concat(contentsConfiguration);
	} else if ((process.env.NODE_ENV !== 'production' && selectionToggle) || isSelected) {
		console.warn(
			'VirtualizedList : props.selectionToggle goes with props.isSelected. You defined only one of those props, selection is ignored.',
		);
	}
	return contentsConfiguration;
}

const getWidth = (columnsWidths, { dataKey }) => {
	const columnWidth =
		Array.isArray(columnsWidths) && columnsWidths.find(col => col.dataKey === dataKey);
	if (!columnWidth || !columnWidth.resized || !columnWidth.resizable || columnWidth.width <= 40) {
		return {
			width: columnWidth && columnWidth.width,
			flexShrink: 0,
			flexGrow: 0,
		};
	}
	return { width: columnWidth.width };
};

/**
 * Create new Columns from children, enhanced with
 * - header and row fixed classnames
 * - parent id (via columnData)
 */
export function toColumns({ id, theme, children, columnsWidths, columnDataKeyResizing }) {
	console.log({ columnsWidths });
	return React.Children.toArray(children).map((field, index) => {
		const columnWidth =
			Array.isArray(columnsWidths) &&
			columnsWidths.find(col => col.dataKey === field.props.dataKey);
		const colClassName = `tc-list-cell-${field.props.dataKey}`;
		const colProps = {
			...field.props,
			headerClassName: classNames(field.props.headerClassName, theme.header, colClassName, {
				'tc-header-resizable': columnWidth && columnWidth.resizable,
				'tc-header-resizing': columnDataKeyResizing === field.props.dataKey,
			}),
			className: classNames(field.props.className, theme.cell, colClassName),
			columnData: {
				...field.props.columnData,
				id,
			},
			...getWidth(columnsWidths, field.props),
		};
		return <Column key={index} {...colProps} />;
	});
}
