/**
 * This function allow to return all the indexof string of a given string
 * @param str string to search in
 * @param toSearch value to search
 */
export function allIndexOf(str, toSearch) {
	const indices = [];
	for (let pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
		indices.push(pos);
	}
	return indices;
}

/**
 * This function allow to remove 'duplicates' indexes ( when same character is typed for example
 * : label : "aaaaa" for searched string "aa")
 *
 * @param indexes list of indexes
 * @param search searchCriteria
 */
export function removeDuplicates(indexes, search) {
	const array = [];

	indexes.forEach(matchingIndex => {
		if (array.length === 0) {
			array.push(matchingIndex);
		} else if (matchingIndex >= array[array.length - 1] + search.length) {
			array.push(matchingIndex);
		}
	});

	return array;
}
