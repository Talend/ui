import { Map, fromJS } from 'immutable';
import ACTIONS from '../actions';

const defaultState = new Map();

export function collectionsReducer(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.collectionsActions.COLLECTION_ADD_OR_REPLACE:
		return Object.assign({}, state, {
			collections: state.collections.set(action.collectionId, fromJS(action.data)),
		});
	case ACTIONS.collectionsActions.COLLECTION_REMOVE:
		return Object.assign({}, state, {
			collections: state.collections.delete(action.collectionId),
		});
	default:
		return state;
	}
}

export default collectionsReducer;
