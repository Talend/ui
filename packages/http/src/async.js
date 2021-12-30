import { HTTP_METHODS, REQUEST_STATUS } from './http.constants';
import { httpFetch } from './http.common';

/**
 * function - fetch a url with POST method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/http/async';
 * await http.post('/foo', {foo: 42}))
 */
export async function httpPost(url, payload, config) {
	return httpFetch(url, config, HTTP_METHODS.POST, payload);
}

/**
 * function - fetch a url with PATCH method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/http/async';
 * await http.patch('/foo', {foo: 42}))
 */
export async function httpPatch(url, payload, config) {
	return httpFetch(url, config, HTTP_METHODS.PATCH, payload);
}

/**
 * function - fetch a url with PUT method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/http/async';
 * await http.put('/foo', {foo: 42}))
 */
export async function httpPut(url, payload, config) {
	return httpFetch(url, config, HTTP_METHODS.PUT, payload);
}

/**
 * function - fetch a url with DELETE method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/http/async';
 * await http.delete('/foo'))
 */
export async function httpDelete(url, config) {
	return httpFetch(url, config, HTTP_METHODS.DELETE);
}

/**
 * function - fetch a url with GET method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/http/async';
 * await http.get('/foo'))
 */
export async function httpGet(url, config) {
	return httpFetch(url, config, HTTP_METHODS.GET);
}

/**
 * function - fetch a url with HEAD method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @example
 * import { http } from '@talend/http/async';
 * await http.head('/foo'))
 */
export async function httpHead(url, config) {
	return httpFetch(url, config, HTTP_METHODS.HEAD);
}

export const http = {
	get: httpGet,
	post: httpPost,
	patch: httpPatch,
	put: httpPut,
	delete: httpDelete,
	head: httpHead,
	REQUEST_STATUS,
};
