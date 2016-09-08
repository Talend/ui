import { Map, fromJS } from 'immutable';
import ACTIONS from '../actions';

export const defaultState = new Map();

export function collectionsReducer(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.collectionsActions.COLLECTION_ADD_OR_REPLACE:
		return state.set(action.collectionId, fromJS(action.data));
	case ACTIONS.collectionsActions.COLLECTION_REMOVE:
		return state.delete(action.collectionId);
	default:
		return state;
	}
}

export default collectionsReducer;
