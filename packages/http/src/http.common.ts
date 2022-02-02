import { mergeCSRFToken } from './csrfHandling';
import { HTTP_STATUS, testHTTPCode } from './http.constants';
import { HTTP } from './config';
import { TalendHttpResponse, TalendRequestInit } from './http.types';

/**
 * merge the CSRFToken handling rule from the module defaultConfig
 * into config argument
 * @param {Object} config
 * @returns {Function}
 */
export function handleCSRFToken(config: TalendRequestInit) {
	return mergeCSRFToken({
		security: config.security,
	})(config);
}

/**
 * encodePayload - encore the payload if necessary
 *
 * @param  {object} headers request headers
 * @param  {object} payload payload to send with the request
 * @return {string|FormData} The encoded payload.
 */
export function encodePayload(headers: HeadersInit, payload: any) {
	// @ts-ignore
	const type: string = headers['Content-Type'];

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
export async function handleBody(response: Response) {
	let methodBody = 'text';

	const headers = response?.headers || new Headers();
	const contentType = headers.get('Content-Type');
	if (contentType && contentType.includes('application/json')) {
		methodBody = 'json';
	}

	if (contentType && contentType.includes('application/zip')) {
		methodBody = 'blob';
	}

	// @ts-ignore
	return response[methodBody]().then(data => ({ data, response }));
}

/**
 * handleHttpResponse - handle the http response
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that:
 * - resolves with the result of parsing the body
 * - reject the response
 */
export async function handleHttpResponse(response: Response) {
	if (!testHTTPCode.isSuccess(response.status)) {
		const error = new Error(`${response.status}`);
		Object.assign(error, await handleBody(response));
		throw error;
	}
	if (response.status === HTTP_STATUS.NO_CONTENT) {
		return {
			data: '',
			response,
		};
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
export async function httpFetch<T>(
	url: string,
	config: TalendRequestInit | undefined,
	method: string,
	payload: any,
): Promise<TalendHttpResponse<T>> {
	const defaultHeaders: HeadersInit = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	/**
	 * If the payload is an instance of FormData the body should be set to this object
	 * and the Content-type header should be stripped since the browser
	 * have to build a special headers with file boundary in if said FormData is used to upload file
	 */
	if (payload instanceof FormData) {
		delete defaultHeaders['Content-Type'];
	}

	const params: TalendRequestInit = {
		credentials: 'same-origin',
		method,
		...HTTP.defaultConfig,
		...config,
		headers: {
			...defaultHeaders,
			...HTTP.defaultConfig?.headers,
			...config?.headers,
		},
	};

	const response = await fetch(
		url,
		handleCSRFToken({
			...params,
			// @ts-ignore
			body: encodePayload(params.headers, payload),
		}),
	);
	return handleHttpResponse(response);
}
