import React, { useEffect, useMemo, useRef } from 'react';

import {
	CellFocusedEvent,
	GridOptions,
	ColDef,
	DragStoppedEvent,
	BodyScrollEvent,
} from 'ag-grid-community';
import { AgGridReact as AgGridReactType } from 'ag-grid-react';
import classNames from 'classnames';

import assetsApi from '@talend/assets-api';
import { Icon } from '@talend/design-system';

import { HEADER_HEIGHT, ROW_HEIGHT } from '../../constants';
import { GridContext } from '../../types';
import { getColumnSizes, handleKeyboard, saveColumnSizes } from './DataGrid.utils';
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
		/* Key to use when persisting sizes to local storage */
		sizesLocalStorageKey?: string;
		onVerticalScroll?(
			event: BodyScrollEvent,
			indexes: { firstDisplayedRowIndex: number; lastDisplayedRowIndex: number },
		): void;
	};

const AgGridReact = React.lazy(() =>
	assetsApi
		.getUMD('ag-grid-community')
		.then(() => assetsApi.getUMD('ag-grid-react'))
		.then(mod => assetsApi.toDefaultModule(mod.AgGridReact)),
);

function DataGridSkeleton() {
	return (
		<div className={theme['td-grid-loader']}>
			<Icon name="talend-table" />
		</div>
	);
}

export default function DataGrid({
	loading,
	columnDefs,
	selection,
	sizesLocalStorageKey,
	onVerticalScroll,
	...props
}: DataGridProps): JSX.Element {
	const gridRef = useRef<AgGridReactType>(null);
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
		const savedSizes = getColumnSizes(sizesLocalStorageKey);
		return columnDefs?.map((colDef: ColDef) => ({
			...colDef,
			width: savedSizes?.[colDef.field!] || colDef.width,
			headerComponentParams: {
				...colDef.headerComponentParams,
				onFocus: onHeaderFocus,
			},
		}));
	}, [columnDefs, onHeaderFocus, sizesLocalStorageKey]);

	// Handle controlled selection
	const controlledColumnIds = selection?.columnIds;
	useEffect(() => {
		if (controlledColumnIds) {
			setSelectedColumns(controlledColumnIds);
		}
	}, [controlledColumnIds]);

	// Add size persistence support
	function onDragStopped(event: DragStoppedEvent) {
		if (sizesLocalStorageKey) {
			saveColumnSizes(sizesLocalStorageKey, event.columnApi.getColumns());
		}
		if (props.onDragStopped) {
			props.onDragStopped(event);
		}
	}

	function onBodyScroll(event: BodyScrollEvent) {
		if (event.direction === 'vertical' && onVerticalScroll) {
			onVerticalScroll(event, {
				firstDisplayedRowIndex: event.api.getFirstDisplayedRow(),
				lastDisplayedRowIndex: event.api.getLastDisplayedRow(),
			});
		}
		if (props.onBodyScroll) {
			props.onBodyScroll(event);
		}
	}

	return (
		<div className={classNames(theme['td-grid'])}>
			{loading ? (
				<DataGridSkeleton />
			) : (
				<React.Suspense fallback={<DataGridSkeleton />}>
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
						onDragStopped={onDragStopped}
						onBodyScroll={onBodyScroll}
					/>
				</React.Suspense>
			)}
		</div>
	);
}
