import React, { useState, useEffect } from 'react';

function useColumnChooserManager(columns, submitChanges) {
	const [getEditedColumns, setEditedColumns] = useState({ editedColumns: columns });

	function submitColumns(event) {
		submitChanges(event, getEditedColumns);
	}

	function changeColumnVisibility(index, value) {
		setEditedColumns(prevState => {
			const editedColumns = prevState.editedColumns;
			editedColumns[index].hidden = value;
			return { editedColumns };
		});
	}

	function changeColumnOrder(index, value) {
		setEditedColumns(prevState => {
			const editedColumns = prevState.editedColumns;
			editedColumns[index].order = value;
			return { editedColumns };
		});
	}
	return {
		submitColumns,
		changeColumnOrder,
		changeColumnVisibility,
	};
}

export useColumnChooserManager;
