import merge from 'lodash/merge';

import { HTTP } from './config';
import interceptors from './httpInterceptors';


/**
 * httpFetch - call the api fetch to request the url
 *
 * @param  {string} url                       url to request
 * @param  {object} config                    option that you want apply to the request
 * @param  {string} method = HTTP_METHODS.GET method to apply
 * @param  {object} payload                   payload to send with the request
 * @return {Promise}                          A Promise that resolves to a Response object.
 */
export async function httpFetch(url, config, method, payload) {
	const defaultHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const params = merge(
		{
			credentials: 'same-origin',
			headers: defaultHeaders,
			method,
		},
		HTTP.defaultConfig,
		config,
	);
	const interceptedConfig = await interceptors.onRequest({
		url,
		...params,
		payload,
	});
	const response = await fetch(
		interceptedConfig.url,
		interceptedConfig,
	);
	return interceptors.onResponse(response);
}
