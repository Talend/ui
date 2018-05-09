import Filter from '../Filters/Filter';
import Sorter from '../Sorters/Sorter';

function mergeFilterResults(result1, result2) {
	let mergedResult = [];
	for (let i = 0; i < result2.length; i += 1) {
		if (result1.includes(result2[i])) {
			mergedResult = mergedResult.concat(result2[i]);
		}
	}
	return mergedResult;
}

class Comparator {
	constructor(dataAccessor) {
		this.dataAccessor = dataAccessor;
		this.compare = this.compare.bind(this);
	}

	compare(element1, element2) {
		return this.sorter.compare(this.dataAccessor, element1, element2);
	}

	sort(elements, sorter) {
		this.sorter = sorter;
		elements.sort(this.compare);
	}
}

export default class DataAccessorWithSorterAndFilter {
	constructor(elements, dataAccessor) {
		this.elements = elements;
		this.dataAccessor = dataAccessor;
		this.filters = {
			registry: {},
			result: [],
			active: false,
			version: 0,
		};
		this.sorters = {};
		this.comparator = new Comparator(dataAccessor);
	}

	addFilter(filter) {
		this.filters.registry[filter.getId()] = { filter, result: [], version: 0 };
	}

	getFilterVersion() {
		return this.filters.version;
	}

	removeFilter(filter) {
		const filterId = filter.getId();
		if (!this.filters.registry[filterId]) {
			return;
		}
		delete this.filters.registry[filterId];
		this.mergeFiltersAndSorters();
	}

	computeFilter(filterId) {
		const filter = this.filters.registry[filterId].filter;
		// reset result
		this.filters.registry[filterId].result = [];
		if (filter.isActive()) {
			// then compute filter on all elements
			const result = this.elements.filter(elem => filter.select(this.dataAccessor, elem));
			this.filters.registry[filterId].result = result;
		}
	}

	filter(filterId) {
		if (!this.filters.registry[filterId]) {
			return;
		}
		// compute filter
		this.computeFilter(filterId);
		// finally merge all results
		this.mergeFiltersAndSorters();
	}



}
