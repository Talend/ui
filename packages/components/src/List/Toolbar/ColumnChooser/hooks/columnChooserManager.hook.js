import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { compareOrder } from '../service';

export function organiseColumns(columns) {
	return columns.sort(compareOrder).map((column, index) => {
		return { ...column, order: index + 1 };
	});
}

export function updateEditedColumns(state) {
	return { ...state, editedColumns: organiseColumns(state.editedColumns) };
}

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

export function changeColumnAttribute(key) {
	return function setAttribut(value, index) {
		return function setColumn(state) {
			const newColumns = state.editedColumns;
			newColumns[index][key] = value;
			return { ...state, editedColumns: newColumns };
		};
	};
}

const updateAttributeVisiblity = changeColumnAttribute('hidden');
const updateAttributeOrder = changeColumnAttribute('order');

export function useColumnChooserManager(columns, customSubmit) {
	const [state, setState] = useState({
		editedColumns: organiseColumns(columns),
		selectAll: false,
	});

	function getEditedColumnsLength() {
		return state.editedColumns.length;
	}

	function getValueFormated(value) {
		const parseValue = parseInt(value, 10);
		if (isValueCorrect(parseValue, getEditedColumnsLength())) {
			return parseValue;
		}
		throw Error(`ColumnChooserManager: Bad order number ${value}`);
	}

	function modifyOrderTwoItems(value, index) {
		const indexColToReplace = state.editedColumns.findIndex(matchOrder(value));
		if (indexColToReplace > -1 && !state.editedColumns[indexColToReplace].locked) {
			setState(
				updateAttributeOrder(
					getOrderItem(value, indexColToReplace, getEditedColumnsLength()),
					indexColToReplace,
				),
			);
			setState(updateAttributeOrder(value, index));
			setState(updateEditedColumns);
		}
	}

	function handlerChangeVisibility(index) {
		return function changeVisiblity(value) {
			setState(updateAttributeVisiblity(value, index));
		};
	}

	function handlerChangeOrder(index) {
		return function changeOrder(value) {
			setState(updateAttributeOrder(value, index));
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
					return { ...column, hidden: value };
				}),
				selectAll: value,
			};
		});
	}

	function submitColumnChooser(event) {
		const editedColumns = cloneDeep(state.editedColumns);
		customSubmit(event, { ...state, editedColumns });
	}

	return {
		handlerBlurInputTextOrder,
		handlerChangeOrder,
		handlerDragAndDrop,
		handlerInputTextOrder,
		handlerSelectAll,
		handlerChangeVisibility,
		stateColumnChooser: Object.freeze(state),
		submitColumnChooser,
	};
}
