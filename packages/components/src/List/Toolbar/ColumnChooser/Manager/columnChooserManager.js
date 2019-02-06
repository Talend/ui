import { useState } from 'react';

function useColumnChooserManager(columns, submitChanges) {
	const [editedColumns, setEditedColumns] = useState({ editedColumns: columns });

	function submitColumns(event) {
		submitChanges(event, editedColumns);
	}

	function changeColumnVisibility(index, value) {
		setEditedColumns(prevState => {
			const inEditColumns = prevState.editedColumns;
			inEditColumns[index].hidden = value;
			return { editedColumns: inEditColumns };
		});
	}

	function changeColumnOrder(index, value) {
		setEditedColumns(prevState => {
			const inEditColumns = prevState.editedColumns;
			inEditColumns[index].order = value;
			return { editedColumns: inEditColumns };
		});
	}

	return {
		submitColumns,
		changeColumnOrder,
		changeColumnVisibility,
	};
}

export { useColumnChooserManager };
