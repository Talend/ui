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

export function filter(collection, textFilter, filterFunctions, visibleColumns, filteredColumns) {
	if (!textFilter) {
		return collection;
	}

	const normalizedTextFilter = normalizeInput(textFilter);
	return collection.filter(item =>
		Object.entries(item)
			.filter(([key]) => {
				if (visibleColumns && Array.isArray(visibleColumns)) return visibleColumns.includes(key);
				if (filteredColumns && Array.isArray(filteredColumns)) return filteredColumns.includes(key);
				return true;
			})
			.find(([key, value]) => {
				if (filterFunctions[key]) {
					return filterFunctions[key](value, textFilter);
				}
				return defaultFilterFunction(value, normalizedTextFilter);
			}),
	);
}

export const filterCollection = (
	textFilter,
	filterFunctions = {},
	visibleColumns,
	filteredColumns,
) => (collection = []) =>
	useCallback(filter(collection, textFilter, filterFunctions, visibleColumns, filteredColumns), [
		collection,
		textFilter,
		filterFunctions,
		visibleColumns,
		filteredColumns,
	]);

export const useCollectionFilter = (
	collection = [],
	initialTextFilter,
	filterFunctions = {},
	initialVisibleColumns,
	initialFilteredColumns,
) => {
	const [filteredColumns, setFilteredColumns] = useState(initialFilteredColumns);
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		filteredCollection: filterCollection(
			textFilter,
			filterFunctions,
			initialVisibleColumns,
			filteredColumns,
		)(collection),
		filteredColumns,
		textFilter,
		setFilteredColumns,
		setTextFilter,
	};
};
