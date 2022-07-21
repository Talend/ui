import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CellFocusedEvent, GridOptions, Column, ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';

import { Icon } from '@talend/design-system';

import { HEADER_HEIGHT, ROW_HEIGHT, SELECTED_CELL_CLASS_NAME } from '../../constants';
import { GridContext, HeaderClickParams } from '../../types';
import { handleKeyboard, handleMultiSelection } from './DataGrid.utils';

import theme from './DataGrid.module.scss';

export type DataGridProps = GridOptions & {
	/* Shows loader icons instead of grid */
	loading?: boolean;
	/* Enable ctrl/shift modifier on column header, default: 'single' */
	columnSelection?: 'single' | 'multiple';
	onColumnSelectionChanged?(params: { columns: string[] }): void;
	/* Controlled selection, handling only columns for now */
	selection?: {
		columnIds?: string[];
	};
};

export default function DataGrid({
	loading,
	columnSelection = 'single',
	onColumnSelectionChanged,
	columnDefs,
	selection,
	...props
}: DataGridProps): JSX.Element {
	const gridRef = useRef<AgGridReact>(null);
	const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
	const context = useRef<GridContext>({ selectedColumns });

	function onCellFocused(event: CellFocusedEvent) {
		// filter event triggered by clearFocusedCell
		if (event.column instanceof Column) {
			const update = event.column.isPinned() ? [] : [event.column.getColId()];
			// Column selection changed
			if (selectedColumns.length > 1 || selectedColumns[0] !== update[0]) {
				setSelectedColumns(update);
			}
		}
		if (props.onCellFocused) {
			props.onCellFocused(event);
		}
	}

	const onHeaderFocus = useCallback(
		(event: HeaderClickParams) => {
			// Unselect rows if needed
			if (gridRef.current?.api.getSelectedRows().length) {
				gridRef.current?.api.deselectAll();
				gridRef.current?.api.clearFocusedCell();
			}
			const colId = event.column.getColId();
			const allColIds = gridRef.current!.columnApi.getColumns()!.map(col => col.getColId());

			const update =
				columnSelection === 'multiple'
					? handleMultiSelection(allColIds, colId, context.current.selectedColumns, event.event)
					: [colId];
			setSelectedColumns(update);
		},
		[setSelectedColumns, columnSelection],
	);

	// Ag-grid doesn't provide click listener on header cell, create one
	const enrichedColumnDefs = useMemo(() => {
		return columnDefs?.map((colDef: ColDef) => ({
			...colDef,
			headerComponentParams: {
				...colDef.headerComponentParams,
				onFocus: onHeaderFocus,
			},
		}));
	}, [columnDefs, onHeaderFocus]);

	// Handle controlled selection
	const controlledColumnIds = selection?.columnIds;
	useEffect(() => {
		if (controlledColumnIds) {
			setSelectedColumns(controlledColumnIds);
		}
	}, [controlledColumnIds]);

	// Force style update when selection changed
	useEffect(() => {
		const previousSelection = context.current.selectedColumns;
		context.current.selectedColumns = selectedColumns;

		// BEGIN QUICKFIX: Would be better to use gridRef.current?.api.refreshHeader() but it has a weird flicker
		gridRef.current?.api?.['gridOptionsWrapper'].eGridDiv // eslint-disable-line
			?.querySelectorAll('.ag-header-cell')
			.forEach((cell: HTMLElement) =>
				cell.classList.toggle(
					SELECTED_CELL_CLASS_NAME,
					selectedColumns.includes(cell.getAttribute('col-id')!),
				),
			);
		// END QUICKFIX

		// Will recompute & update cell classes
		gridRef.current?.api?.refreshCells({
			columns: [...previousSelection, ...selectedColumns],
		});

		// In controlled mode, scroll to newly selected column
		if (selectedColumns.length === 1) {
			gridRef.current?.api.ensureColumnVisible(selectedColumns[0]);
		}

		if (onColumnSelectionChanged) {
			onColumnSelectionChanged({
				columns: selectedColumns,
			});
		}
	}, [selectedColumns]);

	return (
		<div
			className={classNames(theme['td-grid'], {
				[theme['td-grid--loading']]: loading,
			})}
		>
			{loading ? (
				<div className={theme['td-grid-loader']}>
					<Icon name="talend-table" />
				</div>
			) : (
				<AgGridReact
					ref={gridRef}
					headerHeight={HEADER_HEIGHT}
					rowHeight={ROW_HEIGHT}
					/* By default, ag-grid deletes a column when we drag an column outside the grid.*/
					suppressDragLeaveHidesColumns={false}
					suppressPropertyNamesCheck
					tabToNextCell={handleKeyboard}
					navigateToNextCell={handleKeyboard}
					rowSelection="single"
					columnDefs={enrichedColumnDefs}
					{...props}
					onCellFocused={onCellFocused}
					context={context.current}
				/>
			)}
		</div>
	);
}
