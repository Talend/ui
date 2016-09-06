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
		error,
	};
}

export function fetchSettings() {
	return (dispatch) => {
		dispatch(requestSettings());
		return fetch('settings.json')
			.then((response) => response.json())
			.then((json) => {
				dispatch(receiveSettings(json));
			}, (error) => {
				dispatch(errorWithSettings(error));
			});
	};
}
