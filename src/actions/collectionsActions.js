/**
 * @module react-cmf/lib/actions/collectionsActions
 */
import invariant from 'invariant';

export const COLLECTION_ADD_OR_REPLACE = 'REACT_CMF.COLLECTION_ADD_OR_REPLACE';
export const COLLECTION_REMOVE = 'REACT_CMF.COLLECTION_REMOVE';
export const COLLECTION_MUTATE = 'REACT_CMF.COLLECTION_MUTATE';

/**
 * Add or replace collection data in store
 * @param {string} collectionId identifier
 * @param {any} data element that represent business data
 */
export const addOrReplaceCollection = (collectionId, data) => ({
	type: COLLECTION_ADD_OR_REPLACE,
	collectionId,
	data,
});

/**
 * Remove collection data in store to free space
 * @param {string} collectionId identifier
 *
 * @throws if you try to remove non existent collection
 */
export const removeCollection = collectionId => (
	(dispatch, getState) => {
		const state = getState();
		let error = false;
		if (!state.cmf.collections.get(collectionId)) {
			error = true;
			invariant(false, `Can't remove collection ${collectionId} since it doesn't already exist.`);
		}
		if (!error) {
			dispatch({
				type: COLLECTION_REMOVE,
				collectionId,
			});
		}
	}
);

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
export const mutateCollection = (id, operations) => ({
	type: COLLECTION_MUTATE,
	id,
	operations,
});
