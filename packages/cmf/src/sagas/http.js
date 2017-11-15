/**
 * This is mostly a POC
 * https://github.com/Talend/ui/blob/master/packages/cmf/src/middlewares/http/middleware.js#L135
 * should be considered
 */

import { call } from 'redux-saga/effects';
import merge from 'lodash/merge';
import curry from 'lodash/curry';

import { mergeCSRFToken } from '../middlewares/http/csrfHandling';
import { HTTP_METHODS, HTTP_STATUS } from '../middlewares/http/constants';

export function httpPostOrPut(url, method, payload = {}, config) {
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
	const localConfig = merge(
		{
			method,
			credentials: 'same-origin',
			headers: defaultHeaders,
			body,
		},
		config,
	);
	return fetch(url, localConfig).then(response =>
		response.json().then(json => ({ json, response })),
	);
}

function handleHttpGetResponse(response) {
	if (response.status === HTTP_STATUS.NO_CONTENT) {
		return null;
	}
	const contentType = response.headers.get('Content-Type');
	if (contentType.includes('text/plain')) {
		return response.text().then(text => ({ text, response }));
	}
	return response.json().then(json => ({ json, response }));
}

export function httpGet(url, config) {
	return fetch(
		url,
		merge(
			{
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
			config,
		),
	).then(handleHttpGetResponse);
}

export function* get(url, config = {}) {
	return yield call(httpGet, url, config);
}

export function* post(url, payload, config = {}) {
	return yield call(httpPostOrPut, url, HTTP_METHODS.POST, payload, config);
}

export function* put(url, payload, config = {}) {
	return yield call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, config);
}

export const handleDefaultConfiguration = curry((defaultConfig, config) =>
	mergeCSRFToken(defaultConfig, config),
);

export default {
	get,
	post,
	put,
	create(defaultConfig = {}) {
		const configEnhancer = handleDefaultConfiguration(defaultConfig);
		return {
			get: function* configuredGet(url, config = {}) {
				return yield call(httpGet, url, configEnhancer(config));
			},
			post: function* configuredPost(url, payload, config = {}) {
				return yield call(httpPostOrPut, url, HTTP_METHODS.POST, payload, configEnhancer(config));
			},
			put: function* configuredPut(url, payload, config = {}) {
				return yield call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, configEnhancer(config));
			},
		};
	},
};

// TODO handle default config in same fashion as CSRFConfig
