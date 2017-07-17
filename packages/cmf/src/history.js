// @flow
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import type { Store } from 'redux';

/**
 * @param  {object} store redux
 * @return {object} history for the router
 */
function get(store: Store<any, any>) {
	return syncHistoryWithStore(hashHistory, store);
}

export default {
	get,
};
