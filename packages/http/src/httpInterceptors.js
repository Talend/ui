/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import { handleHttpResponse, encodePayload, handleHeaders } from './interceptors-core';

const interceptors = [
	{ request: handleHeaders },
	{ request: encodePayload },
	{ response: handleHttpResponse },
];

/**
 * @private
 * this function remove all interceptors. Should be used only in tests.
 */
export function _clear() {
	interceptors.length = 0;
}

/**
 * @private
 * isInterceptor do some check on the interceptor: -
 * - must be an Object
 * - must have either 'request' or 'response' attribute
 * - interceptor.request must be a function
 * - interceptor.response must be a function
 * - interceptor.requestError must be a function
 * - interceptor.responseError must be a function
 * @param {object} interceptor to check
 * @return {boolean} true if interceptor is compliant with requirements
 */
function isInterceptor(interceptor) {
	if (!interceptor) {
		return false;
	}
	if (typeof interceptor !== 'object') {
		return false;
	}
	if (
		!interceptor.request &&
		!interceptor.response &&
		!interceptor.requestError &&
		!interceptor.responseError
	) {
		return false;
	}
	if (interceptor.request && typeof interceptor.request !== 'function') {
		return false;
	}
	if (interceptor.response && typeof interceptor.response !== 'function') {
		return false;
	}
	if (interceptor.requestError && typeof interceptor.requestError !== 'function') {
		return false;
	}
	if (interceptor.responseError && typeof interceptor.responseError !== 'function') {
		return false;
	}
	return true;
}

/**
 * interceptors.push let you add an interceptor
 * An interceptor is an object with the following keys: request, response.
 * Both are simple functions which take the config, response and returns enriched value
 * @param {Object} interceptor object to configure the interception
 */
export function push(interceptor) {
	if (isInterceptor(interceptor)) {
		interceptors.push(interceptor);
	} else {
		console.error('CMF.interceptors.push not a valid interceptor', interceptor);
	}
}

/**
 * @private
 * onData is the common caller to interceptors
 * @param {string} event one of ['request', 'response']
 * @param {Object}
 */
function onData(array, data) {
	// const copy = interceptors.slice(0);
	return array.reduce((acc, current) => {
		let result = acc;
		if (current.on) {
			try {
				result = acc.then(prev => current.on(prev));
			} catch (error) {
				result = Promise.reject(error);
			}
		}
		if (current.onError) {
			try {
				result = result.catch(error => current.onError(error));
			} catch (error) {
				result = Promise.reject(error);
			}
		}
		return Promise.resolve(result);
	}, Promise.resolve(data));
}

/**
 * onRequest consume all interceptors to enrich the config argument
 * @param {Object} config http config object
 * @return {Promise} config object
 */
export function onRequest(config) {
	const array = interceptors
		.filter(i => i.request || i.requestError)
		.map(i => ({ on: i.request, onError: i.requestError }));
	return onData(array, config);
}

/**
 * onResponse consume all interceptors to enrich the response object
 * @param {Object} response http response object
 * @return {Promise} response object
 */
export function onResponse(response) {
	const array = interceptors
		.filter(i => i.response || i.responseError)
		.map(i => ({ on: i.response, onError: i.responseError }))
		.reverse();
	return onData(array, response);
}
