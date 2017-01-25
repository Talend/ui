/**
 * @module react-cmf/lib/actions/settingsActions
 */
import get from 'lodash/get';

export const REQUEST_SETTINGS = 'REACT_CMF.REQUEST_SETTINGS';
export const REQUEST_KO = 'REACT_CMF.REQUEST_SETTINGS_KO';
export const REQUEST_OK = 'REACT_CMF.REQUEST_SETTINGS_OK';

export function requestSettings() {
	return {
		type: REQUEST_SETTINGS,
	};
}

export function receiveSettings(json) {
	return {
		type: REQUEST_OK,
		settings: json,
		receivedAt: Date.now(),
	};
}

export function errorWithSettings(error) {
	return {
		type: REQUEST_KO,
		error: {
			message: get(error, 'message'),
			stack: get(error, 'stack'),
		},
	};
}

/**
 * get the settings on the server and dispatch the corresponding actions
 * this should be executed during the bootstrap of the App.
 * @param path Path of the settings.json file to fetch. Default 'settings.json'
 * @return {function} with the fetch process results
 */
export function fetchSettings(path = 'settings.json') {
	return (dispatch) => {
		dispatch(requestSettings());
		return fetch(path)
			.then(response => response.json())
			.then((json) => {
				dispatch(receiveSettings(json));
			}, (error) => {
				dispatch(errorWithSettings(error));
			});
	};
}
