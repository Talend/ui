import * as Constants from './Constants';

/**
 * Internal function only used by the dataAccessor.
 */
function getMappingItemIndex(mapping, source, target) {
	return mapping.findIndex(item =>
		item.source.id === source.id && item.target.id === target.id);
}

/**
 * Internal function only used by the dataAccessor.
 */
function removeMappingItem(mapping, index) {
	const updatedMapping = mapping.slice();
	updatedMapping.splice(index, 1);
	return updatedMapping;
}

/**
 * This interface provides all the needed methods to access/update the
 * schema and mapping data.
 */
export default class DefaultDataAccessor {
	/**
	 * Returns the name of the schema.
	 */
	getSchemaName(schema) {
		return schema.name;
	}

	/**
	 * Returns the number of elements in the schema.
	 */
	getSchemaSize(schema) {
		return schema.elements.length;
	}

	/**
	 * Returns all the elements of the schema in an array.
	 */
	getSchemaElements(schema) {
		return schema.elements;
	}

	/**
	 * Returns the nth element of the schema.
	 */
	getSchemaElement(schema, index) {
		return schema.elements[index];
	}

	/**
	 * Returns the index of the given element,
	 * returns -1 if it is not in the schema.
	 */
	getSchemaElementIndex(schema, element) {
		return schema.elements.indexOf(element);
	}

	/**
	 * Returns the identifier of the element.
	 * Identifier must be unique.
	 */
	getElementId(element) {
		return element.id;
	}

	/**
	 * Returns the name of the element.
	 */
	getElementName(element) {
		return element.name;
	}

	/**
	 * Returns the semantic type of the element.
	 */
	getElementType(element) {
		return element.type;
	}

	/**
	 * Returns a description fot the element.
	 */
	getElementDescription(element) {
		return element.description;
	}

	/**
	 * Returns an array of all the mapping items. A mapping item defines
	 * a mapping betwwen an input and an output element.
	 */
	getMappingItems(mapping) {
		return mapping;
	}

	/**
	 * Return the mapped element for the specified side.
	 */
	getMappedElement(mappingItem, side) {
		if (side === Constants.MappingSide.INPUT) {
			return mappingItem.source;
		}
		return mappingItem.target;
	}

	/**
	 * Add a new mapping from source element to target element.
	 * Returns the updated mapping.
	 */
	addMapping(mapping, source, target) {
		return mapping.concat({ source, target });
	}

	/**
	 * Remove the (source->target) mapping.
	 * Returns the updated mapping.
	 */
	removeMapping(mapping, source, target) {
		const index = getMappingItemIndex(mapping, source, target);
		if (index >= 0) {
			return removeMappingItem(mapping, index);
		}
		return mapping;
	}

	/**
	 * Remove all the mapping items.
	 * Returns the updated mapping.
	 */
	clearMapping(mapping) {
		return [];
	}

	/**
	 * Returns true if the given mapping is empty
	 */
	isMappingEmpty(mapping) {
		return !mapping.length;
	}

	/**
	 * Returns true if the array of elements contains the specified element.
	 */
	includes(elements, element) {
		return elements.find(elem => elem.id === element.id);
	}
}
