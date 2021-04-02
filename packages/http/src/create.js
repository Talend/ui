import { httpFetch } from './http.common';
import * as interceptors from './httpInterceptors';

export function create(config) {
	const clientInterceptors = [].concat(config.interceptors || []);
	return async function http(url, params, method, payload) {
		const interceptedConfig = await interceptors.onRequest(
			{
				url,
				...params,
				method,
				payload,
			},
			clientInterceptors,
		);
		const response = await httpFetch(
			interceptedConfig.url,
			interceptedConfig,
			interceptedConfig.method,
			interceptedConfig.payload,
		);
		return interceptors.onResponse(response, clientInterceptors);
	};
}
