/**
 * @module react-cmf/lib/actions
 * @see module:react-cmf/lib/actions/collectionsActions
 * @see module:react-cmf/lib/actions/componentsActions
 * @see module:react-cmf/lib/actions/settingsActions
 */
import * as collectionsActions from './collectionsActions';
import * as componentsActions from './componentsActions';
import * as settingsActions from './settingsActions';
import * as saga from './saga';
import http from './http';

/**
 * exported API
 * @example
	import {
	collectionsActions,
	componentsActions,
	settingsActions
} from 'react-cmf/lib/actions';
 * @type {Object}
 */
export default {
	collectionsActions,
	componentsActions,
	settingsActions,
	http,
	collections: collectionsActions,
	components: componentsActions,
	settings: settingsActions,
	saga,
};
