/**
 * @module react-cmf/lib/reducers/settingsReducers
 */
import get from 'lodash/get';
import * as ACTIONS from '../actions/settingsActions';

export const defaultState = {
	initialized: false,
	contentTypes: {},
	actions: {},
	views: {},
	routes: {},
	ref: {},
};

/**
 * handle actions related to the settings
 * @param  {object} state  initial state
 * @param  {object} action redux aciton
 * @return {object}        new state
 */
export function settingsReducers(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.REQUEST_OK:
		return Object.assign({}, state, {
			initialized: true,
		}, action.settings);
	case ACTIONS.REQUEST_KO:
		alert(`Settings can't be loaded ${get(action, 'error.message')}`);  // eslint-disable-line
		console.error(action.error);  // eslint-disable-line
		return Object.assign({}, state, {
			initialized: true,
		}, action.settings);
	default:
		return state;
	}
}

export default settingsReducers;
