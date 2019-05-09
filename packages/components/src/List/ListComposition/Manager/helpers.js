/**
 * Generic sorting function for an array of items
 * @param {array} collection
 * @param {object} sortParams
 * @param {string} sortParams.sortBy Field to use to sort items
 * @param {boolean} sortParams.isDescending Sorting direction
 * @returns {array}
 */
export function sortCollection(collection, sortParams = {}) {
	const { sortBy, isDescending } = sortParams;

	if (!sortBy) {
		return collection;
	}

	const direction = isDescending ? -1 : 1;

	return collection.sort((a, b) => {
		const valueA = a[sortBy];
		const valueB = b[sortBy];

		const result =
			isNaN(valueA) || isNaN(valueB)
				? valueA.toString().localeCompare(valueB.toString())
				: valueA - valueB;

		return result * direction;
	});
}

export default { sortCollection };
