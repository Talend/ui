function findMatchingIemLabel(label) {
	return function find(item) {
		return item.label === label;
	};
}

function transformCollection(columnChooserCollection) {
	return function transform(item) {
		const itemToMerged = columnChooserCollection.find(findMatchingIemLabel(item.label));
		if (itemToMerged) {
			return {
				...item,
				...itemToMerged,
			};
		}
		return item;
	};
}

/**
 * Merged the columns chooser collection into the columns list.
 * @param {array} originalCollection
 * @param {arrayOf(ColumnChooserPropTypes)} columnChooserCollection
 */
export function mergedColumnsChooser(originalCollection, columnChooserCollection = []) {
	if (columnChooserCollection.length > 0) {
		return originalCollection.map(transformCollection(columnChooserCollection));
	}
	return originalCollection;
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
