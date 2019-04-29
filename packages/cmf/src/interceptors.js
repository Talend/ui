/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const interceptors = [];

/**
 * @private
 * this function remove all interceptors. Should be used only in tests.
 */
function _clear() {
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
	if (!interceptor.request && !interceptor.response) {
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
function push(interceptor) {
	if (isInterceptor(interceptor)) {
		interceptors.push(
			Object.assign(
				{
					// add default error handler
					requestError: error => console.error(error),
					responseError: error => console.error(error),
				},
				interceptor,
			),
		);
	} else {
		console.error('CMF.interceptors.push not a valid interceptor', interceptor);
	}
}

/**
 * @private
 * consume interceptors attribute passing argument to it
 * @param {Array} interceptors copy of it
 * @param {string} attr the attribute of interceptor to use. one of ['request', 'response']
 * @param {Object} argument the data to pass to each interceptor
 */
function consume(arr, attr, argument) {
	if (arr.length === 0) {
		return argument;
	}
	const pop = arr.pop();
	if (!pop[attr]) {
		return consume(arr, attr, argument);
	}
	let result;
	const onError = pop[`${attr}Error`];
	try {
		result = pop[attr](argument);
	} catch (error) {
		if (onError) {
			result = onError(error, argument);
		} else {
			throw error;
		}
	}
	if (result && result.then) {
		return result
			.then(newConfig => consume(arr, attr, newConfig))
			.catch(error => {
				if (onError) {
					return onError(error, argument);
				}
				throw error;
			});
	}
	return consume(arr, attr, result);
}

/**
 * @private
 * onData is the common caller to interceptors
 * @param {string} event one of ['request', 'response']
 * @param {Object}
 */
function onData(event, data) {
	const copy = interceptors.slice(0);
	const result = consume(copy, event, data);
	if (result.then) {
		return result;
	}
	return new Promise(resolve => {
		resolve(result);
	});
}

/**
 * onRequest consume all interceptors to enrich the config argument
 * @param {Object} config http config object
 * @return {Promise} config object
 */
function onRequest(config) {
	return onData('request', config);
}

/**
 * onResponse consume all interceptors to enrich the response object
 * @param {Object} response http response object
 * @return {Promise} response object
 */
function onResponse(response) {
	return onData('response', response);
}

export default {
	push,
	onRequest,
	onResponse,
	_clear,
};
