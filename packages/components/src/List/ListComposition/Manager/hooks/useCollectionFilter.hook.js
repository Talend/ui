import { useMemo, useState } from 'react';
import isNil from 'lodash/isNil';

function defaultFilterFunction(value, textFilter) {
	const filteredValue = isNil(value) ? '' : value;
	return filteredValue.toString().toLowerCase().includes(textFilter);
}

export function filter(collection, textFilter, filterFunctions, filteredColumns) {
	if (!textFilter) {
		return collection;
	}

	const lowerTextFilter = textFilter.toLowerCase();
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			if (filteredColumns && Array.isArray(filteredColumns) && !filteredColumns.includes(key)) {
				return false;
			}
			const filterFunction = filterFunctions[key] || defaultFilterFunction;
			return filterFunction(value, lowerTextFilter);
		}),
	);
}

export const filterCollection = (textFilter, filterFunctions = {}, filteredColumns) => (
	collection = [],
) =>
	useMemo(() => filter(collection, textFilter, filterFunctions, filteredColumns), [
		collection,
		textFilter,
		filterFunctions,
	]);

export const useCollectionFilter = (
	collection = [],
	initialTextFilter,
	filterFunctions = {},
	initialFilteredColumns,
) => {
	const [filteredColumns, setFilteredColumns] = useState(initialFilteredColumns);
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		filteredCollection: filterCollection(textFilter, filterFunctions, filteredColumns)(collection),
		filteredColumns,
		textFilter,
		setFilteredColumns,
		setTextFilter,
	};
};
