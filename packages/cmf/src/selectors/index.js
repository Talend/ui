import { List } from 'immutable';

/**
 * return a collection or subset of a collection from a cmf store
 * @param {Object} state
 * @param {String or Array<String>} collectionPath
 */
export function getCollectionPath(state, collectionPath) {
	if (typeof collectionPath === 'string') {
		return state.cmf.collections.get(collectionPath);
	} else if (Array.isArray(collectionPath)) {
		return state.cmf.collections.getIn(collectionPath);
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
 * @param {String} itemPath -optionnal
 */
export function findCollectionPathListItem(state, collectionPath, itemId) {
	const collectionOrCollectionSubset = getCollectionPath(state, collectionPath);
	if (List.isList(collectionOrCollectionSubset)) {
		return collectionOrCollectionSubset.find(element => element && element.get('id') === itemId);
	}
	throw Error(
		`Type mismatch: ${collectionPath} does not resolve as an instance of Immutable.List, 
got ${collectionOrCollectionSubset}`,
	);
}
