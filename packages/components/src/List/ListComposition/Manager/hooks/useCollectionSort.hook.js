import { useMemo, useState } from 'react';

function getDefaultSortFunction({ sortBy, isDescending }) {
	const direction = isDescending ? -1 : 1;

	return function defaultSort(a, b) {
		const result = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true }).compare(
			a[sortBy],
			b[sortBy],
		);

		return result * direction;
	};
}

function sort(collection, sortParams, sortFunctions) {
	const { sortBy } = sortParams;
	if (!sortBy) {
		return collection;
	}

	const sortFunctionGetter = sortFunctions[sortBy] || getDefaultSortFunction;
	return collection.slice(0).sort(sortFunctionGetter(sortParams));
}

export const sortCollection = (sortParams, sortFunctions) => collection =>
	useMemo(() => sort(collection, sortParams, sortFunctions), [
		collection,
		sortParams,
		sortFunctions,
	]);

export function useCollectionSort(collection = [], initialSortParams = {}, sortFunctions = {}) {
	const [sortParams, setSortParams] = useState(initialSortParams);
	const sortedCollection = sortCollection(sortParams, sortFunctions)(collection);
	return {
		sortedCollection,
		sortParams,
		setSortParams,
	};
}
