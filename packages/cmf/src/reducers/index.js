/**
 * @module react-cmf/lib/reducers
 * @see module:react-cmf/lib/reducers/collectionsReducers
 * @see module:react-cmf/lib/reducers/componentsReducers
 * @see module:react-cmf/lib/reducers/settingsReducers
 */
import { combineReducers } from 'redux';

import collectionsReducers from './collectionsReducers';
import { componentsReducers } from './componentsReducers';
import { settingsReducers } from './settingsReducers';
import CONST from '../constant';

const defaultState = [];

/**
 * errorsReducer
 */
function errorsReducer(state = defaultState, action) {
	if (action.type === CONST.ERROR) {
		return state.concat(action.error);
	}
	return state;
}

/**
 * exported API
 * @type {object}
 * @example
	import reducer from 'react-cmf/lib/reducers';
 */
export default combineReducers({
	collections: collectionsReducers,
	components: componentsReducers,
	settings: settingsReducers,
	errors: errorsReducer,
});
