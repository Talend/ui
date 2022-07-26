import React from 'react';

import { Column, GridApi, NavigateToNextCellParams, TabToNextCellParams } from 'ag-grid-community';

import { SELECTED_CELL_CLASS_NAME } from '../../constants';

/**
 * Ag-grid keyboard navigation sets focus state, not selection
 */
export function handleKeyboard({
	nextCellPosition,
	previousCellPosition,
	api,
}: TabToNextCellParams | NavigateToNextCellParams) {
	if (nextCellPosition && previousCellPosition.rowIndex !== nextCellPosition.rowIndex) {
		const row = api.getDisplayedRowAtIndex(nextCellPosition.rowIndex);
		row?.setSelected(true, true);
	}

	return nextCellPosition;
}

/**
 * Handle ctrl/shift keys when clicking on header cell
 */
export function handleMultiSelection(
	colId: string,
	allColumns: string[],
	selected: string[],
	modifiers: Pick<React.MouseEvent, 'shiftKey' | 'metaKey' | 'ctrlKey'> | null,
) {
	const { ctrlKey, metaKey, shiftKey } = modifiers ?? {};
	if (ctrlKey || metaKey) {
		return selected.includes(colId) ? selected.filter(col => col !== colId) : [...selected, colId];
	} else if (shiftKey) {
		const selectedIndexes = [...selected, colId].map(id => allColumns.indexOf(id));
		return allColumns.slice(Math.min(...selectedIndexes), Math.max(...selectedIndexes) + 1);
	}
	return [colId];
}

/**
 * Refresh header style hack
 */
export function refreshHeader(
	gridApi: GridApi | undefined,
	selection: string[],
	prevSelection: string[],
) {
	const eGridDiv = gridApi?.['gridOptionsWrapper'].eGridDiv as HTMLDivElement; // eslint-disable-line
	// BEGIN QUICKFIX: Would be better to use gridRef.current?.api.refreshHeader() but it has a weird flicker
	[...selection, ...prevSelection].forEach(colId => {
		eGridDiv
			?.querySelector(`.ag-header-cell[col-id='${colId}']`)
			?.classList.toggle(SELECTED_CELL_CLASS_NAME, selection.includes(colId));
	});
	// END QUICKFIX
}

/**
 * Return column sizes saved in local storage
 */
export function getColumnSizes(localStorageKey?: string) {
	try {
		const sizesStr = localStorageKey ? localStorage.getItem(localStorageKey) : null;
		if (sizesStr) {
			return JSON.parse(sizesStr);
		}
	} catch (e) {
		console.error('local storage seems corrupted', e);
	}
	return null;
}

/*
 * Save column size to local storage
 */
export function saveColumnSizes(localStorageKey: string, columns: Column[] | null) {
	if (columns) {
		const sizes = columns.map(col => [col.getColId(), col.getActualWidth()]);
		localStorage.setItem(localStorageKey, JSON.stringify(Object.fromEntries(sizes)));
	}
}