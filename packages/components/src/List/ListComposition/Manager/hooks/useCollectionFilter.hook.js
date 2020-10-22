import { useMemo, useState } from 'react';
import isNil from 'lodash/isNil';

function defaultFilterFunction(value, textFilter) {
	const filteredValue = isNil(value) ? '' : value;
	return filteredValue
		.toString()
		.toLowerCase()
		.includes(textFilter);
}

export function filter(collection, textFilter, filterFunctions, visibleColumnsKeys) {
	if (!textFilter) {
		return collection;
	}

	const lowerTextFilter = textFilter.toLowerCase();
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			if (visibleColumnsKeys && Array.isArray(visibleColumnsKeys) && !visibleColumnsKeys.includes(key)) {
				return false;
			}

			const filterFunction = filterFunctions[key] || defaultFilterFunction;
			return filterFunction(value, lowerTextFilter);
		}),
	);
}

export const filterCollection = (textFilter, filterFunctions = {}, visibleColumnsKeys) => (collection = []) =>
	useMemo(() => filter(collection, textFilter, filterFunctions, visibleColumnsKeys), [
		collection,
		textFilter,
		filterFunctions,
		visibleColumnsKeys,
	]);

export const useCollectionFilter = (collection = [], visibleColumnsKeys, initialTextFilter, filterFunctions = {}) => {
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		filteredCollection: filterCollection(textFilter, filterFunctions, visibleColumnsKeys)(collection),
		textFilter,
		setTextFilter,
	};
};
