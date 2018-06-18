import * as Constants from '../Constants';

/**
 * Internal function only used by the dataAccessor.
 */
function removeMappingItem(mapping, index) {
	const updatedMapping = mapping.slice();
	updatedMapping.splice(index, 1);
	return updatedMapping;
}

export default class MappingAccessor {
	constructor(dataAccessor) {
		this.dataAccessor = dataAccessor;
	}

	internalAreEqual(elem1, elem2) {
		return this.dataAccessor.areElementsEqual(elem1, elem2);
	}

	internalGetMappingItemIndex(mapping, source, target) {
		return mapping.findIndex(
			item =>
				this.internalAreEqual(item.source, source) && this.internalAreEqual(item.target, target),
		);
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
		const index = this.internalGetMappingItemIndex(mapping, source, target);
		if (index >= 0) {
			return removeMappingItem(mapping, index);
		}
		return mapping;
	}

	/**
	 * Remove all the mapping items.
	 * Returns the updated mapping.
	 */
	clearMapping() {
		return [];
	}

	/**
	 * Returns true if the given mapping is empty
	 */
	isMappingEmpty(mapping) {
		return !mapping.length;
	}
}
