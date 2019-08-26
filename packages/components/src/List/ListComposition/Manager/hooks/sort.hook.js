import { useMemo, useState } from 'react';
import isNil from 'lodash/isNil';

function getDefaultSortFunction({ sortBy, isDescending }) {
	const direction = isDescending ? -1 : 1;

	return function defaultSort(a, b) {
		const valueA = isNil(a[sortBy]) ? '' : a[sortBy];
		const valueB = isNil(b[sortBy]) ? '' : b[sortBy];

		const result =
			isNaN(valueA) || isNaN(valueB)
				? valueA.toString().localeCompare(valueB.toString())
				: valueA - valueB;

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

export default function useCollectionSort(
	collection = [],
	initialSortParams = {},
	sortFunctions = {},
) {
	const [sortParams, setSortParams] = useState(initialSortParams);
	const sortedCollection = useMemo(() => sort(collection, sortParams, sortFunctions), [
		collection,
		sortParams,
		sortFunctions,
	]);
	return {
		sortedCollection,
		sortParams,
		setSortParams,
	};
}
