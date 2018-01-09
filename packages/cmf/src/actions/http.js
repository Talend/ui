import has from 'lodash/has';

import { HTTP_METHODS } from '../middlewares/http';
import {
	ACTION_TYPE_HTTP_REQUEST,
	ACTION_TYPE_HTTP_RESPONSE,
	ACTION_TYPE_HTTP_ERRORS,
	ACTION_TYPE_HTTP_REDUCER_ERROR,
} from '../middlewares/http/constants';

export const DEFAULT_HTTP_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export function isHTTPRequest(action) {
	return action.type in HTTP_METHODS || has(action, 'cmf.http');
}

export function httpError(error) {
	return {
		type: ACTION_TYPE_HTTP_ERRORS,
		error,
	};
}

export function httpRequest(url, config) {
	return {
		type: ACTION_TYPE_HTTP_REQUEST,
		url,
		config,
	};
}

export function httpReducerError(error, action) {
	return {
		type: ACTION_TYPE_HTTP_REDUCER_ERROR,
		error,
		action,
	};
}

export function httpResponse(response) {
	return {
		type: ACTION_TYPE_HTTP_RESPONSE,
		data: response,
	};
}

export function onResponse(action, response) {
	if (typeof action.onResponse === 'function') {
		return action.onResponse(response);
	}
	return {
		type: action.onResponse,
		response,
	};
}

export function onError(action, error) {
	if (typeof action.onError === 'function') {
		return action.onError(error);
	}
	return {
		type: action.onError,
		error,
	};
}

export default function http(config) {
	const { method, url, data, ...rest } = config;
	return {
		type: HTTP_METHODS[method],
		body: data,
		url,
		...rest,
	};
}

http.get = function get(url, config) {
	return http({
		method: HTTP_METHODS.GET,
		url,
		...config,
	});
};

http.post = function post(url, data, config) {
	return http({
		method: HTTP_METHODS.POST,
		body: data,
		url,
		...config,
	});
};

http.delete = function httpDelete(url, config) {
	return http({
		method: HTTP_METHODS.DELETE,
		url,
		...config,
	});
};

http.patch = function patch(url, data, config) {
	return http({
		method: HTTP_METHODS.PATCH,
		body: data,
		url,
		...config,
	});
};

http.put = function put(url, data, config) {
	return http({
		method: HTTP_METHODS.PUT,
		url,
		body: data,
		...config,
	});
};

http.head = function head(url, config) {
	return http({
		method: HTTP_METHODS.HEAD,
		url,
		...config,
	});
};
