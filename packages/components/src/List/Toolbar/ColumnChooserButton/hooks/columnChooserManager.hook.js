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

export const setColumn = (column, index) => collection => {
	const tmp = [...collection];
	tmp[index] = column;
	return tmp;
};

const updateEditedColumns = editedColumns => state => ({
	...state,
	editedColumns,
});

const orderEditedColumns = collection => {
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
		// eslint-disable-next-line no-console
		console.warn(`This item is locked ${item}: use the lockedItems props to lock item`);
		if (it < lockedLeftItems) {
			return { ...extractColumnValues(item), locked: true };
		}
		return extractColumnValues(item);
	});

export const useColumnChooserManager = (columns, submit, nbLockedLeftItems) => {
	const columnsWithLocked = setItemsLocked(columns, nbLockedLeftItems);
	const [state, setState] = useState({
		editedColumns: orderEditedColumns(columnsWithLocked),
		selectAll: isAnyItemHidden(columnsWithLocked),
	});

	const onChangeVisibility = index => value => {
		const column = flow([getColumn, updateAttributeVisibility(value)])(index);
		flow([setColumn(column, index), updateEditedColumns, setState])(state.editedColumns);
	};

	const onSelectAll = value => {
		state.editedColumns.forEach(updateAttributeVisibility(!value));
		setState({
			...state,
			editedColumns: state.editedColumns,
			selectAll: value,
		});
	};

	function onSubmitColumnChooser(event) {
		submit(event, cloneDeep(state.editedColumns));
	}

	return {
		onChangeVisibility,
		onSelectAll,
		onSubmitColumnChooser,
		stateColumnChooser: Object.freeze(state),
	};
};
