import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import theme from './grid.scss';

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

export default function Grid(props) {
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
		columnDefs: props.columnDefs,
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

	if (props.renderers) {
		agGridOptions.frameworkComponents = {
			...props.renderers,
		};
	}

	return (
		<div>
			<div style={containerStyle} className={classNames(theme.grid)}>
				<AgGridReact {...agGridOptions} />
			</div>
		</div>
	);
}

Grid.propTypes = {
	onFocusedColumn: PropTypes.func,
	onFocusedCell: PropTypes.func,
	rowSelection: PropTypes.string,
	headerHeight: PropTypes.number,
	rowHeight: PropTypes.number,
	renderers: PropTypes.object,
	rowData: PropTypes.arrayOf(PropTypes.object),
	columnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string,
		}),
	),
};

Grid.defaultProps = {
	headerHeight: 69,
	rowHeight: 39,
	rowsData: [],
	columnDefs: [],
};
