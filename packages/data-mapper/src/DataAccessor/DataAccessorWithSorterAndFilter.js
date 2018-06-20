
/**
 * This class is responsible for storing results of filtering and sorting.
 */
export default class DataAccessorWithSorterAndFilter {
	/**
	 * @param {array} elements - an array of elements
	 *
	 * The provided data accessor is basically a rowDataGetter implementation.
	 */
	constructor(elements) {
		this.elements = elements;
		// This stores the result of filters computation.
		this.filteredElements = elements;
		/**
		 * Versioning number used to know what is the last version of filters computation.
		 * Each time a filter is applied, the version number is incremented.
		 */
		this.filtersVersion = 0;
		// This stores the result of sorter computation.
		this.sortedElements = elements;
	}

	/**
	 * @private
	 */
	internalGetElements() {
		return this.elements;
	}

	setFilteredElements(filteredElements) {
		this.filteredElements = filteredElements;
		this.filtersVersion += 1;
	}

	getFilteredElements() {
		return this.filteredElements;
	}

	/**
	 * Returns the last main version number of filters computation.
	 */
	getFiltersVersion() {
		return this.filtersVersion;
	}

	setSortedElements(sortedElements) {
		this.sortedElements = sortedElements;
	}

	getSortedElements() {
		return this.sortedElements;
	}

	/**
	 * Indicates if the given element is filtered.
	 * @param {object} element - The element
	 */
	isFiltered(element) {
		return !this.includes(this.filteredElements, element);
	}

	/**
	 * Returns true if the array of elements contains the specified element.
	 * @param {array} elements
	 * @param {object} element
	 */
	includes(elements, element) {
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
		return this.getElementId(element1) === this.getElementId(element2);
	}

	/**
	 * Returns the identifier of the element.
	 * Identifier must be unique.
	 * @param {object} element - The element
	 */
	getElementId(element) {
		return element.id;
	}

	/**
	 * Returns the number of elements.
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters.
	 */
	getSize(withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			return this.sortedElements.length;
		}
		return this.internalGetElements().length;
	}

	/**
	 * Returns all the elements in an array.
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters.
	 */
	getElements(withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			return this.sortedElements;
		}
		return this.internalGetElements();
	}

	/**
	 * Returns the nth element.
	 * @param {integer} index - The index of the wanted element.
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters and sorter.
	 */
	getElement(index, withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			return this.sortedElements[index];
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
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters and sorter.
	 */
	getElementIndex(element, withFiltersAndSorter) {
		if (withFiltersAndSorter) {
			return this.sortedElements.findIndex(elem => this.areElementsEqual(elem, element));
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
