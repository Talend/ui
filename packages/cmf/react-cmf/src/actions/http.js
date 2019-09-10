import {
	HTTP_METHODS,
	ACTION_TYPE_HTTP_REQUEST,
	ACTION_TYPE_HTTP_RESPONSE,
	ACTION_TYPE_HTTP_ERRORS,
	ACTION_TYPE_HTTP_REDUCER_ERROR,
} from '../middlewares/http/constants';

export const DEFAULT_HTTP_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

function onError(error) {
	return {
		type: ACTION_TYPE_HTTP_ERRORS,
		error,
	};
}

function onRequest(url, config) {
	return {
		type: ACTION_TYPE_HTTP_REQUEST,
		url,
		config,
	};
}

function onJSError(error, action) {
	console.error(error); // eslint-disable-line no-console
	return {
		type: ACTION_TYPE_HTTP_REDUCER_ERROR,
		error,
		action,
	};
}

function onResponse(response) {
	return {
		type: ACTION_TYPE_HTTP_RESPONSE,
		data: response,
	};
}

function onActionResponse(action, response, headers) {
	if (typeof action.onResponse === 'function') {
		return action.onResponse(response, headers);
	}
	return {
		type: action.onResponse,
		response,
		headers,
	};
}

function onActionError(action, error) {
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

http.onError = onError;
http.onActionError = onActionError;
http.onJSError = onJSError;
http.onRequest = onRequest;
http.onResponse = onResponse;
http.onActionResponse = onActionResponse;
