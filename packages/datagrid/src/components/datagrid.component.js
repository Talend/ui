import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';

import DefaultHeaderGrid, { HEADER_RENDERER_COMPONENT } from './default-header-renderer';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from './default-cell-renderer';

import theme from './datagrid.scss';

let gridAPI;
let currentColId;

function setFocusColumn(colId) {
	const focusedCells = document.querySelectorAll('.column-focus');
	for (const focusedCell of focusedCells) {
		focusedCell.classList.remove('column-focus');
	}

	const columnsCells = document.querySelectorAll(`[col-id="${colId}"]`);
	for (const columnCell of columnsCells) {
		columnCell.classList.add('column-focus');
	}
}

function enchancedHeaderRenderer(HeaderRenderer, onFocusedColumn) {
	return props => <HeaderRenderer {...props} onFocusedColumn={onFocusedColumn} />;
}

export default function DataGrid(props) {
	const containerStyle = {
		height: 800,
	};

	// by default, ag-grid hide the column when the user drag outside the column
	const agGridOptions = {
		onGridReady: ({ api }) => {
			gridAPI = api;
		},
		onViewportChanged: () => setFocusColumn(currentColId),
		onVirtualColumnsChanged: () => setFocusColumn(currentColId),
		headerHeight: props.headerHeight,
		rowData: props.rowData,
		rowHeight: props.rowHeight,
		suppressDragLeaveHidesColumns: true,
		rowSelection: props.rowSelection,
		navigateToNextCell: ({ nextCellDef }) => {
			if (!nextCellDef) {
				return null;
			}
			gridAPI && gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
			return nextCellDef;
		},
		onCellFocused: ({ column, ...rest }) => {
			if (!column) {
				return;
			}

			if (column.pinned) {
				return;
			}

			currentColId = column.colId;

			setFocusColumn(currentColId);

			if (props.onFocusedCell) {
				props.onFocusedCell({
					column,
					...rest,
				});
			}
		},
	};

	if (props.columnDefs) {
		agGridOptions.columnDefs = props.columnDefs.map(columnDefinition => ({
			...columnDefinition,
			[CELL_RENDERER_COMPONENT]: CELL_RENDERER_COMPONENT,
		}));
	}

	agGridOptions.frameworkComponents = {
		[CELL_RENDERER_COMPONENT]: props.cellRenderer,
		[HEADER_RENDERER_COMPONENT]: enchancedHeaderRenderer(props.headerRenderer, colId => {
			const focusedCell = gridAPI.getFocusedCell();
			gridAPI.setFocusedCell(focusedCell.rowIndex, colId);
			setFocusColumn(colId);
			props.onFocusedColumn(colId);
		}),
	};

	return (
		<div>
			<div style={containerStyle} className={classNames(theme.grid)}>
				<AgGridReact {...agGridOptions} />
			</div>
		</div>
	);
}

DataGrid.propTypes = {
	headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
	cellRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
	onFocusedColumn: PropTypes.func,
	onFocusedCell: PropTypes.func,
	rowSelection: PropTypes.string,
	headerHeight: PropTypes.number,
	rowHeight: PropTypes.number,
	rowData: PropTypes.arrayOf(PropTypes.object),
	columnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string,
		}),
	),
};

DataGrid.defaultProps = {
	headerHeight: 69,
	rowHeight: 39,
	rowsData: [],
	columnDefs: [],
	headerRenderer: DefaultHeaderGrid,
	cellRenderer: DefaultCellRenderer,
};
