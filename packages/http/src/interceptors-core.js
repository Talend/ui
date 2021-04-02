import get from 'lodash/get';
import { mergeCSRFToken } from './csrfHandling';
import { HTTP_STATUS, testHTTPCode } from './http.constants';

export function handleHeaders(config) {
	/**
	 * If the payload is an instance of FormData the body should be set to this object
	 * and the Content-type header should be stripped since the browser
	 * have to build a special headers with file boundary in if said FormData is used to upload file
	 */
	if (config.payload instanceof FormData && config.headers) {
		// eslint-disable-next-line no-param-reassign
		delete config.headers['Content-Type'];
	}

	if (config.security) {
		return Promise.resolve(
			mergeCSRFToken({
				security: config.security,
			})(config),
		);
	}
	return Promise.resolve(config);
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
	let result = payload;
	if (
		type &&
		type.includes('json') &&
		typeof payload !== 'string' &&
		!(payload instanceof FormData)
	) {
		result = JSON.stringify(payload);
	}
	return Promise.resolve(result);
}

/**
 * handleHttpResponse - handle the http body
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that resolves with the result of parsing the body
 */
export async function handleBody(response) {
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
 * handleHttpResponse - handle the http response
 *
 * @param  {Response} response A response object
 * @return {Promise}           A promise that:
 * - resolves with the result of parsing the body
 * - reject the response
 */
export async function handleHttpResponse(response) {
	if (!testHTTPCode.isSuccess(response.status)) {
		const error = new Error(response.status);
		error.response = response;
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

export  const defaultInterceptors = [
    { request: handleHeaders },
    { request: encodePayload },
    { response: handleHttpResponse },
];
