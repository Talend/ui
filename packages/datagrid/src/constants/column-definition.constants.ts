import { CellClassParams, ColDef, HeaderClassParams } from 'ag-grid-community';
import classNames from 'classnames';

import DefaultCellRenderer from '../components/DefaultCellRenderer';
import DefaultHeaderRenderer from '../components/HeaderCellRenderer';
import DefaultPinHeaderRenderer from '../components/PinHeaderRenderer';
import PlaygroundCellEditor from '../components/PlaygroundCellEditor';
import { COLUMN_MIN_WIDTH, CELL_WIDTH, SELECTED_CELL_CLASS_NAME } from './datagrid.constants';

function isSelectedColumn(params: CellClassParams | HeaderClassParams) {
	return params.context.selectedColumns?.includes((params.colDef as ColDef).field);
}

export const DefaultPinnedColDef: Partial<ColDef> = {
	/* Avoid to drag a no pinned column before the pinned columns */
	lockPosition: true,
	pinned: 'left',
	valueGetter: params => (params?.node?.rowIndex ?? 0) + 1,
	width: 100,
	headerComponent: DefaultPinHeaderRenderer,
};

export const DefaultColDef: Partial<ColDef> = {
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
	},
};
