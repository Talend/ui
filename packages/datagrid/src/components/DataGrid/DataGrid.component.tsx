import React, { useEffect, useRef, useState } from 'react';

import {
	BodyScrollEvent,
	CellFocusedEvent,
	ColDef,
	GridApi,
	GridReadyEvent,
	NavigateToNextCellParams,
	TabToNextCellParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import keycode from 'keycode';

import { Icon } from '@talend/design-system';

import { NAMESPACE_INDEX } from '../../constants';
import serializer from '../DatasetSerializer';
import DefaultCellRenderer from '../DefaultCellRenderer';
import DefaultRenderer from '../DefaultCellRenderer/DefaultRenderer.component';
import DefaultHeaderRenderer from '../DefaultHeaderRenderer';
import DefaultIntCellRenderer from '../DefaultIntCellRenderer';
import DefaultPinHeaderRenderer from '../PinHeaderRenderer';

import theme from './DataGrid.scss';

const FOCUSED_COLUMN_CLASS_NAME = 'column-focus';
const HEADER_HEIGHT = 65;
const COLUMN_MIN_WIDTH = 30;
const ROW_HEIGHT = 39;
const CELL_WIDTH = 150;

export interface DatagridProps {
	avroRenderer?: Record<string, JSX.Element>;
	cellRenderer?: JSX.Element;
	loading: boolean;
	enableColResize: boolean;
	columnMinWidth: number;
	focusedColumnId: string;
	getPinnedColumnDefsFn(data: any): ColDef[];
	getColumnDefsFn: ColDef[];
	getRowDataFn(): any;
	startIndex?: number;
	getCellValueFn(): string;
	headerRenderer: JSX.Element;
	onFocusedCell(event: CellFocusedEvent): void;
	onFocusedColumn({ colId }: { colId: string }): void;
	onVerticalScroll?(
		event: BodyScrollEvent,
		params: {
			firstDisplayedRowIndex: number;
			lastDisplayedRowIndex: number;
		},
	): void;
	pinHeaderRenderer: JSX.Element;
	data: any;
	rowData: any[];
}

export default function DataGrid(props: DatagridProps): JSX.Element {
	const {
		avroRenderer,
		focusedColumnId,
		loading,
		enableColResize,
		cellRenderer = DefaultCellRenderer,
		columnMinWidth = COLUMN_MIN_WIDTH,
		getCellValueFn = serializer.getCellValue,
		getColumnDefsFn = serializer.getColumnDefs,
		getPinnedColumnDefsFn = serializer.getPinnedColumnDefs,
		getRowDataFn = serializer.getRowData,
		headerRenderer = DefaultHeaderRenderer,
		pinHeaderRenderer = DefaultPinHeaderRenderer,
		rowNodeIdentifier = 'index.index',
		startIndex = 0,
		onVerticalScroll,
		data,
	} = props;

	const containerRef = useRef<HTMLDivElement | null>(null);
	const gridAPI = useRef<GridApi>();
	const [currentColId, setCurrentColId] = useState<DatagridProps['focusedColumnId']>();

	function updateStyleFocusColumn() {
		const colId = currentColId;

		if (!colId || colId.includes(NAMESPACE_INDEX)) {
			return;
		}

		// workaround see README.md#Workaround Active Column
		const columnsCells = containerRef.current!.querySelectorAll(
			`[col-id="${colId}"]:not(.${FOCUSED_COLUMN_CLASS_NAME})`,
		);

		columnsCells.forEach(({ classList }) => classList.add(FOCUSED_COLUMN_CLASS_NAME));
	}

	function handleKeyboard({
		nextCellPosition,
		previousCellPosition,
	}: TabToNextCellParams | NavigateToNextCellParams) {
		if (!nextCellPosition || nextCellPosition.rowIndex < 0) {
			return null;
		}

		if (gridAPI.current && previousCellPosition.rowIndex !== nextCellPosition.rowIndex) {
			// ag-grid workaround: ag-grid set a selected row only by a click by an user
			// This allows, when the user move the cell by the keyboard/tab, to set the selected row
			gridAPI.current.getDisplayedRowAtIndex(nextCellPosition.rowIndex)!.setSelected(true, true);
		}

		return nextCellPosition;
	}

	function shouldUpdateCurrentColumn() {
		// Update local state if component is not controlled or if props changed
		return focusedColumnId === undefined || focusedColumnId !== currentColId;
	}

	function removeFocusColumn() {
		// workaround see README.md#Workaround Active Column
		const focusedCells = containerRef.current!.querySelectorAll(`.${FOCUSED_COLUMN_CLASS_NAME}`);

		focusedCells.forEach(({ classList }) => classList.remove(FOCUSED_COLUMN_CLASS_NAME));
	}

	function onFocusedCell(event: CellFocusedEvent) {
		const column = event.column;
		if (!column) {
			return;
		}
		if (shouldUpdateCurrentColumn()) {
			const { colId, pinned } = column.getColDef();
			if (colId !== currentColId || pinned) {
				removeFocusColumn();
			}

			setCurrentColId(colId);

			if (pinned) {
				return;
			}

			updateStyleFocusColumn();
		}

		if (props.onFocusedCell) {
			props.onFocusedCell(event);
		}
	}

	function onFocusedColumn(colId: string) {
		if (shouldUpdateCurrentColumn()) {
			// Scroll to focused column in controlled mode
			if (focusedColumnId != null) {
				gridAPI.current!.ensureColumnVisible(colId);
			}

			gridAPI.current!.deselectAll();
			gridAPI.current!.clearFocusedCell();

			removeFocusColumn();
			setCurrentColId(colId);
			updateStyleFocusColumn();
		}

		if (props.onFocusedColumn && focusedColumnId !== colId) {
			props.onFocusedColumn({ colId });
		}
	}

	function onKeyDownHeaderColumn(event: KeyboardEvent, colId: string) {
		if (event.keyCode === keycode('down')) {
			gridAPI.current!.setFocusedCell(0, colId);
			gridAPI.current!.ensureIndexVisible(0);

			event.preventDefault();
		}
	}

	function onBodyScroll(event: BodyScrollEvent) {
		if (event.direction === 'vertical' && gridAPI.current && onVerticalScroll) {
			onVerticalScroll(event, {
				firstDisplayedRowIndex: gridAPI.current.getFirstDisplayedRow(),
				lastDisplayedRowIndex: gridAPI.current.getLastDisplayedRow(),
			});
		}
	}

	const columnDefs = [
		...getPinnedColumnDefsFn(data).map(pinnedColumnDef => ({
			lockPosition: true,
			pinned: 'left',
			minWidth: columnMinWidth,
			valueGetter: getCellValueFn,
			width: CELL_WIDTH,
			headerComponent: pinHeaderRenderer,
			...pinnedColumnDef,
		})),
		...getColumnDefsFn(data).map(columnDef => ({
			lockPinned: true,
			minWidth: columnMinWidth,
			valueGetter: getCellValueFn,
			width: CELL_WIDTH,
			resizable: enableColResize,
			cellRenderer,
			headerComponent: headerRenderer,
			...columnDef,
			cellRendererParams: {
				avroRenderer: {
					intCellRenderer: DefaultIntCellRenderer,
					stringCellRenderer: DefaultRenderer,
					...avroRenderer,
				},
				...columnDef.cellRendererParams,
			},
			headerComponentParams: {
				onFocusedColumn,
				onKeyDownHeaderColumn,
				...columnDef.headerComponentParams,
			},
		})),
	];

	function onGridReady({ api }: GridReadyEvent) {
		gridAPI.current = api;
		if (focusedColumnId && focusedColumnId !== currentColId) {
			onFocusedColumn(focusedColumnId);
		}
	}

	useEffect(() => {
		if (!loading && gridAPI.current && focusedColumnId !== currentColId) {
			onFocusedColumn(focusedColumnId);
		}
	}, [loading, focusedColumnId]);

	return (
		<div
			className={classNames(theme['td-grid'], {
				[theme['td-grid--loading']]: loading,
			})}
			ref={containerRef}
		>
			{loading ? (
				<div className={theme['td-grid-loader']}>
					<Icon name="talend-table" />
				</div>
			) : (
				<AgGridReact
					deltaRowDataMode
					headerHeight={HEADER_HEIGHT}
					rowHeight={ROW_HEIGHT}
					onGridReady={onGridReady}
					suppressDragLeaveHidesColumns
					suppressPropertyNamesCheck
					tabToNextCell={handleKeyboard}
					navigateToNextCell={handleKeyboard}
					onCellFocused={onFocusedCell}
					getRowNodeId={data => data[rowNodeIdentifier]}
					onViewportChanged={updateStyleFocusColumn}
					onVirtualColumnsChanged={updateStyleFocusColumn}
					rowData={getRowDataFn ? getRowDataFn(data, startIndex) : props.rowData}
					onBodyScroll={onVerticalScroll ? onBodyScroll : undefined}
					columnDefs={columnDefs}
					rowSelection="vertical"
					{...props}
				/>
			)}
		</div>
	);
}
