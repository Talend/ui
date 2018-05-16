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
			version: 0,
		};
		this.sorterInfo = {
			sorter: null,
			result: [],
		};
		this.comparator = new Comparator(dataAccessor);
	}

	/**
	 * @private
	 */
	internalGetElements() {
		return this.elements;
	}

	/**
	 * Add a new filter. If it is active then compute the result.
	 * @param {object} filter - The filter.
	 * @see {@link Filter} for further information.
	 */
	addFilter(filter) {
		const filterId = filter.getId();
		this.filters.registry[filterId] = { filter, result: [], version: 0 };
		if (filter.isActive()) {
			this.filter(filterId);
		}
	}

	getFilters() {
		let filters = [];
		const filterIds = Object.keys(this.filters.registry);
		for (let i = 0; i < filterIds.length; i += 1) {
			const filter = this.filters.registry[filterIds[i]];
			if (filter) {
				filters = filters.concat(filter);
			}
		}
		return filters;
	}

	getFiltersVersion() {
		return this.filters.version;
	}

	getFilterVersion(filterId) {
		if (!this.filters.registry[filterId]) {
			return -1;
		}
		return this.filters.registry[filterId].version;
	}

	removeFilter(filter) {
		const filterId = filter.getId();
		if (!this.filters.registry[filterId]) {
			return;
		}
		delete this.filters.registry[filterId];
		this.internalMergeFiltersAndSorter();
	}

	/**
	 * Compute the result of the given filter (only if it is active).
	 * @param {string} filterId - identifier of the filter
	 * @private do not call it from outside.
	 */
	internalComputeFilter(filterId) {
		const filter = this.filters.registry[filterId].filter;
		if (filter.isActive()) {
			// compute filter on all elements
			const elements = this.internalGetElements();
			const result = elements.filter(elem => filter.select(this.dataAccessor, elem));
			this.filters.registry[filterId].result = result;
			this.filters.registry[filterId].version += 1;
		}
	}

	filter(filterId) {
		if (!this.filters.registry[filterId]) {
			return;
		}
		// compute filter
		this.internalComputeFilter(filterId);
		// finally merge all results
		this.internalMergeFiltersAndSorter();
	}

	filterAll() {
		if (!this.filters.registry) {
			return;
		}
		// compute all filters
		const filterIds = Object.keys(this.filters.registry);
		for (let i = 0; i < filterIds.length; i += 1) {
			this.internalComputeFilter(filterIds[i]);
		}
		// finally merge all results
		this.internalMergeFiltersAndSorter();
	}

	/**
	 * @private
	 */
	internalMergeFiltersAndSorter() {
		this.internalMergeFilters();
		if (this.hasSorter()) {
			this.internalSortElements(this.internalGetFilteredElements());
		}
	}

	/**
	 * @private
	 */
	internalMergeFilters() {
		const filterIds = Object.keys(this.filters.registry);
		let result = null;
		if (filterIds) {
			let first = true;
			for (let k = 0; k < filterIds.length; k += 1) {
				const filterId = filterIds[k];
				const filter = this.filters.registry[filterId].filter;
				if (filter.isActive()) {
					const filterResult = this.filters.registry[filterId].result;
					if (first) {
						result = filterResult;
						first = false;
					} else {
						// merge results
						result = mergeFilterResults(result, filterResult);
					}
				}
			}
		}
		this.filters.result = result;
		this.filters.version += 1;
	}

	hasFilters() {
		return Object.keys(this.filters.registry).length > 0;
	}

	hasFiltersActive() {
		const filterIds = Object.keys(this.filters.registry);
		if (filterIds) {
			for (let k = 0; k < filterIds.length; k += 1) {
				if (this.filters.registry[filterIds[k]].filter.isActive()) {
					return true;
				}
			}
		}
		return false;
	}

	isFiltered(element) {
		if (this.hasFiltersActive()) {
			return !this.includes(this.filters.result, element);
		}
		return false;
	}

	/**
	 * @private
	 */
	internalGetFilteredElements() {
		if (this.hasFiltersActive()) {
			return this.filters.result;
		}
		return this.internalGetElements();
	}

	setSorter(sorter) {
		this.sorterInfo.sorter = sorter;
		this.sort();
	}

	hasSorter() {
		return Boolean(this.sorterInfo.sorter);
	}

	isActiveSorter(sorter) {
		return this.hasSorter() && this.sorterInfo.sorter.getId() === sorter.getId();
	}

	getSorter() {
		return this.sorterInfo.sorter;
	}

	clearSorter() {
		this.sorterInfo.sorter = null;
	}

	sort() {
		if (this.hasSorter()) {
			this.internalSortElements(this.internalGetFilteredElements());
		}
	}

	/**
	 * @private
	 */
	internalSortElements(elements) {
		let result = elements.slice();
		this.comparator.sort(result, this.sorterInfo.sorter);
		this.sorterInfo.result = result;
	}

	/**
	 * Returns true if the array of elements contains the specified element.
	 */
	includes(elements, element) {
		if (this.dataAccessor.includes) {
			return this.dataAccessor.includes(elements, element);
		}
		for (let i = 0; i < elements.length; i += 1) {
			if (this.areElementsEqual(elements[i], element)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns true if the two elements are equals.
	 * Default implementation is based on element id.
	 */
	areElementsEqual(element1, element2) {
		if (this.dataAccessor.areElementsEqual) {
			return this.dataAccessor.areElementsEqual(element1, element2);
		}
		return this.getElementId(element1) === this.getElementId(element2);
	}

	/**
	 * Returns the identifier of the element.
	 * Identifier must be unique.
	 */
	getElementId(element) {
		return this.dataAccessor.getElementId(element);
	}

	/**
	 * Returns the number of elements.
	 */
	getSize(withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			if (this.hasSorter()) {
				return this.sorterInfo.result.length;
			} else if (this.hasFiltersActive()) {
				return this.filters.result.length;
			}
		}
		return this.internalGetElements().length;
	}

	/**
	 * Returns all the elements in an array.
	 */
	getElements(withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			if (this.hasSorter()) {
				return this.sorterInfo.result;
			} else if (this.hasFiltersActive()) {
				return this.filters.result;
			}
		}
		return this.internalGetElements();
	}

	/**
	 * Returns the nth element.
	 */
	getElement(index, withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			if (this.hasSorter()) {
				return this.sorterInfo.result[index];
			} else if (this.hasFiltersActive()) {
				return this.filters.result[index];
			}
		}
		const elements = this.getElements(withFiltersAndSorter);
		if (elements && elements.length > index) {
			return elements[index];
		}
		return null;
	}

	/**
	 * Returns the index of the given element,
	 * returns -1 if it is unknown.
	 */
	getElementIndex(element, withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			if (this.hasSorter()) {
				return this.sorterInfo.result.findIndex(elem => this.areElementsEqual(elem, element));
			} else if (this.hasFiltersActive()) {
				return this.filters.result.findIndex(elem => this.areElementsEqual(elem, element));
			}
		}
		const elements = this.getElements(withFiltersAndSorter);
		if (elements) {
			return elements.findIndex(elem => this.areElementsEqual(elem, element));
		}
		return -1;
	}

	getElementFromId(elementId) {
		const elements = this.getElements(false);
		if (elements) {
			return elements.find(elem => this.getElementId(elem) === id);
		}
		return null;
	}
}
