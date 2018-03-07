import { call, put } from 'redux-saga/effects';
import merge from 'lodash/merge';
import curry from 'lodash/curry';

import { mergeCSRFToken } from '../middlewares/http/csrfHandling';
import {
	ACTION_TYPE_HTTP_ERRORS,
	HTTP_METHODS,
	HTTP_STATUS,
	testHTTPCode,
} from '../middlewares/http/constants';

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

/**
 * function - wrap the fetch request with the actions errors
 *
 * @param  {string} url                       url to request
 * @param  {object} config                    option that you want apply to the request
 * @param  {string} method = HTTP_METHODS.GET method to apply
 * @param  {object} payload                   payload to send with the request
 * @return {object}                           the response of the request
 */
export function* wrapFetch(url, config, method = HTTP_METHODS.GET, payload) {
	const answer = yield call(httpFetch, url, config, method, payload);

	if (answer instanceof Error) {
		yield put({
			error: { message: answer.data.message, stack: { status: answer.response.status } },
			type: ACTION_TYPE_HTTP_ERRORS,
		});
	}

	return answer;
}

/**
 * function - fetch a url with POST method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.post, '/foo', {foo: 42});
 */
export function* httpPost(url, payload, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.POST, payload);
}

/**
 * function - fetch a url with PATCH method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.patch, '/foo', {foo: 42});
 */
export function* httpPatch(url, payload, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.PATCH, payload);
}

/**
 * function - fetch a url with PUT method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.put, '/foo', {foo: 42});
 */
export function* httpPut(url, payload, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.PUT, payload);
}

/**
 * function - fetch a url with DELETE method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.delete, '/foo');
 */
export function* httpDelete(url, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.DELETE);
}

/**
 * function - fetch a url with GET method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.get, '/foo');
 */
export function* httpGet(url, config) {
	return yield* wrapFetch(url, config);
}

export const handleDefaultConfiguration = curry((defaultConfig, config) =>
	mergeCSRFToken(defaultConfig, config),
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
			delete: function* configuredDelete(url, config = {}) {
				return yield call(httpDelete, url, configEnhancer(config));
			},
			get: function* configuredGet(url, config = {}) {
				return yield call(httpGet, url, configEnhancer(config));
			},
			post: function* configuredPost(url, payload, config = {}) {
				return yield call(httpPost, url, payload, configEnhancer(config));
			},
			put: function* configuredPut(url, payload, config = {}) {
				return yield call(httpPut, url, payload, configEnhancer(config));
			},
			patch: function* configuredPatch(url, payload, config = {}) {
				return yield call(httpPatch, url, payload, configEnhancer(config));
			},
		};
	},
};
