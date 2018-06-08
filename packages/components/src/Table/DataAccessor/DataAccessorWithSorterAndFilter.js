
function mergeFilterResults(result1, result2) {
	let mergedResult = [];
	for (let i = 0; i < result2.length; i += 1) {
		if (result1.includes(result2[i])) {
			mergedResult = mergedResult.concat(result2[i]);
		}
	}
	return mergedResult;
}

/**
 * Internal class used to compare elements with a sorter.
 */
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

/**
 * This class is responsible for storing and applying filters and sorter on an array of elements.
 * It makes no assumptions about the structure of the elements:
 *  it uses a dataAccessor in order to access element content.
 * You can add multiple filters, but only one sorter.
 */
export default class DataAccessorWithSorterAndFilter {
	/**
	 * @param {array} elements - an array of elements
	 * @param {object} dataAccessor - This provides access to element content.
	 *
	 * The provided data accessor is basically a rowDataGetter implementation.
	 */
	constructor(elements, dataAccessor) {
		this.elements = elements;
		this.dataAccessor = dataAccessor;
		// This object stores all information about filters.
		this.filters = {
			// A Map storing the registered filters. Key is the identifier of a filter.
			registry: {},
			// This stores the result of filters computation.
			result: [],
			/**
			 * Versioning number used to know what is the last version of filters computation.
			 * Each time a filter is applied, the version number is incremented.
			 */
			version: 0,
		};
		// Thos object stores the current sorter and its result.
		this.sorterInfo = {
			sorter: null,
			// This stores the result of sorter computation.
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

	/**
	 * This returns the registered filters in an array.
	 */
	getFilters() {
		let filters = [];
		const filterIds = Object.keys(this.filters.registry);
		for (let i = 0; i < filterIds.length; i += 1) {
			const registeredFilter = this.filters.registry[filterIds[i]];
			if (registeredFilter) {
				filters = filters.concat(registeredFilter.filter);
			}
		}
		return filters;
	}

	/**
	 * Returns the last main version number of filters computation.
	 */
	getFiltersVersion() {
		return this.filters.version;
	}

	/**
	 * Returns the last version number of a specific filter.
	 * @param {string} filterId - the identifier of the filter
	 */
	getFilterVersion(filterId) {
		if (!this.filters.registry[filterId]) {
			return -1;
		}
		return this.filters.registry[filterId].version;
	}

	/**
	 * Remove the given filter from the data accessor.
	 * It triggers a new filter(s) computation (and so increments the main version number).
	 * @param {object} filter - The filter to be removed.
	 */
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

	/**
	 * This triggers a new computation with the given filter (based on its identfier).
	 * If the filter is not registered, nothing happens.
	 * The result is then merged with another filter results and sorted (if a sorter is defined).
	 * @param {string} filterId - the identifier of the filter
	 */
	filter(filterId) {
		if (!this.filters.registry[filterId]) {
			return;
		}
		// compute filter
		this.internalComputeFilter(filterId);
		// finally merge all results
		this.internalMergeFiltersAndSorter();
	}

	/**
	 * This triggers a new computation for all registered filters.
	 * The final result is then sorted if a sorter is defined.
	 */
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

	/**
	 * Indicates if at least one filter is registered.
	 */
	hasFilters() {
		return Object.keys(this.filters.registry).length > 0;
	}

	/**
	 * Iindicates if at least one registered filter is active.
	 */
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

	/**
	 * Indicates if the given element is filtered.
	 * @param {object} element - The element
	 */
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

	/**
	 * This defines a sorter. Only one sorter can be defined.
	 * If a sorter is already defined, it is replaced by the new one.
	 * This triggers a sort computation.
	 * @param {object} sorter - The sorter
	 * @see {@link Sorter} for further information.
	 */
	setSorter(sorter) {
		this.sorterInfo.sorter = sorter;
		this.sort();
	}

	/**
	 * Indicates if a sorter is defined.
	 */
	hasSorter() {
		return Boolean(this.sorterInfo.sorter);
	}

	/**
	 * Indicates if the given sorter is the one defined in the data accessor.
	 * @param {object} sorter - the sorter
	 */
	isActiveSorter(sorter) {
		return this.hasSorter() && this.sorterInfo.sorter.getId() === sorter.getId();
	}

	/**
	 * Returns the defined sorter if it exists.
	 */
	getSorter() {
		return this.sorterInfo.sorter;
	}

	/**
	 * Remove the sorter from the data accessor.
	 */
	clearSorter() {
		this.sorterInfo.sorter = null;
	}

	/**
	 * This triggers a sort computation.
	 * The sort is done with the result of registered and activated filters.
	 */
	sort() {
		if (this.hasSorter()) {
			this.internalSortElements(this.internalGetFilteredElements());
		}
	}

	/**
	 * @private
	 */
	internalSortElements(elements) {
		const result = elements.slice();
		this.comparator.sort(result, this.sorterInfo.sorter);
		this.sorterInfo.result = result;
	}

	/**
	 * Returns true if the array of elements contains the specified element.
	 * @param {array} elements
	 * @param {object} element
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
	 * @param {object} element1 - the first element to be compared
	 * @param {object} element2 - the second element to be compared
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
	 * @param {object} element - The element
	 */
	getElementId(element) {
		return this.dataAccessor.getElementId(element);
	}

	/**
	 * Return the data corresponding to the given element and column key.
	 * @param {object} element - An element of the table.
	 * @param {string} key - The key identifying a column.
	 */
	getRowData(element, key) {
		return this.dataAccessor.getRowData(element, key);
	}

	/**
	 * Returns the number of elements.
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters.
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
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters.
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
	 * @param {integer} index - The index of the wanted element.
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account
	 *  the filters and sorter.
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
	 * @param {object} element - the element1
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account
	 *  the filters and sorter.
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

	/**
	 * Returns the element corresponding to the given identifier.
	 * @param {string} elementId - the element identifier
	 */
	getElementFromId(elementId) {
		const elements = this.getElements(false);
		if (elements) {
			return elements.find(elem => this.getElementId(elem) === elementId);
		}
		return null;
	}
}
