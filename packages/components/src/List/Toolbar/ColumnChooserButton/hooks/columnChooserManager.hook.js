import { useState } from 'react';
import flow from 'lodash/flow';
import cloneDeep from 'lodash/cloneDeep';
import { compareOrder } from '../service';

const isItemVisible = item => item.visible;

const isAnyItemVisible = items => {
	const visibleItems = items.filter(isItemVisible);
	if (visibleItems) {
		return visibleItems.length === items.length;
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

const setColumnLocked = (lockedLeftItems, index) => column => {
	if (index < lockedLeftItems) {
		return { ...column, locked: true };
	}
	return column;
};

const setColumnHidden = column => {
	if (column.hidden === undefined) {
		return { ...column, hidden: false };
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
		flow([extractColumnValues, setColumnHidden, setColumnLocked(lockedLeftItems, index)])(column),
	);

export const changeColumnChooserAttribute = key => value => column => {
	if (!column.locked) {
		return { ...column, [key]: value };
	}
	return column;
};

const updateAttributeVisibility = changeColumnChooserAttribute('visible');

/**
 * Manage the state of each row representing a column for the ColumnChooser overlay.
 * @param {array} initColumns
 * @param {number} nbLockedLeftItems
 */
export const useColumnChooserManager = (initColumns = [], nbLockedLeftItems = 0) => {
	const columnsChooser = prepareColumns(initColumns, nbLockedLeftItems);
	const [state, setState] = useState({
		columns: orderColumns(columnsChooser),
		selectAll: isAnyItemVisible(columnsChooser),
	});

	const updateState = (columns, selectAll) => {
		setState({
			columns,
			selectAll: selectAll || isAnyItemVisible(columns),
		});
	};

	const onChangeVisibility = label => value => {
		const columnUpdated = flow([getColumn(label), updateAttributeVisibility(value)])(state.columns);
		setColumn(columnUpdated, label)(state.columns);
		updateState(state.columns);
	};

	const onSelectAll = value => {
		updateState(state.columns.map(updateAttributeVisibility(value)), value);
	};

	return {
		onChangeVisibility,
		onSelectAll,
		columnsChooser: cloneDeep(state.columns),
		selectAll: state.selectAll,
	};
};
