/**
 * Basic text filtering method over an array of objects.
 * Properties compared as string, case insensitive.
 * @param {array} collection
 * @param {string} text
 * @returns {array}
 */
export function filterCollectionByText(collection, text) {
	if (!text) {
		return collection;
	}

	const searchedText = text.toLowerCase();

	return collection.filter(item =>
		Object.values(item).find(value =>
			value
				.toString()
				.toLowerCase()
				.includes(searchedText),
		),
	);
}

export default { filterCollectionByText };
