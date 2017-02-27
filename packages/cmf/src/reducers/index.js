/**
 * @module react-cmf/lib/reducers
 * @see module:react-cmf/lib/reducers/collectionsReducers
 * @see module:react-cmf/lib/reducers/componentsReducers
 * @see module:react-cmf/lib/reducers/settingsReducers
 */
import { combineReducers } from 'redux';

import { collectionsReducers } from './collectionsReducers';
import { componentsReducers } from './componentsReducers';
import { httpRequestReducer } from './httpReducers';
import { settingsReducers } from './settingsReducers';

/**
 * exported API
 * @type {object}
 * @example
	import reducer from 'react-cmf/lib/reducers';
 */
export default combineReducers({
	collections: collectionsReducers,
	httpRequests: httpRequestReducer,
	components: componentsReducers,
	settings: settingsReducers,
});
