import { useCallback, useState } from 'react';
import isNil from 'lodash/isNil';

/**
 * By default, filter is case insensitive and without accents
 * @param value Raw cell value
 * @param textFilter User input using for filtering
 * @returns {boolean} if input matches cell content
 */
function defaultFilterFunction(value, textFilter) {
	const filteredValue = isNil(value) ? '' : value;
	return (
		filteredValue
			.toString()
			.toLocaleLowerCase()
			// @see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/37511463#37511463
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.includes(textFilter)
	);
}

export function filter(collection, textFilter, filterFunctions) {
	if (!textFilter) {
		return collection;
	}

	const lowerTextFilter = textFilter.toLocaleLowerCase();
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			const filterFunction = filterFunctions[key] || defaultFilterFunction;
			return filterFunction(value, lowerTextFilter);
		}),
	);
}

export const filterCollection = (textFilter, filterFunctions = {}) => (collection = []) =>
	useCallback(filter(collection, textFilter, filterFunctions), [
		collection,
		textFilter,
		filterFunctions,
	]);

export const useCollectionFilter = (collection = [], initialTextFilter, filterFunctions = {}) => {
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		filteredCollection: filterCollection(textFilter, filterFunctions)(collection),
		textFilter,
		setTextFilter,
	};
};
