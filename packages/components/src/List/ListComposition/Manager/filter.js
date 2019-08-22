/**
 * Basic text filtering method over an array of objects.
 * Properties compared as string, case insensitive.
 * @param {array} collection
 * @param {string} text
 * @returns {array}
 */
import isNil from 'lodash/isNil';

export function filterCollectionByText(collection, text) {
	if (!text) {
		return collection;
	}

	const searchedText = text.toLowerCase();
	const EMPTY_STRING = '';

	return collection.filter(item =>
		Object.values(item).find(value =>
			(isNil(value) ? EMPTY_STRING : value)
				.toString()
				.toLowerCase()
				.includes(searchedText),
		),
	);
}

export default { filterCollectionByText };
