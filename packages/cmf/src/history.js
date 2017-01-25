import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

/**
 * @param  {object} store redux
 * @return {object} history for the router
 */
function get(store) {
	return syncHistoryWithStore(hashHistory, store);
}

export default {
	get,
};
