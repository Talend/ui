import {
	HTTP_METHODS,
	HTTP_REQUEST,
	HTTP_RESPONSE,
	HTTP_ERRORS,
} from './constants';

export const DEFAULT_HTTP_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export function isHTTPRequest(action) {
	return action.type in HTTP_METHODS;
}

/**
 * @param  {Object} action redux action, sjhould cotains *method* attribute
 * @return {String}        in known HTTP methods
 */
export function getMethod(action) {
	return HTTP_METHODS[action.type];
}

export function httpRequest(url, config) {
	return {
		type: HTTP_REQUEST,
		url,
		config,
	};
}

export function httpErrors(errors) {
	return {
		type: HTTP_ERRORS,
		errors,
	};
}

export function httpResponse(response) {
	return {
		type: HTTP_RESPONSE,
		data: response,
	};
}

export function mergeOptions(action) {
	const options = Object.assign({
		method: getMethod(action),
		headers: DEFAULT_HTTP_HEADERS,
	}, action);

	if (typeof options.body === 'object') {
		options.body = JSON.stringify(options.body);
	}
	delete options.type;
	return options;
}

export function onResponse(action, response) {
	if (typeof action.onResponse === 'function') {
		return action.onResponse(response);
	}
	return {
		type: action.onResponse,
		response,
	};
}

export function onError(action, errors) {
	if (typeof action.onError === 'function') {
		return action.onError(errors);
	}
	return {
		type: action.onError,
		errors,
	};
}

export const httpMiddleware = store => next => (action) => {
	if (!isHTTPRequest(action)) {
		return next(action);
	}
	const config = mergeOptions(action);
	store.dispatch(httpRequest(action.url, config));
	if (action.onSend) {
		store.dispatch({
			type: action.onSend,
			action,
		});
	}
	return fetch(action.url, config)
		.then(response => response.json())
		.then((response) => {
			const newAction = Object.assign({}, action);
			store.dispatch(httpResponse(response));
			if (newAction.transform) {
				newAction.response = newAction.transform(response);
			} else {
				newAction.response = response;
			}
			if (newAction.onResponse) {
				store.dispatch(onResponse(newAction, newAction.response));
			}
			return next(newAction);
		})
		.catch((errors) => {
			store.dispatch(httpErrors(errors));
			if (action.onError) {
				store.dispatch(onError(action, errors));
			}
		});
};
