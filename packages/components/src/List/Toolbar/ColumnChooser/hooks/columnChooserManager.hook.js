import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import invariant from 'invariant';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

export function isValueCorrect(value, collectionLength) {
	return Number.isInteger(value) && (value <= collectionLength || value < 0);
}

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
	return { ...column, order: index + 1 };
}

export function organiseEditedColumns(collection) {
	return collection.sort(compareOrder).map(incrementColumnOrder);
}

export function changeColumnAttribute(key) {
	return function setAttribut(value, index) {
		return function setColumn(collection) {
			const newColumns = collection;
			newColumns[index][key] = value;
			return collection;
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
		editedColumns: organiseEditedColumns(columns),
		selectAll: false,
	});

	function getEditedColumnsLength() {
		return state.editedColumns.length;
	}

	function getValueFormated(value) {
		const checkedValue = isValueCorrect(parseInt(value, 10), getEditedColumnsLength());
		invariant(checkedValue, `ColumnChooserManager, getValueFormated : Bad order number ${value}`);
		return checkedValue;
	}

	function modifyOrderTwoItems(value, index) {
		const indexColToReplace = state.editedColumns.findIndex(matchOrder(value));
		const orderToReplace = getOrderItem(value, indexColToReplace, getEditedColumnsLength());
		if (indexColToReplace > -1 && !state.editedColumns[indexColToReplace].locked) {
			flow([
				updateAttributeOrder(orderToReplace, indexColToReplace),
				updateAttributeOrder(value, index),
				organiseEditedColumns,
				updateEditedColumns,
				setState,
			])(state.editedColumns);
		}
	}

	function handlerChangeVisibility(index) {
		return function changeVisiblity(event, value) {
			flow([updateAttributeVisiblity(value, index), updateEditedColumns, setState])(
				state.editedColumns,
			);
		};
	}

	function handlerInputTextOrder(index) {
		return function inputOrder(event, value) {
			let parseValue;
			try {
				parseValue = getValueFormated(value);
			} catch (exception) {
				return false;
			}
			if (event.key === 'Enter') {
				modifyOrderTwoItems(parseValue, index);
				return true;
			}
			return false;
		};
	}

	function handlerBlurInputTextOrder(index) {
		return function onBlur(event, value) {
			let parseValue;
			try {
				parseValue = getValueFormated(value);
			} catch (exception) {
				return false;
			}
			if (state.editedColumns[index].order !== parseValue) {
				modifyOrderTwoItems(parseValue, index);
			}
			return true;
		};
	}

	function handlerDragAndDrop(index) {
		return function dragAndDrop(targetColumn) {
			modifyOrderTwoItems(targetColumn.order, index);
		};
	}

	function handlerSelectAll(value) {
		setState(prevState => {
			return {
				...prevState,
				editedColumns: prevState.editedColumns.map(column => {
					return { ...column, hidden: column.locked ? false : !value };
				}),
				selectAll: value,
			};
		});
	}

	function submitColumnChooser(event) {
		customSubmit(event, { ...state, editedColumns: cloneDeep(state.editedColumns) });
	}

	return {
		handlerBlurInputTextOrder,
		handlerDragAndDrop,
		handlerInputTextOrder,
		handlerSelectAll,
		handlerChangeVisibility,
		stateColumnChooser: Object.freeze(state),
		submitColumnChooser,
	};
}
