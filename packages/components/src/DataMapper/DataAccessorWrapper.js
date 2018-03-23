import * as Constants from './Constants';

export default class DataAccessorWrapper {

  constructor(dataAccessor) {
    this.dataAccessor = dataAccessor;
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
	getSchemaSize(schema) {
		return this.dataAccessor.getSchemaSize(schema);
	}

	/**
	* Returns all the elements of the schema in an array.
	*/
	getSchemaElements(schema) {
		return this.dataAccessor.getSchemaElements(schema);
	}

	/**
	* Returns the nth element of the schema.
	*/
	getSchemaElement(schema, index) {
    if (this.dataAccessor.getSchemaElement) {
      return this.dataAccessor.getSchemaElement(schema, index);
    }
		const elements = this.getSchemaElements(schema);
    if (elements && elements.length > index) {
      return elements[index];
    }
    return null;
	}

	/**
	* Returns the index of the given element,
	* returns -1 if it is not in the schema.
	*/
	getSchemaElementIndex(schema, element) {
    if (this.dataAccessor.getSchemaElementIndex) {
      return this.dataAccessor.getSchemaElementIndex(schema, element);
    }
    const elements = this.getSchemaElements(schema);
    if (elements) {
      return elements.indexOf(element);
    }
		return -1;
	}

  getSchemaElementFromId(schema, id) {
    if (this.dataAccessor.getSchemaElementFromId) {
      return this.dataAccessor.getSchemaElementFromId(schema, id);
    }
    const elements = this.getSchemaElements(schema);
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
	* Returns true if the two elements are equals.
	* Default implementation is based on element id.
	*/
	areEquals(element1, element2) {
    if (this.dataAccessor.areEquals) {
      return this.dataAccessor.areEquals(element1, element2);
    }
		return this.getElementId(element1) === this.getElementId(element2);
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
		return this.dataAccessor.addMapping(mapping, source, target);
	}

	/**
	* Remove the (source->target) mapping.
	* Returns the updated mapping.
	*/
	removeMapping(mapping, source, target) {
		return this.dataAccessor.removeMapping(mapping, source, target);
	}

	/**
	* Remove all the mapping items.
	* Returns the updated mapping.
	*/
	clearMapping(mapping) {
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
  		return mappingItems.find(
  			item => this.isElementInMappingItem(item, element, side)
  		);
  	}
  	return false;
  }

  /**
  * isFullMapped returns true if all the elements of the given schema are mapped
  */
  isFullMapped(mapping, schema, side) {
  	// TODO could be optimized
  	for (let i = 0; i < this.getSchemaSize(schema); i += 1) {
  		if (!this.isElementMapped(mapping, this.getSchemaElement(schema, i), side)) {
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

}
