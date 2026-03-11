import { Map, List } from 'immutable';
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
	let path;
	if (typeof collectionPath === 'string') {
		path = collectionPath.split('.');
	} else if (Array.isArray(collectionPath)) {
		path = collectionPath;
	}
	if (path) {
		return state.cmf.collections.getIn(path, defaultValue);
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
	if (List.isList(collectionOrCollectionSubset)) {
		return collectionOrCollectionSubset.find(element => element && element.get('id') === itemId);
	}
	throw Error(
		`Type mismatch: ${collectionPath} does not resolve as an instance of Immutable.List,
got ${collectionOrCollectionSubset}`,
	);
}

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
	const collection = state.cmf.collections.get(collectionId);
	if (collection == null) return undefined;
	if (typeof collection.toJS === 'function') return collection.toJS();
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
	if (Map.isMap(collection)) {
		return collection.get('items');
	}
	return collection;
}

export function getCollectionItems(state, collectionId) {
	const collection = state.cmf.collections.get(collectionId);
	if (collection == null) return undefined;
	const items = extractItems(collection);
	if (items == null) return undefined;
	if (typeof items.toJS === 'function') return items.toJS();
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
	const collection = state.cmf.collections.get(collectionId);
	if (collection == null) return undefined;
	const items = extractItems(collection);
	if (!items || typeof items.find !== 'function') return undefined;
	const found = items.find(item => {
		if (item && typeof item.get === 'function') return item.get('id') === itemId;
		return item && item.id === itemId;
	});
	if (found == null) return undefined;
	if (typeof found.toJS === 'function') return found.toJS();
	return found;
}
