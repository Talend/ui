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

export function useColumnChooserManager(columns, submitChanges) {
	const [stateColumnChooser, setStateColumnChooser] = useState({
		editedColumns: organiseColumns(columns),
	});

	function submitColumns(event) {
		const editedColumns = cloneDeep(stateColumnChooser.editedColumns);
		submitChanges(event, { ...stateColumnChooser, editedColumns });
	}

	function changeColumnVisibility(index) {
		return function changeVisiblity(value) {
			setStateColumnChooser(prevState => {
				const editingColumns = prevState.editedColumns;
				editingColumns[index].hidden = value;
				return { editedColumns: editingColumns };
			});
		};
	}

	function changeColumnOrder(index) {
		return function changeOrder(value) {
			setStateColumnChooser(prevState => {
				const editingColumns = prevState.editedColumns;
				editingColumns[index].order = value;
				return { editedColumns: editingColumns };
			});
		};
	}

	function onDragAndDrop(sourceColumn, targetColumn) {
		const order = targetColumn.order;
		sourceColumn.onChangeOrder(order);
		targetColumn.onChangeOrder(order + 1);
		setStateColumnChooser(prevState => {
			return { editedColumns: organiseColumns(prevState.editedColumns) };
		});
	}

	return {
		changeColumnOrder,
		changeColumnVisibility,
		onDragAndDrop,
		stateColumnChooser,
		submitColumns,
	};
}
