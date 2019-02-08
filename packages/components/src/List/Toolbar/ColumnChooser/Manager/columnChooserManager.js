import { useState } from 'react';

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
	const [editedColumns, setEditedColumns] = useState({ editedColumns: columns });

	function sortEditedColumns() {
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
		console.log('onDragAndDrop');
		sortEditedColumns();
		/*
		 = order / + 1 order
		*/
		// const dropInIndex = editedColumns.findIndex(column => column.label === dropIn.label);
		// const dropOnIndex = editedColumns.findIndex(column => column.label === dropOn.label);
		// const arrayTmp = editedColumns.editedColumns;
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
