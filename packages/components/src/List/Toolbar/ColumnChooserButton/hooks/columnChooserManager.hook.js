import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

const isItemHiddenOrLocked = item => !item.hidden || item.locked;

const isAnyItemHidden = items => {
	const hiddenItems = items.filter(isItemHiddenOrLocked);
	if (hiddenItems) {
		return hiddenItems.length === items.length;
	}
	return false;
};

export const getColumn = index => collection => collection[index];

// eslint-disable-next-line
export const setColumn = (column, index) => collection => (collection[index] = column);

const updateColumns = editedColumns => state => ({
	...state,
	editedColumns,
});

const orderColumns = collection => {
	collection.sort(compareOrder).forEach((item, index) => {
		// eslint-disable-next-line no-param-reassign
		item.order = index + 1;
	});
	return collection;
};

export const changeColumnChooserAttribute = key => value => column => {
	if (!column.locked) {
		return { ...column, [key]: value };
	}
	return column;
};

const updateAttributeVisibility = changeColumnChooserAttribute('hidden');

const extractColumnValues = item => ({
	label: item.label,
	order: item.order,
	hidden: item.hidden,
});

const setItemsLocked = (items, lockedLeftItems) =>
	items.map((item, it) => {
		if (it < lockedLeftItems) {
			return { ...extractColumnValues(item), locked: true };
		}
		return extractColumnValues(item);
	});

const updateColumnAttribute = (index, value, fn) => flow([getColumn(index), fn(value)]);
const updateCollectionColumn = (index, column) => flow([setColumn(column, index), updateColumns]);

/**
 * Manage the state of each row representing a column for the ColumnChooser overlay.
 * @param {array} initColumns
 * @param {number} nbLockedLeftItems
 */
export const useColumnChooserManager = (initColumns = [], nbLockedLeftItems = 0) => {
	const columnsWithLocked = setItemsLocked(initColumns, nbLockedLeftItems);
	const [state, setState] = useState({
		columns: orderColumns(columnsWithLocked),
		selectAll: isAnyItemHidden(columnsWithLocked),
	});

	const onChangeVisibility = index => value => {
		const columnUpdated = updateColumnAttribute(index, value, updateAttributeVisibility)(
			state.columns,
		);
		const collectionUpdated = updateCollectionColumn(index, columnUpdated)(state.columns);
		setState(collectionUpdated);
	};

	const onSelectAll = value => {
		setState({
			...state,
			columns: state.columns.map(updateAttributeVisibility(!value)),
			selectAll: value,
		});
	};

	return {
		onChangeVisibility,
		onSelectAll,
		columnsChooser: cloneDeep(state.columns),
		selectAll: state.selectAll,
	};
};
