import { useState } from 'react';
import flow from 'lodash/flow';
import cloneDeep from 'lodash/cloneDeep';
import { compareOrder } from '../service';

const isItemVisible = item => item.visible;

/**
 * Helps to change the select all visible status. If all columns are visible, select all is checked.
 * @param {array} columns
 */
const isEveryItemVisible = columns => {
	const visibleItems = columns.filter(isItemVisible);
	if (visibleItems) {
		return visibleItems.length === columns.length;
	}
	return true;
};

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

export const changeColumnChooserAttribute = key => value => column => {
	if (!column.locked) {
		return { ...column, [key]: value };
	}
	return column;
};

const updateVisibilityAttr = changeColumnChooserAttribute('visible');

/** *******************************************************************************
 * HOOK ENTRY POINT
 *********************************************************************************/

/**
 * Manage the state of each row representing a column for the ColumnChooser overlay.
 * @param {array} initColumns
 * @param {number} nbLockedLeftItems
 */
export const useColumnChooserManager = (initColumns = [], nbLockedLeftItems = 0) => {
	const columnsChooser = prepareColumns(initColumns, nbLockedLeftItems);
	const [state, setState] = useState({
		columns: orderColumns(columnsChooser),
		selectAll: isEveryItemVisible(columnsChooser),
	});

	const updateState = (columns, selectAll) => {
		setState({
			columns,
			selectAll: selectAll || isEveryItemVisible(columns),
		});
	};

	const onChangeVisibility = (value, label) => {
		const columnUpdated = flow([getColumn(label), updateVisibilityAttr(value)])(state.columns);
		setColumn(columnUpdated, label)(state.columns);
		updateState(state.columns);
	};

	const onSelectAll = value => {
		updateState(state.columns.map(updateVisibilityAttr(value)), value);
	};

	return {
		onChangeVisibility,
		onSelectAll,
		columnsChooser: cloneDeep(state.columns),
		selectAll: state.selectAll,
	};
};
