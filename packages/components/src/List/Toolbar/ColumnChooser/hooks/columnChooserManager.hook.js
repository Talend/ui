import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

export function getOrderItem(order, index, length) {
	if (index === length - 1) {
		return order - 1;
	}
	return order + 1;
}

export function matchOrder(value) {
	return function match({ order }) {
		return order === value;
	};
}

export function incrementColumnOrder(column, index) {
	column.order = index + 1; // eslint-disable-line
}

export function organiseEditedColumns(collection) {
	collection.sort(compareOrder).forEach(incrementColumnOrder);
	return collection;
}

export function changeColumnAttribute(key) {
	return function setAttribut(value, index) {
		if (index) {
			return function setColumnInCollection(collection) {
				collection[index][key] = value; // eslint-disable-line
				return collection;
			};
		}
		return function setColumn(column) {
			column[key] = value; // eslint-disable-line
		};
	};
}

export function updateEditedColumns(editedColumns) {
	return function updateState(state) {
		return {
			...state,
			editedColumns,
		};
	};
}

const updateAttributeVisiblity = changeColumnAttribute('hidden');
const updateAttributeOrder = changeColumnAttribute('order');

export function useColumnChooserManager(columns, customSubmit) {
	const [state, setState] = useState({
		editedColumns: organiseEditedColumns(cloneDeep(columns)),
		selectAll: false,
	});

	function getEditedColumnsLength() {
		return state.editedColumns.length;
	}

	function modifyOrderTwoItems(value, index) {
		const indexCToReplace = state.editedColumns.findIndex(matchOrder(value));
		const orderToReplace = getOrderItem(value, indexCToReplace, getEditedColumnsLength());
		if (indexCToReplace > -1 && !state.editedColumns[indexCToReplace].locked) {
			flow([
				updateAttributeOrder(orderToReplace, indexCToReplace),
				updateAttributeOrder(value, index),
				organiseEditedColumns,
				updateEditedColumns,
				setState,
			])(state.editedColumns);
		}
	}

	function onChangeVisibility(index) {
		return function changeVisiblity(event, value) {
			flow([updateAttributeVisiblity(value, index), updateEditedColumns, setState])(
				state.editedColumns,
			);
		};
	}

	function onBlurInputTextOrder(index) {
		return function onBlur(event, value) {
			modifyOrderTwoItems(value, index);
		};
	}

	function onKeyPressInputTextOrder(index) {
		return function onKeyPress(event, value) {
			modifyOrderTwoItems(value, index);
		};
	}

	function onDragAndDrop(index) {
		return function dragAndDrop(targetColumn) {
			modifyOrderTwoItems(targetColumn.order, index);
		};
	}

	function onSelectAll(value) {
		const editedColumns = state.editedColumns;
		editedColumns.forEach(updateAttributeVisiblity(value));
		setState({ ...state, editedColumns, selectAll: value });
	}

	function onSubmitColumnChooser(event) {
		customSubmit(event, { ...state, editedColumns: cloneDeep(state.editedColumns) });
	}

	return {
		onBlurInputTextOrder,
		onChangeVisibility,
		onDragAndDrop,
		onKeyPressInputTextOrder,
		onSelectAll,
		onSubmitColumnChooser,
		stateColumnChooser: Object.freeze(state),
	};
}
