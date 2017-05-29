import { actions } from '@talend/react-cmf';
import { GETTING_DATASETS, ERROR_GETTING_DATASETS, MY_EXAMPLE_ACTION } from '../constants';

/**
 * Simple meaningless example
 * A simple action creator returns an action object that will be dispatched in redux
 */
export function doSomething() {
	return {
		type: MY_EXAMPLE_ACTION, // prefer constant variables stored in /src/app/constants
	};
}

/**
 * Complex example with http call
 */
export function fetchDataSets() {
	/**
	 * CMF actions.http is an action creator that will dispatch an http action.
	 * This action will be caught and executed by the CMF http middleware
	 */
	return actions.http.get('/datasets.json', {
		// action type to dispatch before fetch
		onSend: GETTING_DATASETS,
		// action type to dispatch on fetch error
		onError: ERROR_GETTING_DATASETS,
		// CMF action config
		// collectionId is the key where the result will be stored in app state
		cmf: {
			collectionId: 'datasets',
		},
		// data adaptation before being dispatched
		transform(data) {
			return data.map((row) => {
				const { datastore, ...rest } = row;
				return {
					datastore: datastore.label,
					...rest,
				};
			});
		},
	});
}
