import { useState } from 'react';

/*
Filters = array of {id, predicate(item)}
 */
export default function useFilters(defaultFilters = []) {
	const [filters, setFilters] = useState(defaultFilters);

	const addFilters = filterDefs => {
		setFilters(oldFilters => oldFilters.concat(filterDefs));
	};

	const removeFilters = filterIds => {
		const toRemove = Array.isArray(filterIds) ? filterIds : [filterIds];
		setFilters(oldFilters => oldFilters.filter(({ id }) => !toRemove.includes(id)));
	};

	return {
		filters,
		addFilters,
		removeFilters,
	};
}
