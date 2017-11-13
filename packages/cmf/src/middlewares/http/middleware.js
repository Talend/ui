import has from 'lodash/has';
import get from 'lodash/get';
import { mergeCSRFToken } from './csrfHandling';
import { HTTP_METHODS, ACTION_TYPE_HTTP_REQUEST, ACTION_TYPE_HTTP_RESPONSE, ACTION_TYPE_HTTP_ERRORS, HTTP_STATUS, testHTTPCode } from './constants';

/**
 * @typedef {Object} Action
 * @property {string} type - Action type
 */

/**
 * @typedef {Object} Response
 * @property {string} status
 * @property {string} statusText
 * @property {string} ok
 * @property {string} redirected
 * @property {string} type
 * @property {string} url
 */

/**
 * @typedef {Object} Stack
 * @property {Object} response
 * @property {Object} message
 */

/**
 * @typedef {Object} HttpError
 * @property {string} name
 * @property {string} message
 * @property {string} number
 * @property {Stack} stack
*/

/**
 * @typedef {Object.<string, string>} Headers
 */

/**
 * @callback onError
 * @param {HTTPConfig} action
 * @param {HttpError} error
 * @return {Action}
 */

/**
 * @callback onResponse
 * @param {HTTPConfig} action
 * @param {Object} response
 * @return {Action}
 */

/**
 * @typedef {Object} HTTPConfig
 * @property {string} body
 * @property {string} credentials
 * @property {Headers} headers
 * @property {string} method - See ./constants.js for a list of suitable method
 * @property {onError | string} onError
 * @property {onResponse | string} onResponse
 * @property {string} onSend - a redux action type
 */

/**
 * @typedef {Object} Security
 * @property {String} CSRFTokenCookieKey - on wich value the token should be found in the cookie
 * @property {String} CSRFTokenHeaderKey - on wich header key the token should be sent
 */

 /**
  * @typedef {Object} Config
  * @property {Security} security
  */

export const DEFAULT_HTTP_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

/**
 * check if the provided redux action contain element relative to a
 * fetch side effect.
 * If the Action contain nested keys 'cmf.http' it is a fetch descriptor
 * thus return True
 * @param {Action} action
 * @returns {bool}
 */
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
		type: ACTION_TYPE_HTTP_REQUEST,
		url,
		config,
	};
}

/**
 * transform an HttpError to a dispatchable action
 * @param {HttpError} error
 * @returns {Action}
 */
export function httpError(error) {
	return {
		type: ACTION_TYPE_HTTP_ERRORS,
		error,
	};
}

export function httpResponse(response) {
	return {
		type: ACTION_TYPE_HTTP_RESPONSE,
		data: response,
	};
}

/**
 * Merge fetch configuration from action into some default configuration
 * @param {HTTPConfig} action
 * @return {HTTPConfig}
 */
export function mergeOptions(action) {
	const options = Object.assign(
		{
			method: getMethod(action),
			headers: DEFAULT_HTTP_HEADERS,
			credentials: 'same-origin',
		},
		action,
	);

	if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
		options.body = JSON.stringify(options.body);
	}

	delete options.type;
	return options;
}

/**
 * @function onResponse
 */
export function onResponse(action, response) {
	if (typeof action.onResponse === 'function') {
		return action.onResponse(response);
	}
	return {
		type: action.onResponse,
		response,
	};
}

/**
 * @function onError
 */
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
		type: response.type, // basic, cors
		url: response.url,
	};
}
HTTPError.prototype = Object.create(Error.prototype);
HTTPError.prototype.constructor = HTTPError;

function configureHttpErrorCallBack(dispatch, httpAction) {
	const onHTTPError = error => {
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
			error.stack.response
				.clone()
				.text()
				.then(response => {
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
	return onHTTPError;
}

export function status(response) {
	if (testHTTPCode.isSuccess(response.status)) {
		return Promise.resolve(response);
	}
	return Promise.reject(new HTTPError(response));
}

export function handleResponse(response) {
	if (response.status === HTTP_STATUS.NO_CONTENT) {
		return Promise.resolve({});
	}
	if (response.json) {
		return response.json();
	}
	return Promise.reject(new HTTPError(response));
}

/**
 * @param {Config} middlewareDefaultConfig
 */
export const httpMiddleware = (middlewareDefaultConfig = {}) => ({
	dispatch,
}) => next => action => {
	if (!isHTTPRequest(action)) {
		return next(action);
	}
	const httpAction = get(action, 'cmf.http', action);
	const config = mergeCSRFToken(middlewareDefaultConfig, mergeOptions(httpAction));
	dispatch(httpRequest(httpAction.url, config));
	if (httpAction.onSend) {
		dispatch({
			type: httpAction.onSend,
			httpAction,
		});
	}
	const onHTTPError = configureHttpErrorCallBack(dispatch, httpAction);
	return fetch(httpAction.url, config)
		.then(status)
		.then(handleResponse)
		.then(response => {
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
