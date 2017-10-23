import { actions } from '@talend/react-cmf';
import { GETTING_DATASTORES, ERROR_GETTING_DATASTORES } from '../constants';

export function fetchDataStores() {
	/**
	 * CMF actions.http is an action creator that will dispatch an http action.
	 * This action will be caught and executed by the CMF http middleware
	 */
	return actions.http.get('/datastores.json', {
		// action type to dispatch before fetch
		onSend: GETTING_DATASTORES,
		// action type to dispatch on fetch error
		onError: ERROR_GETTING_DATASTORES,
		// CMF action config
		// collectionId is the key where the result will be stored in app state
		cmf: {
			collectionId: 'datastores',
		},
	});
}
