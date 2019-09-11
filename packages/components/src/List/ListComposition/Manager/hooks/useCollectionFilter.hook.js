import { useMemo, useState } from 'react';

function defaultFilterFunction(value = '', textFilter) {
	return value
		.toString()
		.toLowerCase()
		.includes(textFilter);
}

export function filter(collection, textFilter, filterFunctions) {
	if (!textFilter) {
		return collection;
	}

	const lowerTextFilter = textFilter.toLowerCase();
	return collection.filter(item =>
		Object.entries(item).find(([key, value]) => {
			const filterFunction = filterFunctions[key] || defaultFilterFunction;
			return filterFunction(value, lowerTextFilter);
		}),
	);
}

export const useDefaultCollectionFilter = (textFilter, filterFunctions = {}) => (collection = []) =>
	useMemo(() => filter(collection, textFilter, filterFunctions), [
		collection,
		textFilter,
		filterFunctions,
	]);

export const useCollectionFilter = (collection = [], initialTextFilter, filterFunctions = {}) => {
	const [textFilter, setTextFilter] = useState(initialTextFilter);

	return {
		collection: useDefaultCollectionFilter(textFilter, filterFunctions)(collection),
		textFilter,
		setTextFilter,
	};
};
