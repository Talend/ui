/**
 * @module react-cmf/lib/reducers/collectionsReducers
 */
import get from 'lodash/get';
import has from 'lodash/has';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import unset from 'lodash/unset';
import invariant from 'invariant';
import CONSTANTS from '../constant';

export const defaultState = {};

function setIn(state, path, value) {
	const cloned = cloneDeep(state);
	set(cloned, path, value);
	return cloned;
}

function deleteIn(state, path) {
	const cloned = cloneDeep(state);
	unset(cloned, path);
	return cloned;
}

/**
 * Get element id.
 */
export function getId(element) {
	return element.id;
}

/*
 * backward compatibility, as mutateCollection action creator still use 'id' field
 * to represent path to collection
 */
export function getActionWithCollectionIdAsArray(action) {
	if (action.collectionId || action.id) {
		const collectionId = action.collectionId || action.id;
		return {
			...action,
			collectionId: Array.isArray(collectionId) ? collectionId : collectionId.split('.'),
		};
	}
	return action;
}

/**
 * addElementToCollection
 *
 * @param state current redux state
 * @param action redux action
 * @returns {object} the new state
 */
function addCollectionElement(state, action) {
	if (action.operations.add) {
		return action.operations.add.reduce((s, e) => {
			const element = get(s, action.collectionId);
			if (Array.isArray(element)) {
				return setIn(s, action.collectionId, [...element, e]);
			}
			if (typeof element === 'object' && !Array.isArray(element) && element !== null) {
				return setIn(s, action.collectionId, { ...element, ...e });
			}
			return s;
		}, state);
	}
	return state;
}

function deleteListElements(state, action) {
	function shouldBeRemoved(element) {
		return action.operations.delete.indexOf(getId(element)) >= 0;
	}

	const collection = get(state, action.collectionId);
	if (collection.some(shouldBeRemoved)) {
		return setIn(
			state,
			action.collectionId,
			collection.filter(e => !shouldBeRemoved(e)),
		);
	}
	return state;
}

function deleteMapElements(state, action) {
	const collection = get(state, action.collectionId);

	if (action.operations.delete.some(id => id in collection)) {
		const changedCollection = action.operations.delete.reduce((collectionAccu, element) => {
			const { [element]: _, ...rest } = collectionAccu;
			return rest;
		}, collection);
		return setIn(state, action.collectionId, changedCollection);
	}

	return state;
}

/**
 * deleteElementFromCollection
 *
 * @param state current redux state
 * @param action redux action
 * @returns {object} the new state
 */
function deleteCollectionElement(state, action) {
	if (action.operations.delete) {
		const collection = get(state, action.collectionId);
		if (!Array.isArray(collection) && typeof collection === 'object' && collection !== null) {
			return deleteMapElements(state, action);
		} else if (Array.isArray(collection)) {
			return deleteListElements(state, action);
		}
		throw new Error('CMF collection deletion is only compatible with plain arrays and objects');
	}
	return state;
}

function updateListElements(state, action) {
	const updates = action.operations.update;
	const changedCollection = get(state, action.collectionId).map(element =>
		getId(element) in updates ? updates[getId(element)] : element,
	);
	return setIn(state, action.collectionId, changedCollection);
}

function updateMapElements(state, action) {
	const updates = action.operations.update;
	const currentCollection = get(state, action.collectionId);
	const changedCollection = Object.keys(updates).reduce(
		(collectionAccu, id) => ({ ...collectionAccu, [id]: updates[id] }),
		currentCollection,
	);
	return setIn(state, action.collectionId, changedCollection);
}

/**
 * updateCollectionElement
 *
 * @param state current redux state
 * @param action redux action
 * @returns {object} the new state
 */
function updateCollectionElement(state, action) {
	if (action.operations.update) {
		const collection = get(state, action.collectionId);
		if (!Array.isArray(collection) && typeof collection === 'object' && collection !== null) {
			return updateMapElements(state, action);
		} else if (Array.isArray(collection)) {
			return updateListElements(state, action);
		}
		throw new Error('CMF collection update is only compatible with plain arrays and objects');
	}
	return state;
}

/**
 * mutateCollection
 *
 * @param {object} state the current redux state
 * @param {object} action redux action
 * @returns {object} the new state
 */
function mutateCollection(state, action) {
	if (!action.operations || !has(state, action.collectionId)) {
		return state;
	}
	let newState = addCollectionElement(state, action);
	newState = deleteCollectionElement(newState, action);
	return updateCollectionElement(newState, action);
}

/**
 * @param  {object} state  the state
 * @param  {object} action redux action
 * @return {object}        the new state
 */
function collectionsReducers(state = defaultState, action = { type: '' }) {
	const newAction = getActionWithCollectionIdAsArray(action);
	switch (newAction.type) {
		case CONSTANTS.COLLECTION_ADD_OR_REPLACE:
			return setIn(state, newAction.collectionId, newAction.data);
		case CONSTANTS.COLLECTION_REMOVE:
			if (!has(state, newAction.collectionId)) {
				invariant(
					process.env.NODE_ENV === 'production',
					`Can't remove collection ${newAction.collectionId} since it doesn't exist.`,
				);
				return state;
			}
			return deleteIn(state, newAction.collectionId);
		case CONSTANTS.COLLECTION_MUTATE:
			return mutateCollection(state, newAction);
		default:
			return state;
	}
}

export default collectionsReducers;
