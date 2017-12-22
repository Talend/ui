import { call, put } from 'redux-saga/effects';
import merge from 'lodash/merge';

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

export function handleBody(response) {
	let methodBody = 'text';

	const contentType = response.headers.get('Content-Type');

	if (contentType && contentType.includes('application/json')) {
		methodBody = 'json';
	}
	return response[methodBody]().then(data => ({ data, response }));
}

export function handleError(response) {
	return handleBody(response).then(body => new HTTPError(body));
}

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

export function httpFetch(url, config, method, payload) {
	let body;
	const defaultHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

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

function* httpPost(url, payload, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.POST, payload);
}

function* httpPut(url, payload, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.PUT, payload);
}

function* httpDelete(url, config) {
	return yield* wrapFetch(url, config, HTTP_METHODS.DELETE);
}

function* httpGet(url, config) {
	return yield* wrapFetch(url, config);
}

export default {
	delete: httpDelete,
	get: httpGet,
	post: httpPost,
	put: httpPut,
};
