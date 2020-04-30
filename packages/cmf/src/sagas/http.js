import { call, put } from 'redux-saga/effects';
import merge from 'lodash/merge';
import get from 'lodash/get';
import curry from 'lodash/curry';
import { ACTION_TYPE_HTTP_ERRORS, HTTP_METHODS } from '../middlewares/http/constants';
import interceptors from '../httpInterceptors';
import { httpFetch, HTTP } from '../http';

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
export function* wrapFetch(url, config, method = HTTP_METHODS.GET, payload, options) {
	const newConfig = yield call(interceptors.onRequest, { url, method, payload, ...config });
	const answer = yield call(
		httpFetch,
		newConfig.url,
		newConfig,
		newConfig.method,
		newConfig.payload,
	);
	yield call(interceptors.onResponse, answer);
	const silent = get(options, 'silent');
	if (silent !== true && answer instanceof Error) {
		yield put({
			error: { message: answer.data.message, stack: { status: answer.response.status } },
			url,
			config,
			method,
			payload,
			options,
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

export const handleDefaultHttpConfiguration = curry((defaultHttpConfig, httpConfig) =>
	/**
	 * Wall of explain
	 * merge mutate your object see https://lodash.com/docs/4.17.10#merge little note at the
	 * end of the documentation, so why ? don't know but its bad.
	 *
	 * so defaultHttpConfig was mutated inside the curried function and applied to
	 * all other call providing httpConfig, leading to interesting bug like having one time
	 * httpConfig override merged into defaultHttConfig.
	 * a test with two sccessive call will detect this issue.
	 */
	merge({}, defaultHttpConfig, httpConfig),
);

/**
 * getDefaultConfig - return the defaultConfig
 *
 * @return {object}  the defaultConfig used by cmf
 */
export function getDefaultConfig() {
	return HTTP.defaultConfig;
}

export default {
	delete: httpDelete,
	get: httpGet,
	post: httpPost,
	put: httpPut,
	patch: httpPatch,
	setDefaultConfig,
	setDefaultLanguage,
	getDefaultConfig,
	create(createConfig = {}) {
		const configEnhancer = handleDefaultHttpConfiguration(createConfig);

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
