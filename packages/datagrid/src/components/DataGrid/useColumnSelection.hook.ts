import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { CellFocusedEvent } from 'ag-grid-community';

import { GridRef, HeaderClickParams } from '../../types';
import { handleMultiSelection, refreshHeader } from './DataGrid.utils';

export interface GridColumnSelectionProps {
	/* Enable ctrl/shift modifier on column header, default: 'single' */
	columnSelection?: 'single' | 'multiple';
	onColumnSelectionChanged?(params: { columnIds: string[] }): void;
	/* Controlled selection, handling only columns for now */
	selection?: {
		columnIds?: string[];
	};
}

export function useColumnSelection(
	gridRef: GridRef | null,
	{ columnSelection = 'single', onColumnSelectionChanged, selection }: GridColumnSelectionProps,
) {
	const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

	function updateSelectionOnCellFocus(event: CellFocusedEvent) {
		// filter event triggered by clearFocusedCell
		if (event.column && typeof event.column !== 'string' && event.rowIndex !== null) {
			const update = event.column.isPinned() ? [] : [event.column.getColId()];
			// Column selection changed
			if (selectedColumns.length > 1 || selectedColumns[0] !== update[0]) {
				setSelectedColumns(update);
			} else {
				// Only row changed
				event.api.refreshCells({
					columns: [event.column],
				});
			}
		}
	}

	const onHeaderFocus = useCallback(
		(event: HeaderClickParams) => {
			if (gridRef) {
				// Unselect rows if needed
				if (gridRef.api.getSelectedRows().length) {
					gridRef.api.deselectAll();
				}
				gridRef.api.setFocusedCell(null!, event.column); // CellFocusedEvent allows null rowIndex
				const update = handleMultiSelection(
					event.column.getColId(),
					gridRef.columnApi.getColumns()!.map(col => col.getColId()),
					gridRef.context.selectedColumns,
					columnSelection === 'multiple' ? event.event : null,
				);
				setSelectedColumns(update);
			}
		},
		[setSelectedColumns, columnSelection, gridRef],
	);

	// Handle controlled selection
	const controlledColumnIds = selection?.columnIds;
	useEffect(() => {
		if (controlledColumnIds && gridRef) {
			setSelectedColumns(controlledColumnIds);
			if (controlledColumnIds.length === 1) {
				gridRef.api.ensureColumnVisible(controlledColumnIds[0]);
			}
		}
	}, [controlledColumnIds, gridRef]);

	// Force style update when selection changed
	useLayoutEffect(() => {
		if (gridRef) {
			const previousSelection = gridRef.context.selectedColumns;
			gridRef.context.selectedColumns = selectedColumns;

			// Will recompute & update cell classes
			refreshHeader(gridRef.api, selectedColumns, previousSelection);
			gridRef.api?.refreshCells({
				columns: [...previousSelection, ...selectedColumns],
			});

			if (
				onColumnSelectionChanged &&
				selectedColumns !== previousSelection &&
				selectedColumns !== selection?.columnIds
			) {
				onColumnSelectionChanged({
					columnIds: selectedColumns,
				});
			}
		}
	}, [selectedColumns, gridRef]);

	return {
		selectedColumns,
		setSelectedColumns,
		onHeaderFocus,
		updateSelectionOnCellFocus,
	};
}
