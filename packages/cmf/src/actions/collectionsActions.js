/**
 * @module react-cmf/lib/actions/collectionsActions
 */

export const COLLECTION_ADD_OR_REPLACE = 'REACT_CMF.COLLECTION_ADD_OR_REPLACE';
export const COLLECTION_REMOVE = 'REACT_CMF.COLLECTION_REMOVE';
export const COLLECTION_MUTATE = 'REACT_CMF.COLLECTION_MUTATE';

/**
 * Add or replace collection data in store
 * @param {string} collectionId identifier
 * @param {any} data element that represent business data
 */
export function addOrReplace(collectionId, data) {
	return {
		type: COLLECTION_ADD_OR_REPLACE,
		collectionId,
		data,
	};
}

/**
 * Remove collection data in store to free space
 * @param {string} collectionId identifier
 *
 * @throws if you try to remove non existent collection
 */
export function remove(collectionId) {
	return {
		type: COLLECTION_REMOVE,
		collectionId,
	};
}

/**
 * mutateCollection let's you apply operations on a given collection
 *
 * @param {string} collectionId collection identifier
 * @param {object} operations operations to be applied on the collection
 * {
 * 		add: [],
 * 		update: {},
 * 		delete: []
 * }
 */
export function mutate(id, operations) {
	return {
		type: COLLECTION_MUTATE,
		id,
		operations,
	};
}

// backward compatibility
export const addOrReplaceCollection = addOrReplace;
export const mutateCollection = mutate;
export const removeCollection = remove;
