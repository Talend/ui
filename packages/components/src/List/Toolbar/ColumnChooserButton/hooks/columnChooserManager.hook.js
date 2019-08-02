import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

const isItemHidden = item => item.hidden;

const isAnyItemHidden = items => {
	const hiddenItems = items.filter(isItemHidden);
	if (hiddenItems) {
		return hiddenItems.length === items.length;
	}
	return true;
};

export const getColumn = index => columns => columns[index];

// eslint-disable-next-line
export const setColumn = (column, index) => columns => (columns[index] = column);

const orderColumns = columns => {
	columns.sort(compareOrder).forEach((item, index) => {
		// eslint-disable-next-line no-param-reassign
		item.order = index + 1;
	});
	return columns;
};

export const changeColumnChooserAttribute = key => value => column => {
	if (!column.locked) {
		return { ...column, [key]: value };
	}
	return column;
};

const updateAttributeVisibility = changeColumnChooserAttribute('hidden');

const extractColumnValues = column => ({
	hidden: column.hidden,
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

const prepareColumns = (columns, lockedLeftItems) =>
	columns.map((column, index) =>
		flow([extractColumnValues, setColumnHidden, setColumnLocked(lockedLeftItems, index)])(column),
	);

const updateColumnAttribute = (index, value, fn) => flow([getColumn(index), fn(value)]);

/**
 * Manage the state of each row representing a column for the ColumnChooser overlay.
 * @param {array} initColumns
 * @param {number} nbLockedLeftItems
 */
export const useColumnChooserManager = (initColumns = [], nbLockedLeftItems = 0) => {
	const columnsChooser = prepareColumns(initColumns, nbLockedLeftItems);
	const [state, setState] = useState({
		columns: orderColumns(columnsChooser),
		selectAll: isAnyItemHidden(columnsChooser),
	});

	const updateState = (columns, selectAll) => {
		setState({
			columns,
			selectAll: selectAll || isAnyItemHidden(columns),
		});
	};

	const onChangeVisibility = index => value => {
		const columnUpdated = updateColumnAttribute(index, value, updateAttributeVisibility)(
			state.columns,
		);
		setColumn(columnUpdated, index)(state.columns);
		updateState(state.columns);
	};

	const onSelectAll = value => {
		updateState(state.columns.map(updateAttributeVisibility(!value)), value);
	};

	return {
		onChangeVisibility,
		onSelectAll,
		columnsChooser: cloneDeep(state.columns),
		selectAll: state.selectAll,
	};
};
