/**
 * @module react-cmf/lib/reducers/collectionsReducers
 */
import { Map, List, fromJS } from 'immutable';
import ACTIONS from '../actions';

export const defaultState = new Map();

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
			const element = s.get(action.id);
			if (List.isList(element)) {
				return s.set(action.id, element.push(e));
			}
			if (Map.isMap(element)) {
				return s.set(action.id, element.merge(e));
			}
			return state;
		}, state);
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
		return action.operations.delete.reduce((s, e) =>
			s.set(action.id, s.get(action.id).delete(e)),
		state);
	}
	return state;
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
		return Object.keys(action.operations.update).reduce((s, e) =>
			s.set(action.id, s.get(action.id).set(e, action.operations.update[e])),
		state);
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
	if (!action.operations || !state.has(action.id) || state.isEmpty()) {
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
export function collectionsReducers(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.collectionsActions.COLLECTION_ADD_OR_REPLACE:
		return state.set(action.collectionId, fromJS(action.data));
	case ACTIONS.collectionsActions.COLLECTION_REMOVE:
		return state.delete(action.collectionId);
	case ACTIONS.collectionsActions.COLLECTION_MUTATE:
		return mutateCollection(state, action);
	default:
		return state;
	}
}

export default collectionsReducers;
