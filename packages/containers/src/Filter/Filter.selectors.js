import { List } from 'immutable';

const CONTAINER_FILTER = 'Container(FilterBar)';

/**
 * Selector on the state from the filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function selectorFilter(state, idComponent) {
	if (
		state.cmf.components.has(CONTAINER_FILTER) &&
		state.cmf.components.get(CONTAINER_FILTER).has(idComponent)
	) {
		return state.cmf.components.get(CONTAINER_FILTER).get(idComponent);
	}
	return List();
}

/**
 * Return the collectionFiltered attr from the state of filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getCollectionFiltered(state, idComponent) {
	return selectorFilter(state, idComponent).get('collectionFiltered', List());
}
/**
 * Return the filterInputValue attr from the state of filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getFilterInputValue(state, idComponent) {
	return selectorFilter(state, idComponent).get('filterInputValue', '');
}

/**
 * Return boolean if collectionFiltered is not empty.
 * @param {object} state
 * @param {string} idComponent
 */
export function isFilteredCollectionNotEmpty(state, idComponent) {
	return getCollectionFiltered(state, idComponent).size > 0;
}

/**
 * Return boolean if filterInputValue is not empty.
 * @param {object} state
 * @param {string} idComponent
 */
export function isFilterInputValueNotEmpty(state, idComponent) {
	return getFilterInputValue(state, idComponent).length > 0;
}
