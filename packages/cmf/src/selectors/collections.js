import { List } from 'immutable';
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
