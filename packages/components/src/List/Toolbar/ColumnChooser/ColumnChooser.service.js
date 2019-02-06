export function mergedColumns(columns, columnsToMerged) {
	return columns.map(column => {
		const columnToMerged = columnsToMerged.find(col => col.label === column.label);
		if (columnToMerged) {
			return {
				...column,
				...columnToMerged,
			};
		}
	});
}

export function mergedColumnChooser(originalColumns, columnChooserColumns) {
	if (columnChooserColumns.length > 0) {
		return mergedColumns(originalColumns, columnChooserColumns);
	}
	return originalColumns;
}
