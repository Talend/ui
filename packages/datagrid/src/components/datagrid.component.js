import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import { Inject } from '@talend/react-components';

import { HEADER_RENDERER_COMPONENT } from './default-header-renderer';
import { CELL_RENDERER_COMPONENT } from './default-cell-renderer';
import { PIN_HEADER_RENDERER_COMPONENT } from './default-pin-header-renderer';

import theme from './datagrid.scss';

const AG_GRID_CUSTOM_HEADER_KEY = 'headerComponent';
const AG_GRID_CUSTOM_CELL_KEY = 'cellRenderer';
const AG_GRID_DEFAULT_ROW_SELECTION = 'single';
const HEADER_HEIGHT = 69;
const ROW_HEIGHT = 39;

let gridAPI;
let currentColId;

function removeFocusColumn() {
	const focusedCells = document.querySelectorAll('.column-focus');
	for (const focusedCell of focusedCells) {
		focusedCell.classList.remove('column-focus');
	}
}

function setFocusColumn(colId) {
	removeFocusColumn();

	if (colId === 'index.index') {
		return;
	}

	const columnsCells = document.querySelectorAll(`[col-id="${colId}"]`);
	for (const columnCell of columnsCells) {
		columnCell.classList.add('column-focus');
	}
}

function enchancedHeaderRenderer(getComponent, headerRenderer, onFocusedColumn) {
	const Component = Inject.get(getComponent, headerRenderer);

	return props => <Component {...props} onFocusedColumn={onFocusedColumn} />;
}

function handleKeyboard({ nextCellDef, previousCellDef }) {
	if (!nextCellDef) {
		return null;
	}

	if (previousCellDef.rowIndex !== nextCellDef.rowIndex) {
		if (gridAPI) {
			gridAPI.getDisplayedRowAtIndex(nextCellDef.rowIndex).setSelected(true, true);
		}
	}

	return nextCellDef;
}

export default function DataGrid(props) {
	const agGridOptions = {
		headerHeight: props.headerHeight,
		tabToNextCell: handleKeyboard,
		navigateToNextCell: handleKeyboard,
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

			currentColId = column.colId;
			if (column.pinned) {
				removeFocusColumn();
				return;
			}

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
			valueGetter: props.valueGetter,
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
		[CELL_RENDERER_COMPONENT]: Inject.get(props.getComponent, props.cellRenderer),
		[HEADER_RENDERER_COMPONENT]: enchancedHeaderRenderer(
			props.getComponent,
			props.headerRenderer,
			colId => {
				let selectedRowIndex = 0;
				if (gridAPI.getFocusedCell()) {
					selectedRowIndex = gridAPI.getFocusedCell().rowIndex;
				}
				gridAPI.setFocusedCell(selectedRowIndex, colId);
				setFocusColumn(colId);
				props.onFocusedColumn(colId);
			},
		),
		[PIN_HEADER_RENDERER_COMPONENT]: Inject.get(props.getComponent, props.pinHeaderRenderer),
	};

	return (
		<div className={classNames(theme.grid, theme[props.theme])}>
			<AgGridReact {...agGridOptions} />
		</div>
	);
}

DataGrid.propTypes = {
	cellRenderer: PropTypes.string,
	columnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string.isRequired,
		}),
	),
	getComponent: PropTypes.func,
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
	theme: PropTypes.string,
	valueGetter: PropTypes.func.isRequired,
};

DataGrid.defaultProps = {
	cellRenderer: 'DefaultCellRenderer',
	columnDefs: [],
	headerHeight: HEADER_HEIGHT,
	headerRenderer: 'DefaultHeaderRenderer',
	pinHeaderRenderer: 'DefaultPinHeaderRenderer',
	pinnedColumnDefs: [],
	rowHeight: ROW_HEIGHT,
	rowData: [],
	rowSelection: AG_GRID_DEFAULT_ROW_SELECTION,
};
