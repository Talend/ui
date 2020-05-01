import merge from 'lodash/merge';
import get from 'lodash/get';
import { mergeCSRFToken } from './middlewares/http/csrfHandling';
import { HTTP_STATUS, testHTTPCode, HTTP_METHODS } from './middlewares/http/constants';

/**
 * Storage point for the doc setup using `setDefaultConfig`
 */
export const HTTP = {
	defaultConfig: null,
};

/**
 * setDefaultHeader - define a default config to use with the saga http
 * this default config is stored in this module for the whole application
 *
 * @param  {object} config key/value of header to apply
 * @example
 * import { setDefaultConfig } from '@talend/react-cmf/sagas/http';
 * setDefaultConfig({headers: {
 *  'Accept-Language': preferredLanguage,
 * }});
 */
export function setDefaultConfig(config) {
	if (HTTP.defaultConfig) {
		throw new Error(
			'ERROR: setDefaultConfig should not be called twice, if you wish to change the language use setDefaultLanguage api.',
		);
	}

	HTTP.defaultConfig = config;
}

/**
 * To change only the Accept-Language default headers
 * on the global http defaultConfig
 * @param {String} language
 */
export function setDefaultLanguage(language) {
	if (get(HTTP, 'defaultConfig.headers')) {
		HTTP.defaultConfig.headers['Accept-Language'] = language;
	} else {
		// eslint-disable-next-line no-console
		throw new Error('ERROR: you should call setDefaultConfig.');
	}
}

/**
 * getDefaultConfig - return the defaultConfig
 *
 * @return {object}  the defaultConfig used by cmf
 */
export function getDefaultConfig() {
	return HTTP.defaultConfig;
}

/**
 * merge the CSRFToken handling rule from the module defaultConfig
 * into config argument
 * @param {Object} config
 * @returns {Function}
 */
export function handleCSRFToken(config) {
	return mergeCSRFToken({
		security: config.security,
	})(config);
}

export class HTTPError extends Error {
	constructor({ data, response }) {
		super(response.statusText);

		this.name = `HTTP ${response.status}`;
		this.data = data;
		this.response = response;
	}
}

/**
 * encodePayload - encore the payload if necessary
 *
 * @param  {object} headers request headers
 * @param  {object} payload payload to send with the request
 * @return {string|FormData} The encoded payload.
 */
export function encodePayload(headers, payload) {
	const type = headers['Content-Type'];

	if (payload instanceof FormData || typeof payload === 'string') {
		return payload;
	} else if (type && type.includes('json')) {
		return JSON.stringify(payload);
	}
	return payload;
}

/**
 * handleHttpResponse - handle the http body
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that resolves with the result of parsing the body
 */
export function handleBody(response) {
	let methodBody = 'text';

	const headers = get(response, 'headers', new Headers());
	const contentType = headers.get('Content-Type');
	if (contentType && contentType.includes('application/json')) {
		methodBody = 'json';
	}

	if (contentType && contentType.includes('application/zip')) {
		methodBody = 'blob';
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
	// in case of network issue
	if (response instanceof Error) {
		return new HTTPError({ response, data: response });
	}
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
		delete defaultHeaders['Content-Type'];
	}

	const params = merge(
		{
			credentials: 'same-origin',
			headers: defaultHeaders,
			method,
		},
		HTTP.defaultConfig,
		config,
	);

	return fetch(
		url,
		handleCSRFToken({
			...params,
			body: encodePayload(params.headers, payload),
		}),
	)
		.then(handleHttpResponse)
		.catch(handleError);
}

/**
 * function - fetch a url with POST method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/react-cmf/lib/http';
 * await http.post(/foo', {foo: 42}))
 */
export async function httpPost(url, payload, config) {
	return httpFetch(url, config, HTTP_METHODS.POST, payload);
}

/**
 * function - fetch a url with PATCH method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/react-cmf/lib/http';
 * await http.patch('/foo', {foo: 42}))
 */
export async function httpPatch(url, payload, config) {
	return httpFetch(url, config, HTTP_METHODS.PATCH, payload);
}

/**
 * function - fetch a url with PUT method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/react-cmf/lib/http';
 * await http.put('/foo', {foo: 42}))
 */
export async function httpPut(url, payload, config) {
	return httpFetch(url, config, HTTP_METHODS.PUT, payload);
}

/**
 * function - fetch a url with DELETE method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/react-cmf/lib/http';
 * await http.delete('/foo'))
 */
export async function httpDelete(url, config) {
	return httpFetch(url, config, HTTP_METHODS.DELETE);
}

/**
 * function - fetch a url with GET method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/react-cmf/lib/http';
 * await http.get('/foo'))
 */
export async function httpGet(url, config) {
	return httpFetch(url, config, HTTP_METHODS.GET);
}

export const http = {
	get: httpGet,
	post: httpPost,
	patch: httpPatch,
	put: httpPut,
	delete: httpDelete,
};
