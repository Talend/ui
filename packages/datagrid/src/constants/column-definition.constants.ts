import { CellClassParams, ColDef, HeaderClassParams, ValueGetterParams } from 'ag-grid-community';
import classNames from 'classnames';

import DefaultCellRenderer from '../components/DefaultCellRenderer';
import DefaultHeaderRenderer from '../components/HeaderCellRenderer';
import DefaultPinHeaderRenderer from '../components/PinHeaderRenderer';
import PlaygroundCellEditor from '../components/PlaygroundCellEditor';
import {
	COLUMN_MIN_WIDTH,
	CELL_WIDTH,
	SELECTED_CELL_CLASS_NAME,
	HIGHLIGHTED_CELL_CLASS_NAME,
} from './datagrid.constants';

function isSelectedColumn(params: CellClassParams | HeaderClassParams) {
	return params.context.selectedColumns?.includes((params.colDef as ColDef).field);
}

export const DefaultPinnedColDef = {
	/* Avoid to drag a no pinned column before the pinned columns */
	lockPosition: true,
	pinned: 'left' as ColDef['pinned'],
	valueGetter: (params: ValueGetterParams) => (params?.node?.rowIndex ?? 0) + 1,
	width: 100,
	headerComponent: DefaultPinHeaderRenderer,
};

export const DefaultColDef = {
	minWidth: COLUMN_MIN_WIDTH,
	width: CELL_WIDTH,
	resizable: true,
	cellRenderer: DefaultCellRenderer,
	headerComponent: DefaultHeaderRenderer,
	cellEditor: PlaygroundCellEditor,
	// too bad headerClassRules doesn't exist
	headerClass: (params: HeaderClassParams) =>
		classNames({
			[SELECTED_CELL_CLASS_NAME]: isSelectedColumn(params),
		}),
	cellClassRules: {
		[SELECTED_CELL_CLASS_NAME]: isSelectedColumn,
		[HIGHLIGHTED_CELL_CLASS_NAME]: ({ api, colDef, value }: CellClassParams) => {
			const focusedCell = api.getFocusedCell();
			if (focusedCell) {
				// For each cell, check if it's the same value as the focused cell
				const focusedRow = api.getDisplayedRowAtIndex(focusedCell.rowIndex);
				const focusedValue = api.getValue(focusedCell.column, focusedRow!)?.value;
				return value?.value === focusedValue && colDef === focusedCell.column.getColDef();
			}
			return false;
		},
	},
};
