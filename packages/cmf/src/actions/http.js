import { HTTP_METHODS } from '../middlewares/http';

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
