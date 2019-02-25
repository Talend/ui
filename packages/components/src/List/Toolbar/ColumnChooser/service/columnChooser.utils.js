function findMatchingColumnLabel(label) {
	return function find(column) {
		return column.label === label;
	};
}

function transformColumns(columnsToMerged) {
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

export function mergedColumnsChooser(originalColumns, columnChooserColumns) {
	if (columnChooserColumns.length > 0) {
		return originalColumns.map(transformColumns(columnChooserColumns));
	}
	return originalColumns;
}

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
