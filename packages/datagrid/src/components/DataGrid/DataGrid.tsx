import React, { useEffect, useMemo, useRef } from 'react';

import { CellFocusedEvent, GridOptions, ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';

import { Icon } from '@talend/design-system';

import { HEADER_HEIGHT, ROW_HEIGHT } from '../../constants';
import { GridContext } from '../../types';
import { handleKeyboard } from './DataGrid.utils';
import { GridColumnSelectionProps, useColumnSelection } from './useColumnSelection.hook';

import theme from './DataGrid.module.scss';

export type DataGridProps = GridOptions &
	GridColumnSelectionProps & {
		/* Shows loader icons instead of grid */
		loading?: boolean;
		/* Controlled selection, handling only columns for now */
		selection?: {
			columnIds?: string[];
		};
	};

export default function DataGrid({
	loading,
	columnDefs,
	selection,
	...props
}: DataGridProps): JSX.Element {
	const gridRef = useRef<AgGridReact>(null);
	const { selectedColumns, updateSelectionOnCellFocus, onHeaderFocus, setSelectedColumns } =
		useColumnSelection(gridRef, props);
	const context = useRef<GridContext>({ selectedColumns });

	function onCellFocused(event: CellFocusedEvent) {
		updateSelectionOnCellFocus(event);
		if (props.onCellFocused) {
			props.onCellFocused(event);
		}
	}

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
