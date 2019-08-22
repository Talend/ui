/**
 * Generic sorting function for an array of items
 * @param {array} collection
 * @param {object} sortParams
 * @param {string} sortParams.sortBy Field to use to sort items
 * @param {boolean} sortParams.isDescending Sorting direction
 * @returns {array}
 */
import isNil from 'lodash/isNil';

export function sortCollection(collection, sortParams = {}) {
	const { sortBy, isDescending } = sortParams;
	const EMPTY_STRING = '';

	if (!sortBy) {
		return collection;
	}

	const direction = isDescending ? -1 : 1;

	return collection.sort((a, b) => {
		const valueA = isNil(a[sortBy]) ? EMPTY_STRING : a[sortBy];
		const valueB = isNil(b[sortBy]) ? EMPTY_STRING : b[sortBy];

		const result =
			isNaN(valueA) || isNaN(valueB)
				? valueA.toString().localeCompare(valueB.toString())
				: valueA - valueB;

		return result * direction;
	});
}

export default { sortCollection };
