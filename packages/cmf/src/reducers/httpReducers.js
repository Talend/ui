/**
 * @module react-cmf/lib/reducers/collectionsReducers
 */
import { Map } from 'immutable';
import ACTIONS from '../actions';

export const defaultState = new Map();

/**
 * @param  {object} state  the state
 * @param  {object} action redux action
 * @return {object}        the new state
 */
export function httpRequestReducer(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.collectionsActions.COLLECTION_ADD_OR_REPLACE:
		if (action.http) {
			return state.set(action.collectionId, action.http);
		}
		break;
	default:
		return state;
	}
}

export default httpRequestReducer;
