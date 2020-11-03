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

export function filter(collection, textFilter, filterFunctions, filteredColumns, visibleColumns) {
	if (!textFilter) {
		return collection;
	}

	const lowerTextFilter = textFilter.toLocaleLowerCase();
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			if (
				(filteredColumns && Array.isArray(filteredColumns) && !filteredColumns.includes(key)) ||
				(visibleColumns && Array.isArray(visibleColumns) && !visibleColumns.includes(key))
			) {
				return false;
			}

			const filterFunction = filterFunctions[key] || defaultFilterFunction;
			return filterFunction(value, lowerTextFilter);
		}),
	);
}

export const filterCollection = (
	textFilter,
	filterFunctions = {},
	filteredColumns,
	visibleColumns,
) => (collection = []) =>
	useCallback(filter(collection, textFilter, filterFunctions, filteredColumns, visibleColumns), [
		collection,
		textFilter,
		filterFunctions,
		filteredColumns,
		visibleColumns,
	]);

export const useCollectionFilter = (
	collection = [],
	initialTextFilter,
	filterFunctions = {},
	visibleColumns,
) => {
	const [filteredColumns, setFilteredColumns] = useState();
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		filteredCollection: filterCollection(
			textFilter,
			filterFunctions,
			filteredColumns,
			visibleColumns,
		)(collection),
		filteredColumns,
		textFilter,
		setFilteredColumns,
		setTextFilter,
	};
};
