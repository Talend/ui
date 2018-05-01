import { call, put } from 'redux-saga/effects';
import merge from 'lodash/merge';
import curry from 'lodash/curry';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import actions from '../actions';

import { mergeCSRFToken } from '../middlewares/http/csrfHandling';
import { HTTP_METHODS, HTTP_STATUS, testHTTPCode } from '../middlewares/http/constants';
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
	// BREAKING CHANGE to allow Go-like error handling
	return handleBody(response).then(body => ({ error: new HTTPError(body) }));
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

export const handleDefaultConfiguration = curry((defaultConfig, config) =>
	mergeCSRFToken(defaultConfig)(config),
);

function normalizeParameters(
	urlOrBag,
	config,
	method = HTTP_METHODS.GET,
	payload,
	cmf,
	defaultConfig,
) {
	const configEnhancer = handleDefaultConfiguration(defaultConfig);
	if (isObject(urlOrBag)) {
		return {
			...urlOrBag,
			config: configEnhancer(urlOrBag.config),
		};
	}

	return {
		url: urlOrBag,
		config: configEnhancer(config),
		method,
		payload,
		cmf,
	};
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
	urlOrBag,
	config,
	method = HTTP_METHODS.GET,
	payload,
	cmf = {},
	defaultConfig,
) {
	const normalizedParameters = normalizeParameters(
		urlOrBag,
		config,
		method,
		payload,
		cmf,
		defaultConfig,
	);

	if (!normalizedParameters.cmf.silent) {
		yield put(onRequest(normalizedParameters.url, normalizedParameters.config));
	}
	if (normalizedParameters.cmf.onSend) {
		yield put({ type: normalizedParameters.cmf.onSend });
	}
	const answer = yield call(
		httpFetch,
		normalizedParameters.url,
		normalizedParameters.config,
		normalizedParameters.method,
		normalizedParameters.payload,
	);

	if (!normalizedParameters.cmf.silent) {
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
		yield call(errorProcessing, answer, { onError: normalizedParameters.cmf.onError });
	}
	const extractedData = normalizedParameters.cmf.responseSelector
		? get(
				answer,
				normalizedParameters.cmf.responseSelector,
				normalizedParameters.cmf.responseDefaultValue
					? normalizedParameters.cmf.responseDefaultValue
					: answer,
		  )
		: answer;
	const transformedData = normalizedParameters.cmf.transform
		? normalizedParameters.cmf.transform(extractedData)
		: extractedData;

	if (normalizedParameters.cmf.collectionId) {
		yield put(
			actions.collections.addOrReplace(normalizedParameters.cmf.collectionId, transformedData),
		);
	}
	if (normalizedParameters.cmf.onResponse) {
		yield put(
			onActionResponse({ onResponse: normalizedParameters.cmf.onResponse }, transformedData),
		);
	}

	return transformedData;
}

/**
 * function - fetch a url with POST method
 *
 * @param  {string} urlOrBag    url to request or bag of config(http+cmf)
 * @param  {object} payload 	payload to send with the request
 * @param  {object} config  	option that you want apply to the request
 * @param  {object} options 	options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.post, '/foo', {foo: 42});
 */
export function* httpPost(urlOrBag, payload, config, options, defaultConfig) {
	return yield* wrapFetch(urlOrBag, config, HTTP_METHODS.POST, payload, options, defaultConfig);
}

/**
 * function - fetch a url with PATCH method
 *
 * @param  {string} urlOrBag    url to request or bag of config(http+cmf)
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.patch, '/foo', {foo: 42});
 */
export function* httpPatch(urlOrBag, payload, config, options, defaultConfig) {
	return yield* wrapFetch(urlOrBag, config, HTTP_METHODS.PATCH, payload, options, defaultConfig);
}

/**
 * function - fetch a url with PUT method
 *
 * @param  {string} urlOrBag    url to request or bag of config(http+cmf)
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.put, '/foo', {foo: 42});
 */
export function* httpPut(urlOrBag, payload, config, options, defaultConfig) {
	return yield* wrapFetch(urlOrBag, config, HTTP_METHODS.PUT, payload, options, defaultConfig);
}

/**
 * function - fetch a url with DELETE method
 *
 * @param  {string} urlOrBag    url to request or bag of config(http+cmf)
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.delete, '/foo');
 */
export function* httpDelete(urlOrBag, config, options, defaultConfig) {
	return yield* wrapFetch(urlOrBag, config, HTTP_METHODS.DELETE, undefined, options, defaultConfig);
}

/**
 * function - fetch a url with GET method
 *
 * @param  {string} urlOrBag    url to request or bag of config(http+cmf)
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.get, '/foo');
 */
export function* httpGet(urlOrBag, config, options, defaultConfig) {
	return yield* wrapFetch(urlOrBag, config, HTTP_METHODS.GET, undefined, options, defaultConfig);
}

/**
 * function - fetch a url with POST method
 *
 * @param  {string} urlOrBag    url to request or bag of config(http+cmf)
 * @param  {object} defaultConfig  	defaultConfig of the http client
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.post, '/foo', {foo: 42});
 */
export function* http(urlOrBag, defaultConfig) {
	return yield* wrapFetch(
		urlOrBag,
		urlOrBag.config,
		HTTP_METHODS[urlOrBag.method],
		urlOrBag.payload,
		urlOrBag.options,
		defaultConfig,
	);
}

function createClient(defaultConfig = {}) {
	return {
		delete: function* configuredDelete(urlOrBag, config = {}, options = {}) {
			return yield call(httpDelete, urlOrBag, config, options, defaultConfig);
		},
		get: function* configuredGet(urlOrBag, config = {}, options = {}) {
			return yield call(httpGet, urlOrBag, config, options, defaultConfig);
		},
		post: function* configuredPost(urlOrBag, payload, config = {}, options = {}) {
			return yield call(httpPost, urlOrBag, payload, config, options, defaultConfig);
		},
		put: function* configuredPut(urlOrBag, payload, config = {}, options = {}) {
			return yield call(httpPut, urlOrBag, payload, config, options, defaultConfig);
		},
		patch: function* configuredPatch(urlOrBag, payload, config = {}, options = {}) {
			return yield call(httpPatch, urlOrBag, payload, config, options, defaultConfig);
		},
		fetch: function* configuredFetch(urlOrBag) {
			return yield call(http, urlOrBag, defaultConfig);
		},
	};
}

export default {
	delete: httpDelete,
	get: httpGet,
	post: httpPost,
	put: httpPut,
	patch: httpPatch,
	fetch: httpFetch,
	create: createClient,
};
