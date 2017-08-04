import has from 'lodash/has';
import get from 'lodash/get';
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
	return action.type in HTTP_METHODS || has(action, 'cmf.http');
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

export function httpError(error) {
	return {
		type: HTTP_ERRORS,
		error,
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
		credentials: 'same-origin',
	}, action);

	if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
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

export function onError(action, error) {
	if (typeof action.onError === 'function') {
		return action.onError(error);
	}
	return {
		type: action.onError,
		error,
	};
}

export function HTTPError(response) {
	let headers = get(response, 'headers/values');
	if (headers) {
		headers = [...headers()];
	}
	this.name = `HTTP ${response.status}`;
	this.message = response.statusText;
	this.stack = {
		response,
		headers,
		status: response.status,
		statusText: response.statusText,
		ok: response.ok,
		redirected: response.redirected,
		type: response.type,  // basic, cors
		url: response.url,
	};
}
HTTPError.prototype = Object.create(Error.prototype);
HTTPError.prototype.constructor = HTTPError;

export function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	}
	return Promise.reject(new HTTPError(response));
}

export function handleResponse(response) {
	if (response.status === 204) {
		return Promise.resolve({});
	}
	if (response.json) {
		return response.json();
	}
	return Promise.reject(new HTTPError(response));
}

export const httpMiddleware = ({ dispatch }) => next => (action) => {
	if (!isHTTPRequest(action)) {
		return next(action);
	}
	const httpAction = get(action, 'cmf.http', action);
	const config = mergeOptions(httpAction);
	dispatch(httpRequest(httpAction.url, config));
	if (httpAction.onSend) {
		dispatch({
			type: httpAction.onSend,
			httpAction,
		});
	}
	const onHTTPError = (error) => {
		const errorObject = {
			name: error.name,
			message: error.description || error.message,
			number: error.number,
			stack: error.stack,
		};
		const clone = get(error, 'stack.response.clone');
		if (!clone) {
			dispatch({
				type: 'HTTP_REDUCE_ERROR',
				error: errorObject,
				action: httpAction,
			});
		} else {
			// clone the response object else the next call to text or json
			// triggers an exception Already use
			error.stack.response.clone().text().then((response) => {
				try {
					errorObject.stack.response = response;
					errorObject.stack.messageObject = JSON.parse(response);
				} finally {
					if (httpAction.onError) {
						dispatch(onError(httpAction, errorObject));
					} else {
						dispatch(httpError(errorObject));
					}
				}
			});
		}
	};
	return fetch(httpAction.url, config)
		.then(status)
		.then(handleResponse)
		.then((response) => {
			const newAction = Object.assign({}, action);
			dispatch(httpResponse(response));
			if (newAction.transform) {
				newAction.response = newAction.transform(response);
			} else {
				newAction.response = response;
			}
			if (newAction.onResponse) {
				dispatch(onResponse(newAction, newAction.response));
			}
			return next(newAction);
		})
		.catch(onHTTPError);
};
