import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

// export function isValueCorrect(value, collectionLength) {
// 	return Number.isInteger(value) && (value <= collectionLength && value > 0);
// }

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
	// return { ...column, order: index + 1 };
	column.order = index + 1;
}

export function organiseEditedColumns(collection) {
	collection.sort(compareOrder).forEach(incrementColumnOrder);
	return collection;
}

export function changeColumnAttribute(key) {
	return function setAttribut(value, index) {
		return function setColumn(collection) {
			collection[index][key] = value; // eslint-disable-line
			return collection;
		};
	};
}

export function updateEditedColumns(editedColumns) {
	return function updateState(state) {
		console.log({ editedColumns });
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
