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

const updateAttributeVisiblity = changeColumnAttribute('hidden');
const updateAttributeOrder = changeColumnAttribute('order');

export function useColumnChooserManager(columns, submitChanges) {
	const [state, setState] = useState({
		editedColumns: organiseColumns(columns),
	});

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

	function onBlurColumnOrder(index) {
		return function onBlur(value) {
			const parseValue = parseInt(value, 10);
			if (Number.isInteger(parseValue) && state.editedColumns[index].order !== parseValue) {
				const indexColToReplace = state.editedColumns.findIndex(col => col.order === parseValue);
				if (indexColToReplace > -1) {
					if (indexColToReplace === state.editedColumns.length - 1) {
						setState(updateAttributeOrder(parseValue - 1, indexColToReplace));
					} else {
						setState(updateAttributeOrder(parseValue + 1, indexColToReplace));
					}
				}
				setState(updateAttributeOrder(parseValue, index));
				setState(prevState => {
					return { ...prevState, editedColumns: organiseColumns(prevState.editedColumns) };
				});
			}
		};
	}

	function onDragAndDrop(sourceColumn, targetColumn) {
		const order = targetColumn.order;
		setState(updateAttributeOrder(order, sourceColumn.index));
		setState(updateAttributeOrder(order + 1, targetColumn.index));
		setState(prevState => {
			return { ...prevState, editedColumns: organiseColumns(prevState.editedColumns) };
		});
	}

	return {
		changeColumnOrder,
		changeColumnVisibility,
		onDragAndDrop,
		onBlurColumnOrder,
		stateColumnChooser: Object.freeze(state),
		submitColumns,
	};
}
