/**
 * @module react-cmf/lib/actions/settingsActions
 */
import get from 'lodash/get';

import http from './http';
import CONSTANTS from '../constant';

// keep backward compatibility
export const { REQUEST_OK, REQUEST_KO, REQUEST_SETTINGS } = CONSTANTS;

export function requestSettings() {
	return {
		type: CONSTANTS.REQUEST_SETTINGS,
	};
}

export function receiveSettings(json) {
	return {
		type: CONSTANTS.REQUEST_OK,
		settings: json,
		receivedAt: Date.now(),
	};
}

export function errorWithSettings(error) {
	return {
		type: CONSTANTS.REQUEST_KO,
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
	return http.get(path, {
		onResponse: response => receiveSettings(response),
		onError: error => errorWithSettings(error),
	});
}
