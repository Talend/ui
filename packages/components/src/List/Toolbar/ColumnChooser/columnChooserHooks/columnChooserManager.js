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

function useColumnChooserManager(columns, submitChanges) {
	const [editedColumns, setEditedColumns] = useState({ editedColumns: cloneDeep(columns) });

	function sortEditedColumns() {
		// TODO rwk this func
		setEditedColumns(prevState => {
			return {
				editedColumns: prevState.editedColumns.sort(compareOrder).map((col, index) => {
					return { ...col, order: index + 1 };
				}),
			};
		});
	}

	function submitColumns(event) {
		submitChanges(event, editedColumns);
	}

	function changeColumnVisibility(index) {
		return function changeVisiblity(value) {
			setEditedColumns(prevState => {
				const inEditColumns = prevState.editedColumns;
				inEditColumns[index].hidden = value;
				return { editedColumns: inEditColumns };
			});
		};
	}

	function changeColumnOrder(index) {
		return function changeOrder(value) {
			setEditedColumns(prevState => {
				const inEditColumns = prevState.editedColumns;
				inEditColumns[index].order = value;
				return { editedColumns: inEditColumns };
			});
		};
	}

	function onDragAndDrop() {
		// TODO rwk this func
		sortEditedColumns();
	}

	return {
		editedColumns: editedColumns.editedColumns,
		submitColumns,
		changeColumnOrder,
		changeColumnVisibility,
		onDragAndDrop,
	};
}

export { useColumnChooserManager };
