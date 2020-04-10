import { useState } from 'react';

/*
Filters = array of {id, predicate(item)}
 */
export default function useFilters(defaultFilters = [], defaultGroupFilters = []) {
	const [filters, setFilters] = useState(defaultFilters);
	const [groupFilters, setGroupFilters] = useState(defaultGroupFilters);

	const addFilters = (filterDefs) => {
		setFilters((oldFilters) => oldFilters.concat(filterDefs));
	};

	const removeFilters = (filterIds) => {
		const toRemove = Array.isArray(filterIds) ? filterIds : [filterIds];
		setFilters((oldFilters) => oldFilters.filter(({ id }) => !toRemove.includes(id)));
	};

	const addGroupFilters = (filterDefs) => {
		setGroupFilters((oldFilters) => oldFilters.concat(filterDefs));
	};

	const removeGroupFilters = (filterIds) => {
		const toRemove = Array.isArray(filterIds) ? filterIds : [filterIds];
		setGroupFilters((oldFilters) => oldFilters.filter(({ id }) => !toRemove.includes(id)));
	};

	return {
		filters,
		addFilters,
		removeFilters,
		groupFilters,
		addGroupFilters,
		removeGroupFilters,
	};
}
