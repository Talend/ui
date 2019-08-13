const hasLabel = label => item => item.label === label;

const mergeWithCollection = collection => originalItem => {
	const itemToMerge = collection.find(hasLabel(originalItem.label));
	if (itemToMerge) {
		return {
			...originalItem,
			...itemToMerge,
		};
	}
	return originalItem;
};

/**
 * Merged the columns chooser collection into the columns list.
 * @param {array} originalCollection
 * @param {arrayOf(ColumnChooserPropTypes)} columnChooserCollection
 */
export function mergeWithColumnChooserCollection(originalCollection, columnChooserCollection = []) {
	if (columnChooserCollection.length > 0) {
		return originalCollection.map(mergeWithCollection(columnChooserCollection));
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
