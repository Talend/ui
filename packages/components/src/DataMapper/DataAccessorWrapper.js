import * as Constants from './Constants';

export default class DataAccessorWrapper {

	constructor(dataAccessor) {
		this.dataAccessor = dataAccessor;
		this.filters = {};
		this.cache = {};
		this.mappingVersion = 0;
	}

	populateCache(schema) {
		const key = this.getSchemaId(schema);
		this.cache[key] = {};
		const elements = this.getSchemaElements(schema, false);
		for (let i = 0; i < elements.length; i += 1) {
			this.cache[key][this.getElementId(elements[i])] = elements[i];
		}
	}

	isCacheInitialized() {
		return this.cache;
	}

	getElementFromCache(schema, id) {
		return this.cache[this.getSchemaId(schema)][id];
	}

	addFilter(schema, filter) {
		const schemaId = this.getSchemaId(schema);
		if (!this.filters[schemaId]) {
			this.filters[schemaId] = {};
		}
		const schemaFilters = this.filters[schemaId];
		if (!schemaFilters.filters) {
			schemaFilters.filters = {};
		}
		schemaFilters.filters[filter.getId()] = { filter, result: [], version: 0 };
	}

	getFilterVersion(schema) {
		const schemaId = this.getSchemaId(schema);
		if (this.filters[schemaId]) {
			return this.filters[schemaId].version;
		}
		return -1;
	}

	removeFilter(schema, filter) {
		// TODO
	}

	filterSchema(schema, filterKey) {
		const schemaId = this.getSchemaId(schema);
		const filter = this.filters[schemaId].filters[filterKey].filter;
		// reset result
		this.filters[schemaId].filters[filterKey].result = [];
		if (filter.isActive()) {
			// then compute filter on all elements
			const elements = this.getSchemaElements(schema, false);
			const result = elements.filter(elem => filter.select(this, schema, elem));
			this.filters[schemaId].filters[filterKey].result = result;
		}
		// finally merge all results
		this.mergeFilters(schemaId);
	}

	filterAll(schema) {
		// TODO
	}

	mergeFilterResults(result1, result2) {
		let mergedResult = [];
		for (let i = 0; i < result2.length; i += 1) {
			if (result1.includes(result2[i])) {
				mergedResult = mergedResult.concat(result2[i]);
			}
		}
		return mergedResult;
	}

	mergeFilters(schemaId) {
		if (this.filters[schemaId]) {
			const filterKeys = Object.keys(this.filters[schemaId].filters);
			let result = null;
			let active = false;
			if (filterKeys) {
				let first = true;
				for (let k = 0; k < filterKeys.length; k += 1) {
					const filterKey = filterKeys[k];
					const filter = this.filters[schemaId].filters[filterKey].filter;
					if (filter.isActive()) {
						active = true;
						const filterResult = this.filters[schemaId].filters[filterKey].result;
						if (first) {
							result = filterResult;
							first = false;
						} else {
							// merge results
							result = this.mergeFilterResults(result, filterResult);
						}
					}
				}
			}
			this.filters[schemaId].result = result;
			this.filters[schemaId].active = active;
			this.filters[schemaId].version += 1;
		}
	}

	filtersActive(schemaId) {
		return this.filters[schemaId] && this.filters[schemaId].active;
	}

	isFiltered(schema, element) {
		const schemaId = this.getSchemaId(schema);
		if (this.filtersActive(schemaId)) {
			return !this.includes(this.filters[schemaId].result, element);
		}
		return false;
	}

	/**
	 * Returns true if the two elements are equals.
	 * Default implementation is based on element id.
	 */
	areEquals(element1, element2) {
		if (this.dataAccessor.areEquals) {
			return this.dataAccessor.areEquals(element1, element2);
		}
		return this.getElementId(element1) === this.getElementId(element2);
	}

	getSchemaId(schema) {
		return this.dataAccessor.getSchemaId(schema);
	}

	/**
	 * Returns the name of the schema.
	 */
	getSchemaName(schema) {
		return this.dataAccessor.getSchemaName(schema);
	}

	/**
	 * Returns the number of elements in the schema.
	 */
	getSchemaSize(schema, withFilters) {
		const key = this.getSchemaId(schema);
		if (withFilters && this.filtersActive(key)) {
			return this.filters[key].result.length;
		}
		return this.dataAccessor.getSchemaSize(schema);
	}

	/**
	 * Returns all the elements of the schema in an array.
	 */
	getSchemaElements(schema, withFilters) {
		const key = this.getSchemaId(schema);
		if (withFilters && this.filtersActive(key)) {
			return this.filters[key].result;
		}
		return this.dataAccessor.getSchemaElements(schema);
	}

	/**
	 * Returns the nth element of the schema.
	 */
	getSchemaElement(schema, index, withFilters) {
		const key = this.getSchemaId(schema);
		if (withFilters && this.filtersActive(key)) {
			return this.filters[key].result[index];
		}
		if (this.dataAccessor.getSchemaElement) {
			return this.dataAccessor.getSchemaElement(schema, index);
		}
		const elements = this.getSchemaElements(schema, withFilters);
		if (elements && elements.length > index) {
			return elements[index];
		}
		return null;
	}

	/**
	 * Returns the index of the given element,
	 * returns -1 if it is not in the schema.
	 */
	getSchemaElementIndex(schema, element, withFilters) {
		const key = this.getSchemaId(schema);
		if (withFilters && this.filtersActive(key)) {
			return this.filters[key].result.findIndex(elem => this.areEquals(elem, element));
		}
		if (this.dataAccessor.getSchemaElementIndex) {
			return this.dataAccessor.getSchemaElementIndex(schema, element);
		}
		const elements = this.getSchemaElements(schema, withFilters);
		if (elements) {
			return elements.findIndex(elem => this.areEquals(elem, element));
		}
		return -1;
	}

  getSchemaElementFromId(schema, id) {
		if (this.isCacheInitialized()) {
			return this.getElementFromCache(schema, id);
		}
    if (this.dataAccessor.getSchemaElementFromId) {
      return this.dataAccessor.getSchemaElementFromId(schema, id);
    }
    const elements = this.getSchemaElements(schema, false);
    if (elements) {
      return elements.find(elem => this.getElementId(elem) === id);
    }
    return null;
  }

	/**
	 * Returns the identifier of the element.
	 * Identifier must be unique.
	 */
	getElementId(element) {
		return this.dataAccessor.getElementId(element);
	}

	/**
	 * Returns true if the array of elements contains the specified element.
	 */
	includes(elements, element) {
		if (this.dataAccessor.includes) {
			return this.dataAccessor.includes(elements, element);
		}
		for (let i = 0; i < elements.length; i += 1) {
			if (this.areEquals(elements[i], element)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns the name of the element.
	 */
	getElementName(element) {
		return this.dataAccessor.getElementName(element);
	}

	haveSameName(element1, element2) {
		return this.getElementName(element1) === this.getElementName(element2);
	}

	/**
	 * Returns the semantic type of the element.
	 */
	getElementType(element) {
		return this.dataAccessor.getElementType(element);
	}

	/**
	 * Returns a description fot the element.
	 */
	getElementDescription(element) {
		return this.dataAccessor.getElementDescription(element);
	}

	isElementMandatory(element) {
		return this.dataAccessor.isElementMandatory(element);
	}

	getMappingVersion() {
		return this.mappingVersion;
	}

	/**
	 * Returns an array of all the mapping items. A mapping item defines
	 * a mapping betwwen an input and an output element.
	 */
	getMappingItems(mapping) {
		return this.dataAccessor.getMappingItems(mapping);
	}

	/**
	 * Returns true if the given mapping is empty
	 */
	isMappingEmpty(mapping) {
		if (this.dataAccessor.isMappingEmpty) {
			return this.dataAccessor.isMappingEmpty(mapping);
		}
		const items = this.getMappingItems(mapping);
		return !items || !items.length;
	}

	/**
	 * Return the mapped element for the specified side.
	 */
	getMappedElement(mappingItem, side) {
		return this.dataAccessor.getMappedElement(mappingItem, side);
	}

	/**
	 * Add a new mapping from source element to target element.
	 * Returns the updated mapping.
	 */
	addMapping(mapping, source, target) {
		this.mappingVersion += 1;
		return this.dataAccessor.addMapping(mapping, source, target);
	}

	/**
	 * Remove the (source->target) mapping.
	 * Returns the updated mapping.
	 */
	removeMapping(mapping, source, target) {
		this.mappingVersion += 1;
		return this.dataAccessor.removeMapping(mapping, source, target);
	}

	/**
	 * Remove all the mapping items.
	 * Returns the updated mapping.
	 */
	clearMapping(mapping) {
		this.mappingVersion += 1;
		return this.dataAccessor.clearMapping(mapping);
	}

	// Some more convenient methods

	isElementInMappingItem(mappingItem, element, side) {
		const mappedElement = this.getMappedElement(mappingItem, side);
		return this.areEquals(mappedElement, element);
	}

	/**
	 * isElementMapped returns true if the given (element, side) is mapped
	 * (i.e. if it appears in the mapping)
	 */
	isElementMapped(mapping, element, side) {
		if (mapping != null) {
			const mappingItems = this.getMappingItems(mapping);
			return mappingItems.find(item => this.isElementInMappingItem(item, element, side));
		}
		return false;
	}

	/**
	 * isFullMapped returns true if all the elements of the given schema are mapped
	 */
	isFullMapped(mapping, schema, side) {
		// TODO could be optimized
		for (let i = 0; i < this.getSchemaSize(schema, false); i += 1) {
			if (!this.isElementMapped(mapping, this.getSchemaElement(schema, i, false), side)) {
				return false;
			}
		}
		return true;
	}

	getMappingItemsWithElement(mapping, element, side) {
		const mappingItems = this.getMappingItems(mapping);
		return mappingItems.filter(item => this.isElementInMappingItem(item, element, side));
	}

	getConnectedElements(mapping, element, side) {
		const items = this.getMappingItemsWithElement(mapping, element, side);
		if (items != null) {
			const connectedSide = Constants.switchMappingSide(side);
			return items.map(item => this.getMappedElement(item, connectedSide));
		}
		return null;
	}

	areEqual(elements1, elements2) {
		if (elements1 && elements2) {
			if (elements1.length === elements2.length) {
				for (let i = 0; i < elements1.length; i += 1) {
					if (!this.includes(elements2, elements1[i])) {
						return false;
					}
				}
				return true;
			}
			return false;
		} else if (elements1 || elements2) {
			return false;
		}
		return true;
	}

	logElements(elements) {
		let log = '[';
		for (let i = 0; i < elements.length; i += 1) {
			log = log.concat(this.getElementName(elements[i]));
			if (i < elements.length - 1) {
				log = log.concat(', ');
			}
		}
		log = log.concat(']');
		return log;
	}

}
