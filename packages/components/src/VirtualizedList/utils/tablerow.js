/**
 * This file contains all utility functions that applies to table
 */
import { Children } from 'react';
import classNames from 'classnames';
import { Column } from 'react-virtualized';
import CellCheckboxRenderer from '../CellCheckbox';
import HeaderCheckboxRenderer from '../HeaderCheckbox';
import { createColumnWidthProps, getColumnWidth } from './resizable';
import { internalIds } from './constants';
/**
 * Insert a checkbox column configuration to select a row.
 */
export function insertSelectionConfiguration(props) {
	const {
		collection,
		children,
		getRowState,
		isSelected,
		isToggleAllDisabled,
		onToggleAll,
		selectionMode,
		selectionToggle,
	} = props;
	let contentsConfiguration = Children.toArray(children);
	if (selectionToggle && isSelected) {
		const toggleColumn = (
			<Column
				id={internalIds.rowSelector}
				label=""
				dataKey=""
				disableSort
				width={35}
				flexShrink={0}
				flexGrow={0}
				cellDataGetter={({ rowData }) => isSelected(rowData)}
				columnData={{
					collection,
					getRowState,
					isSelected,
					isToggleAllDisabled,
					label: 'Select this element',
					onChange: selectionToggle,
					onToggleAll,
					selectionMode,
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

/**
 * Create new Columns from children, enhanced with
 * - header and row fixed classnames
 * - parent id (via columnData)
 */
export function toColumns({ id, theme, children, columnsWidths, getRowState }) {
	return Children.toArray(children).map((field, index) => {
		const columnWidth = getColumnWidth(field.props.dataKey, columnsWidths);
		const colClassName = `tc-list-cell-${field.props.dataKey}`;
		const colProps = {
			// ...createColumnWidthProps(columnWidth),
			width: -1,
			...field.props,
			headerClassName: classNames(field.props.headerClassName, theme.header, colClassName, {
				'tc-header-resizable': columnWidth && columnWidth.resizable,
			}),
			className: classNames(field.props.className, theme.cell, colClassName),
			columnData:
				typeof field.props.columnData === 'function'
					? rowData => ({ ...field.props.columnData(rowData), getRowState, id })
					: {
							...field.props.columnData,
							getRowState,
							id,
					  },
			...createColumnWidthProps(columnWidth),
		};
		return <Column key={index} {...colProps} />;
	});
}
