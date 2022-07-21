import { RefObject, useCallback, useEffect, useState } from 'react';

import { CellFocusedEvent, Column } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { HeaderClickParams } from '../../types';
import { handleMultiSelection, refreshHeader } from './DataGrid.utils';

export interface GridColumnSelectionProps {
	/* Enable ctrl/shift modifier on column header, default: 'single' */
	columnSelection?: 'single' | 'multiple';
	onColumnSelectionChanged?(params: { columnIds: string[] }): void;
}

export function useColumnSelection(
	gridRef: RefObject<AgGridReact>,
	{ columnSelection = 'single', onColumnSelectionChanged }: GridColumnSelectionProps,
) {
	const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

	function updateSelectionOnCellFocus(event: CellFocusedEvent) {
		// filter event triggered by clearFocusedCell
		if (event.column instanceof Column && event.rowIndex !== null) {
			const update = event.column.isPinned() ? [] : [event.column.getColId()];
			// Column selection changed
			if (selectedColumns.length > 1 || selectedColumns[0] !== update[0]) {
				setSelectedColumns(update);
			}
		}
	}

	const onHeaderFocus = useCallback(
		(event: HeaderClickParams) => {
			if (gridRef.current) {
				// Unselect rows if needed
				if (gridRef.current.api.getSelectedRows().length) {
					gridRef.current.api.deselectAll();
				}
				gridRef.current.api.setFocusedCell(null!, event.column); // CellFocusedEvent allows null rowIndex
				const update = handleMultiSelection(
					event.column.getColId(),
					gridRef.current.columnApi.getColumns()!.map(col => col.getColId()),
					gridRef.current.props.context.selectedColumns,
					columnSelection === 'multiple' ? event.event : null,
				);
				setSelectedColumns(update);
			}
		},
		[setSelectedColumns, columnSelection],
	);

	// Force style update when selection changed
	useEffect(() => {
		if (gridRef.current) {
			const previousSelection = gridRef.current.props.context.selectedColumns;
			gridRef.current.props.context.selectedColumns = selectedColumns;

			// Will recompute & update cell classes
			refreshHeader(gridRef.current.api, selectedColumns, previousSelection);
			gridRef.current.api?.refreshCells({
				columns: [...previousSelection, ...selectedColumns],
			});

			// In controlled mode, scroll to newly selected column
			if (selectedColumns.length === 1) {
				gridRef.current.api.ensureColumnVisible(selectedColumns[0]);
			}

			if (onColumnSelectionChanged && selectedColumns !== previousSelection) {
				onColumnSelectionChanged({
					columnIds: selectedColumns,
				});
			}
		}
	}, [selectedColumns]);

	return {
		selectedColumns,
		setSelectedColumns,
		onHeaderFocus,
		updateSelectionOnCellFocus,
	};
}
