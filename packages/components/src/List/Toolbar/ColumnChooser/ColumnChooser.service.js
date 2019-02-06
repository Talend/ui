export function findMatchingColumnLabel(label) {
	return function find(column) {
		return column.label === label;
	};
}

export function transformColumns(columnsToMerged) {
	return function transform(column) {
		const columnToMerged = columnsToMerged.find(findMatchingColumnLabel(column.label));
		if (columnToMerged) {
			return {
				...column,
				...columnToMerged,
			};
		}
		return column;
	};
}

export function mergedColumns(columns, columnsToMerged) {
	return columns.map(transformColumns(columnsToMerged));
}

export function mergedColumnChooser(originalColumns, columnChooserColumns) {
	if (columnChooserColumns.length > 0) {
		return mergedColumns(originalColumns, columnChooserColumns);
	}
	return originalColumns;
}
