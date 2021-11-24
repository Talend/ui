/**
 * @module react-cmf/lib/reducers/collectionsReducers
 */
import { Map, List, fromJS } from 'immutable';
import invariant from 'invariant';
import CONSTANTS from '../constant';

export const defaultState = new Map();

/**
 * Get element id. If it doesn't have "id" property, we consider it as immutable.
 */
export function getId(element) {
	const id = element.id;
	if (id === undefined) {
		return element.get('id');
	}
	return id;
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
			const element = s.getIn(action.collectionId);
			if (List.isList(element)) {
				return s.setIn(action.collectionId, element.push(e));
			}
			if (Map.isMap(element)) {
				return s.setIn(action.collectionId, element.merge(e));
			}
			return state;
		}, state);
	}
	return state;
}

function deleteListElements(state, action) {
	function shouldBeRemoved(element) {
		return action.operations.delete.indexOf(getId(element)) >= 0;
	}

	const collection = state.getIn(action.collectionId);
	if (collection.some(shouldBeRemoved)) {
		return state.setIn(action.collectionId, collection.filterNot(shouldBeRemoved));
	}
	return state;
}

function deleteMapElements(state, action) {
	const collection = state.getIn(action.collectionId);

	if (action.operations.delete.some(id => collection.has(id))) {
		const changedCollection = action.operations.delete.reduce(
			(collectionAccu, element) => collectionAccu.delete(element),
			collection,
		);
		return state.setIn(action.collectionId, changedCollection);
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
		const collection = state.getIn(action.collectionId);
		if (Map.isMap(collection)) {
			return deleteMapElements(state, action);
		} else if (List.isList(collection)) {
			return deleteListElements(state, action);
		}
		throw new Error('CMF collection deletion is only compatible with ImmutableJs List and Map');
	}
	return state;
}

function updateListElements(state, action) {
	const updates = action.operations.update;

	const changedCollection = state
		.getIn(action.collectionId)
		.map(element => updates[getId(element)] || element);
	return state.setIn(action.collectionId, changedCollection);
}

function updateMapElements(state, action) {
	const updates = action.operations.update;
	const changedCollection = Object.keys(updates).reduce(
		(collectionAccu, id) => collectionAccu.set(id, updates[id]),
		state.getIn(action.collectionId),
	);
	return state.setIn(action.collectionId, changedCollection);
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
		const collection = state.getIn(action.collectionId);
		if (Map.isMap(collection)) {
			return updateMapElements(state, action);
		} else if (List.isList(collection)) {
			return updateListElements(state, action);
		}
		throw new Error('CMF collection update is only compatible with ImmutableJs List and Map');
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
	if (!action.operations || !state.hasIn(action.collectionId) || state.isEmpty()) {
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
			return state.setIn(newAction.collectionId, fromJS(newAction.data));
		case CONSTANTS.COLLECTION_REMOVE:
			if (!state.getIn(newAction.collectionId)) {
				invariant(
					process.env.NODE_ENV === 'production',
					`Can't remove collection ${newAction.collectionId} since it doesn't exist.`,
				);
				return state;
			}
			return state.deleteIn(newAction.collectionId);
		case CONSTANTS.COLLECTION_MUTATE:
			return mutateCollection(state, newAction);
		default:
			return state;
	}
}

export default collectionsReducers;
