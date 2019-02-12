import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

export function compareOrder(a, b) {
	if (!Number.isInteger(a.order) && !Number.isInteger(b.order)) {
		return 0;
	}
	if (Number.isInteger(a.order) && !Number.isInteger(b.order)) {
		return -1;
	}
	if (!Number.isInteger(a.order) && Number.isInteger(b.order)) {
		return 1;
	}
	return a.order - b.order;
}

export function organiseColumns(columns) {
	return columns.sort(compareOrder).map((column, index) => {
		return { ...column, order: index + 1 };
	});
}

function changeColumnAttribute(key) {
	return function setAttribut(value, index) {
		return function setColumn(state) {
			const newColumns = state.editedColumns;
			newColumns[index][key] = value;
			return { ...state, editedColumns: newColumns };
		};
	};
}

function updateEditedColumns(state) {
	return { ...state, editedColumns: organiseColumns(state.editedColumns) };
}

function isValueCorrect(value, collectionLength) {
	return Number.isInteger(value) && value <= collectionLength;
}

function getOrderLastItem(order, index, length) {
	if (index === length - 1) {
		return order - 1;
	}
	return order + 1;
}

function matchOrder(value) {
	return function match({ order }) {
		return order === value;
	};
}

const updateAttributeVisiblity = changeColumnAttribute('hidden');
const updateAttributeOrder = changeColumnAttribute('order');

export function useColumnChooserManager(columns, submitChanges) {
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
		/*
			Add some error or warning ?
		*/
		throw Error(`ColumnChooserManager: Bad order number ${value}`);
	}

	function submitColumns(event) {
		const editedColumns = cloneDeep(state.editedColumns);
		submitChanges(event, { ...state, editedColumns });
	}

	function changeColumnVisibility(index) {
		return function changeVisiblity(value) {
			setState(updateAttributeVisiblity(value, index));
		};
	}

	function changeColumnOrder(index) {
		return function changeOrder(value) {
			setState(updateAttributeOrder(value, index));
		};
	}

	function modifyOrderTwoItems(value, index) {
		const indexColToReplace = state.editedColumns.findIndex(matchOrder(value));
		if (indexColToReplace > -1 && !state.editedColumns[indexColToReplace].locked) {
			setState(
				updateAttributeOrder(
					getOrderLastItem(value, indexColToReplace, getEditedColumnsLength()),
					indexColToReplace,
				),
			);
			setState(updateAttributeOrder(value, index));
			setState(updateEditedColumns);
		}
	}

	function handlerInputOrder(index) {
		return function inputOrder(event, value) {
			let parseValue;
			try {
				parseValue = getValueFormated(value);
			} catch (exception) {
				return;
			}
			if (event.key === 'Enter') {
				modifyOrderTwoItems(parseValue, index);
			}
		};
	}

	function onBlurColumnOrder(index) {
		return function onBlur(value) {
			let parseValue;
			try {
				parseValue = getValueFormated(value);
			} catch (exception) {
				return;
			}
			if (state.editedColumns[index].order !== parseValue) {
				modifyOrderTwoItems(parseValue, index);
			}
		};
	}

	function selectAll(value) {
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

	function onDragAndDrop(sourceColumn, targetColumn) {
		const order = targetColumn.order;
		setState(updateAttributeOrder(order, sourceColumn.index));
		setState(
			updateAttributeOrder(
				getOrderLastItem(order, targetColumn.index, getEditedColumnsLength()),
				targetColumn.index,
			),
		);
		setState(updateEditedColumns);
	}

	return {
		changeColumnOrder,
		changeColumnVisibility,
		handlerInputOrder,
		onBlurColumnOrder,
		onDragAndDrop,
		selectAll,
		stateColumnChooser: Object.freeze(state),
		submitColumns,
	};
}
