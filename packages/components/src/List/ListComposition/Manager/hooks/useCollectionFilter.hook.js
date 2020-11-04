import { useCallback, useState } from 'react';
import isNil from 'lodash/isNil';

function normalizeInput(text) {
	return (
		text
			.toString()
			.toLocaleLowerCase()
			// @see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/37511463#37511463
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
	);
}

/**
 * By default, filter is case insensitive and without accents
 * @param value Raw cell value
 * @param textFilter User input using for filtering
 * @returns {boolean} if input matches cell content
 */
function defaultFilterFunction(value, textFilter) {
	return !isNil(value) && normalizeInput(value).includes(textFilter);
}

export function filter(collection, textFilter, filterFunctions, visibleColumns) {
	if (!textFilter) {
		return collection;
	}

	const normalizedTextFilter = normalizeInput(textFilter);
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			if (visibleColumns && Array.isArray(visibleColumns) && !visibleColumns.includes(key)) {
				return false;
			}

			if (filterFunctions[key]) {
				return filterFunctions[key](value, textFilter);
			}
			return defaultFilterFunction(value, normalizedTextFilter);
		}),
	);
}

export const filterCollection = (textFilter, filterFunctions = {}, visibleColumns) => (collection = []) =>
	useCallback(filter(collection, textFilter, filterFunctions, visibleColumns), [
		collection,
		textFilter,
		filterFunctions,
		visibleColumns,
	]);

export const useCollectionFilter = (
	collection = [],
	initialTextFilter,
	filterFunctions = {},
	visibleColumns,
) => {
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		filteredCollection: filterCollection(textFilter, filterFunctions, visibleColumns)(collection),
		textFilter,
		setTextFilter,
	};
};
