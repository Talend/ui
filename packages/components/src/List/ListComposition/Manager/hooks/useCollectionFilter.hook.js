import { useMemo, useState } from 'react';
import isNil from 'lodash/isNil';

function defaultFilterFunction(value, textFilter) {
	const filteredValue = isNil(value) ? '' : value;
	return filteredValue.toString().toLowerCase().includes(textFilter);
}

export function filter(collection, textFilter, filterFunctions, visibleColumns) {
	if (!textFilter) {
		return collection;
	}

	const lowerTextFilter = textFilter.toLowerCase();
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			if (
				visibleColumns &&
				Array.isArray(visibleColumns) &&
				!visibleColumns.includes(key)
			) {
				return false;
			}

			const filterFunction = filterFunctions[key] || defaultFilterFunction;
			return filterFunction(value, lowerTextFilter);
		}),
	);
}

export const filterCollection = (textFilter, filterFunctions = {}, visibleColumns) => (
	collection = [],
) =>
	useMemo(() => filter(collection, textFilter, filterFunctions, visibleColumns), [
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
		filteredCollection: filterCollection(
			textFilter,
			filterFunctions,
			visibleColumns,
		)(collection),
		textFilter,
		setTextFilter,
	};
};
