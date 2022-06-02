import React from 'react';

import { NavigateToNextCellParams, TabToNextCellParams } from 'ag-grid-community';

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
	allColumns: string[],
	colId: string,
	selected: string[],
	{ ctrlKey, metaKey, shiftKey }: Pick<React.MouseEvent, 'shiftKey' | 'metaKey' | 'ctrlKey'>,
) {
	if (ctrlKey || metaKey) {
		return selected.includes(colId) ? selected.filter(col => col !== colId) : [...selected, colId];
	} else if (shiftKey) {
		const selectedIndexes = [...selected, colId].map(id => allColumns.indexOf(id));
		return allColumns.slice(Math.min(...selectedIndexes), Math.max(...selectedIndexes) + 1);
	}
	return [colId];
}
