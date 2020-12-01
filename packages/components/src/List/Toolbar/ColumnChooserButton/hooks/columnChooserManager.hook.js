import { useState, useMemo } from 'react';
import flow from 'lodash/flow';
import cloneDeep from 'lodash/cloneDeep';
import { compareOrder } from '../service';

const isItemVisible = item => item.visible;

/**
 * Helps to change the select all visible status. If all columns are visible, select all is checked.
 * @param {array} columns
 */
const isEveryItemVisible = columns => columns.every(isItemVisible);

const findColumnLabel = label => column => column.label === label;

export const getColumn = label => columns => columns.find(findColumnLabel(label));

export const setColumn = (column, label) => columns => {
	const index = columns.findIndex(findColumnLabel(label));
	// eslint-disable-next-line no-param-reassign
	columns[index] = column;
};

const orderColumns = columns => {
	columns.sort(compareOrder).forEach((item, index) => {
		// eslint-disable-next-line no-param-reassign
		item.order = index + 1;
	});
	return columns;
};

const extractColumnValues = column => ({
	visible: !column.hidden,
	label: column.label,
	order: column.order,
	key: column.key,
});

/**
 * Add the attribute locked to the columns, depending of the value of lockedLeftItems.
 * @param {number} lockedLeftItems
 * @param {number} index
 */
const addColumnLockedAttr = (lockedLeftItems, index) => column => {
	if (index < lockedLeftItems) {
		return { ...column, locked: true };
	}
	return column;
};

/**
 * Set the visible attribute if is missing.
 * @param {object} column
 */
const addMissingVisibleAttr = column => {
	if (column.visible === undefined) {
		return { ...column, visible: false };
	}
	return column;
};

/**
 * Prepare the columns data for the column chooser hook.
 * @param {array} columns
 * @param {number} lockedLeftItems
 */
const prepareColumns = (columns, lockedLeftItems) =>
	columns.map((column, index) =>
		flow([extractColumnValues, addMissingVisibleAttr, addColumnLockedAttr(lockedLeftItems, index)])(
			column,
		),
	);

const changeColumnChooserAttribute = key => value => column => {
	if (!column.locked) {
		return { ...column, [key]: value };
	}
	return column;
};

const updateVisibilityAttr = changeColumnChooserAttribute('visible');

const hasColumnLabel = label => column => column.label.toLowerCase().includes(label.toLowerCase());

const filterColumns = (columns, filter) => columns.filter(hasColumnLabel(filter));

/** *******************************************************************************
 * HOOK ENTRY POINT
 ******************************************************************************** */

/**
 * Manage the state of each row representing a column for the ColumnChooser overlay.
 * @param {array} initColumns
 * @param {number} nbLockedLeftItems
 */
export const useColumnChooserManager = (initialColumns = [], nbLockedLeftItems = 0, initialFilterValue = '') => {
	const [textFilter, setTextFilter] = useState(initialFilterValue);

	const columns = useMemo(
		() => prepareColumns(initialColumns, nbLockedLeftItems),
		[initialColumns, nbLockedLeftItems]
	);

	const visibleColumns = useMemo(
		() => filterColumns(columns, textFilter),
		[columns, textFilter]
	);

	const [state, setState] = useState({
		columns: orderColumns(columns),
		selectAll: isEveryItemVisible(columns),
	});

	const updateState = (updatedColumns, updatedSelectAll) => {
		setState({
			columns: updatedColumns,
			selectAll: updatedSelectAll,
		});
	};
	const onChangeVisibility = (value, label) => {
		const columnUpdated = flow([getColumn(label), updateVisibilityAttr(value)])(state.columns);
		setColumn(columnUpdated, label)(state.columns);
		updateState(state.columns, isEveryItemVisible(state.columns));
	};

	const onSelectAll = value => {
		updateState(state.columns.map(updateVisibilityAttr(value)), value);
	};

	return {
		onChangeVisibility,
		onSelectAll,
		columns: cloneDeep(state.columns),
		visibleColumns,
		selectAll: state.selectAll,
		textFilter,
		setTextFilter,
	};
};
