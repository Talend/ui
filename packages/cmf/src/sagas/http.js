import { call, put } from 'redux-saga/effects';
import merge from 'lodash/merge';
import curry from 'lodash/curry';
import get from 'lodash/get';
import api from '../api';

import { mergeCSRFToken } from '../middlewares/http/csrfHandling';
import {
	ACTION_TYPE_HTTP_ERRORS,
	HTTP_METHODS,
	HTTP_STATUS,
	testHTTPCode,
} from '../middlewares/http/constants';
import {
	onRequest,
	onResponse as onHttpResponse,
	onError as onHttpError,
	onActionResponse,
	onActionError,
	onJSError,
} from '../actions/http';

export class HTTPError extends Error {
	constructor({ data, response }) {
		super(response.statusText);

		this.name = `HTTP ${response.status}`;
		this.data = data;
		this.response = response;
	}
}

/**
 * handleHttpResponse - handle the http body
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that resolves with the result of parsing the body
 */
export function handleBody(response) {
	let methodBody = 'text';

	const contentType = response.headers.get('Content-Type');

	if (contentType && contentType.includes('application/json')) {
		methodBody = 'json';
	}
	return response[methodBody]().then(data => ({ data, response }));
}

/**
 * handleHttpResponse - handle the http error
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that reject with the result of parsing the body
 */
export function handleError(response) {
	return handleBody(response).then(body => new HTTPError(body));
}

/**
 * handleHttpResponse - handle the http response
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that:
 * - resolves with the result of parsing the body
 * - reject the response
 */
export function handleHttpResponse(response) {
	if (!testHTTPCode.isSuccess(response.status)) {
		return Promise.reject(response);
	}
	if (response.status === HTTP_STATUS.NO_CONTENT) {
		return Promise.resolve({
			data: '',
			response,
		});
	}

	return handleBody(response);
}

/**
 * httpFetch - call the api fetch to request the url
 *
 * @param  {string} url                       url to request
 * @param  {object} config                    option that you want apply to the request
 * @param  {string} method = HTTP_METHODS.GET method to apply
 * @param  {object} payload                   payload to send with the request
 * @return {Promise}                          A Promise that resolves to a Response object.
 */
export function httpFetch(url, config, method, payload) {
	let body;
	const defaultHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};
	/**
	 * If the playload is an instance of FormData the body should be set to this object
	 * and the Content-type header should be stripped since the browser
	 * have to build a special headers with file boundary in if said FormData is used to upload file
	 */
	if (payload instanceof FormData) {
		body = payload;
		delete defaultHeaders['Content-Type'];
	} else {
		body = JSON.stringify(payload);
	}
	return fetch(
		url,
		merge(
			{
				credentials: 'same-origin',
				headers: defaultHeaders,
				method,
				body,
			},
			config,
		),
	)
		.then(handleHttpResponse)
		.catch(handleError);
}
export function cloneError(initialError, resultError) {
	const errorToEnrich = Object.assign({}, resultError);
	return initialError.stack.response
		.clone()
		.text()
		.then(response => {
			try {
				errorToEnrich.stack.response = response;
				errorToEnrich.stack.messageObject = JSON.parse(response);
				return Promise.resolve(errorToEnrich);
			} catch (exception) {
				errorToEnrich.stack.messageObject = 'Parsing response error';
				return Promise.reject(errorToEnrich);
			}
		});
}
export function* errorProcessing(error, httpAction) {
	const errorObject = {
		name: error.name,
		message: error.description || error.message,
		number: error.number,
		stack: error.stack,
	};
	const clone = get(error, 'stack.response.clone');
	if (!clone) {
		yield put(onJSError(errorObject, httpAction));
	} else {
		// clone the response object else the next call to text or json
		// triggers an exception Already use
		const clonedError = cloneError(error);
		if (httpAction.onError) {
			yield put(onActionError(httpAction, clonedError));
		}

		if (typeof httpAction.onError !== 'function') {
			yield put(onHttpError(httpAction, clonedError));
		}
	}
}

/**
 * function - wrap the fetch request with the actions errors
 *
 * @param  {string} url                       url to request
 * @param  {object} config                    option that you want apply to the request
 * @param  {string} method = HTTP_METHODS.GET method to apply
 * @param  {object} payload                   payload to send with the request
 * @param  {object} options                   options to deal with cmf automatically
 * @return {object}                           the response of the request
 */
export function* wrapFetch(
	url,
	config,
	method = HTTP_METHODS.GET,
	payload,
	{ silent, onSend, onResponse, onError, transform, collectionId, responseSelector },
) {
	if (!silent) {
		yield put(onRequest(url, config));
	}
	if (onSend) {
		yield put({ type: onSend });
	}
	const answer = yield call(httpFetch, url, config, method, payload);

	if (!silent) {
		if (answer instanceof Error) {
			yield put(
				onHttpError({
					error: {
						message: answer.data.message,
						stack: { status: answer.response.status },
					},
				}),
			);
		} else {
			yield put(onHttpResponse(answer));
		}
	}
	if (answer instanceof Error) {
		yield call(errorProcessing, answer, { onError });
	}
	const extractedData = responseSelector ? get(answer, responseSelector, answer) : answer;
	const transformedData = transform ? transform(extractedData) : extractedData;

	if (collectionId) {
		console.log('api', api);
		yield put(api.actions.collections.addOrReplace(collectionId, transformedData));
	}
	if (onResponse) {
		yield put(onActionResponse({ onResponse }, transformedData));
	}

	return transformedData;
}

/**
 * function - fetch a url with POST method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.post, '/foo', {foo: 42});
 */
export function* httpPost(url, payload, config, options) {
	return yield* wrapFetch(url, config, HTTP_METHODS.POST, payload, options);
}

/**
 * function - fetch a url with PATCH method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.patch, '/foo', {foo: 42});
 */
export function* httpPatch(url, payload, config, options) {
	return yield* wrapFetch(url, config, HTTP_METHODS.PATCH, payload, options);
}

/**
 * function - fetch a url with PUT method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.put, '/foo', {foo: 42});
 */
export function* httpPut(url, payload, config, options) {
	return yield* wrapFetch(url, config, HTTP_METHODS.PUT, payload, options);
}

/**
 * function - fetch a url with DELETE method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.delete, '/foo');
 */
export function* httpDelete(url, config, options) {
	return yield* wrapFetch(url, config, HTTP_METHODS.DELETE, undefined, options);
}

/**
 * function - fetch a url with GET method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.get, '/foo');
 */
export function* httpGet(url, config, options) {
	return yield* wrapFetch(url, config, HTTP_METHODS.GET, undefined, options);
}

export const handleDefaultConfiguration = curry((defaultConfig, config) =>
	mergeCSRFToken(defaultConfig)(config),
);

export default {
	delete: httpDelete,
	get: httpGet,
	post: httpPost,
	put: httpPut,
	patch: httpPatch,
	create(defaultConfig = {}) {
		const configEnhancer = handleDefaultConfiguration(defaultConfig);
		return {
			delete: function* configuredDelete(url, config = {}, options = {}) {
				return yield call(httpDelete, url, configEnhancer(config), options);
			},
			get: function* configuredGet(url, config = {}, options = {}) {
				return yield call(httpGet, url, configEnhancer(config), options);
			},
			post: function* configuredPost(url, payload, config = {}, options = {}) {
				return yield call(httpPost, url, payload, configEnhancer(config), options);
			},
			put: function* configuredPut(url, payload, config = {}, options = {}) {
				return yield call(httpPut, url, payload, configEnhancer(config), options);
			},
			patch: function* configuredPatch(url, payload, config = {}, options = {}) {
				return yield call(httpPatch, url, payload, configEnhancer(config), options);
			},
		};
	},
};
