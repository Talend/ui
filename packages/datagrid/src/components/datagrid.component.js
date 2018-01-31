import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';

import DefaultHeaderGrid, { HEADER_RENDERER_COMPONENT } from './default-header-renderer';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from './default-cell-renderer';
import DefaultPinHeaderRenderer, {
	PIN_HEADER_RENDERER_COMPONENT,
} from './default-pin-header-renderer';

import theme from './datagrid.scss';

let gridAPI;
let currentColId;

const AG_GRID_CUSTOM_HEADER_KEY = 'headerComponent';
const AG_GRID_CUSTOM_CELL_KEY = 'cellRenderer';

function removeFocusColumn() {
	const focusedCells = document.querySelectorAll('.column-focus');
	for (const focusedCell of focusedCells) {
		focusedCell.classList.remove('column-focus');
	}
}

function setFocusColumn(colId) {
	removeFocusColumn();
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

	const agGridOptions = {
		headerHeight: props.headerHeight,
		navigateToNextCell: ({ nextCellDef }) => {
			if (!nextCellDef) {
				return null;
			}
			gridAPI && gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
			return nextCellDef;
		},
		onViewportChanged: () => setFocusColumn(currentColId),
		onVirtualColumnsChanged: () => setFocusColumn(currentColId),
		rowData: props.rowData,
		rowHeight: props.rowHeight,
		rowSelection: props.rowSelection,
		suppressDragLeaveHidesColumns: true,
		onCellFocused: ({ column, ...rest }) => {
			if (!column) {
				return;
			}

			if (column.pinned) {
				removeFocusColumn();
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
		onGridReady: ({ api }) => {
			gridAPI = api;
		},
	};

	if (props.pinnedColumnDefs) {
		agGridOptions.columnDefs = props.pinnedColumnDefs.map(pinnedColumnDefinition => ({
			lockPosition: true,
			pinned: 'left',
			...pinnedColumnDefinition,
			[AG_GRID_CUSTOM_HEADER_KEY]: PIN_HEADER_RENDERER_COMPONENT,
		}));
	}

	if (props.columnDefs) {
		const columnsDefs = props.columnDefs.map(columnDefinition => ({
			lockPinned: true,
			valueGetter: props.valueGetter,
			...columnDefinition,
			[AG_GRID_CUSTOM_CELL_KEY]: CELL_RENDERER_COMPONENT,
			[AG_GRID_CUSTOM_HEADER_KEY]: HEADER_RENDERER_COMPONENT,
		}));
		agGridOptions.columnDefs = [...agGridOptions.columnDefs, ...columnsDefs];
	}

	agGridOptions.frameworkComponents = {
		[CELL_RENDERER_COMPONENT]: props.cellRenderer,
		[HEADER_RENDERER_COMPONENT]: enchancedHeaderRenderer(props.headerRenderer, colId => {
			let rowIndex = 0;
			if (gridAPI.getFocusedCell()) {
				rowIndex = gridAPI.getFocusedCell().rowIndex;
			}
			gridAPI.setFocusedCell(rowIndex, colId);
			setFocusColumn(colId);
			props.onFocusedColumn(colId);
		}),
		[PIN_HEADER_RENDERER_COMPONENT]: props.pinHeaderRenderer,
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
	cellRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
	columnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string.isRequired,
		}),
	),
	headerHeight: PropTypes.number,
	headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
	onFocusedCell: PropTypes.func,
	onFocusedColumn: PropTypes.func,
	pinnedColumnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string.isRequired,
		}),
	),
	pinHeaderRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.Element]),
	rowSelection: PropTypes.string,
	rowHeight: PropTypes.number,
	rowData: PropTypes.arrayOf(PropTypes.object),
	valueGetter: PropTypes.func.isRequired,
};

DataGrid.defaultProps = {
	cellRenderer: DefaultCellRenderer,
	pinHeaderRenderer: DefaultPinHeaderRenderer,
	columnDefs: [],
	headerHeight: 69,
	headerRenderer: DefaultHeaderGrid,
	pinnedColumnDefs: [],
	rowHeight: 39,
	rowsData: [],
};
