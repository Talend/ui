/**
 * @module react-cmf/lib/actions/collectionsActions
 */
import curry from 'lodash/curry';
import CONSTANTS from '../constant';

// keep backward compatibility
export const { COLLECTION_ADD_OR_REPLACE, COLLECTION_REMOVE, COLLECTION_MUTATE } = CONSTANTS;

/**
 * Add or replace collection data in store
 * curried function
 * @param {string} path - path to collection
 * @param {any} data element that represent business data
 */
export const addOrReplace = curry((path, data) => ({
	type: CONSTANTS.COLLECTION_ADD_OR_REPLACE,
	path: Array.isArray(path) ? path : path.split('.'),
	data,
}));

/**
 * Remove collection data in store to free space
 * @param {string} path - path to collection
 *
 * @throws if you try to remove non existent collection
 */
export function remove(path) {
	return {
		type: CONSTANTS.COLLECTION_REMOVE,
		path: Array.isArray(path) ? path : path.split('.'),
	};
}

/**
 * mutateCollection let's you apply operations on a given collection
 * curried function
 * @param {string} path - path to collection
 * @param {object} operations operations to be applied on the collection
 * {
 * 		add: [],
 * 		update: {},
 * 		delete: []
 * }
 */
export const mutate = curry((path, operations) => ({
	type: CONSTANTS.COLLECTION_MUTATE,
	path: Array.isArray(path) ? path : path.split('.'),
	operations,
}));

// backward compatibility
export const addOrReplaceCollection = addOrReplace;
export const mutateCollection = mutate;
export const removeCollection = remove;
