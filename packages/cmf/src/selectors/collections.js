import _get from 'lodash/get';
import getToJSMemoized from './toJS';

export function getAll(state) {
	return state.cmf.collections;
}

/**
 * return a collection or subset of a collection from a cmf store
 * @param {Object} state
 * @param {String or Array<String>} collectionPath
 * @example
 *  get('foo.bar', true) === state.cmf.collections.getIn(['foo', 'bar'], true)
 */
export function get(state, collectionPath, defaultValue) {
	if (typeof collectionPath === 'string' || Array.isArray(collectionPath)) {
		return _get(state.cmf.collections, collectionPath, defaultValue);
	}
	throw Error(`Type mismatch: collectionPath should be a string or an array of string
got ${collectionPath}`);
}

/**
 * for a collectionId and an id find and return the an item from this
 * collection if it is a list
 * @param {Object} state
 * @param {String} collectionId
 * @param {String} itemId
 */
export function findListItem(state, collectionPath, itemId) {
	const collectionOrCollectionSubset = get(state, collectionPath);
	if (Array.isArray(collectionOrCollectionSubset)) {
		return collectionOrCollectionSubset.find(element => element && element.id === itemId);
	}
	throw Error(
		`Type mismatch: ${collectionPath} does not resolve as an Array,
got ${collectionOrCollectionSubset}`,
	);
}

// Cache keys are joined path strings; bounded in practice by the finite set of
// distinct paths used in the application.
const selectors = {};

export function toJS(state, path) {
	const joinedPath = Array.isArray(path) ? path.join('.') : path;
	if (!selectors[joinedPath]) {
		selectors[joinedPath] = getToJSMemoized(calledState => get(calledState, path));
	}
	return selectors[joinedPath](state);
}

/**
 * Get a collection as a plain JS object/array (no Immutable types leaked).
 * @param {Object} state
 * @param {String} collectionId
 * @returns {Object|Array|undefined}
 */
export function getCollectionPlain(state, collectionId) {
	const collection = state.cmf.collections[collectionId];
	if (collection == null) return undefined;
	return collection;
}

/**
 * Get the items from a collection, handling both Map-wrapped and direct List forms.
 * Covers the `Map.isMap(collection) ? collection.get('items') : collection` pattern
 * from containers/src/List/selector.js.
 * @param {Object} state
 * @param {String} collectionId
 * @returns {Array|undefined}
 */
function extractItems(collection) {
	if (collection !== null && typeof collection === 'object' && !Array.isArray(collection)) {
		return collection.items;
	}
	return collection;
}

export function getCollectionItems(state, collectionId) {
	const collection = state.cmf.collections[collectionId];
	if (collection == null) return undefined;
	const items = extractItems(collection);
	if (items == null) return undefined;
	return items;
}

/**
 * Find an item in a collection by its id field, returning a plain JS object.
 * Covers the `.find(r => r.get('id') === id)` pattern from
 * containers/src/DeleteResource/DeleteResource.connect.js.
 * @param {Object} state
 * @param {String} collectionId
 * @param {String} itemId
 * @returns {Object|undefined}
 */
export function getCollectionItem(state, collectionId, itemId) {
	const collection = state.cmf.collections[collectionId];
	if (collection == null) return undefined;
	const items = extractItems(collection);
	if (!items || !Array.isArray(items)) return undefined;
	const found = items.find(item => item && item.id === itemId);
	if (found == null) return undefined;
	return found;
}
