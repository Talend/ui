import { HTTP_METHODS, REQUEST_STATUS } from './http.constants';
import { httpFetch } from './http.common';
import { TalendHttpResponse, TalendRequestInit } from './http.types';

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
export async function httpPost<T>(
	url: string,
	payload: any,
	config?: TalendRequestInit,
): Promise<TalendHttpResponse<T>> {
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
export async function httpPatch<T>(
	url: string,
	payload: any,
	config?: TalendRequestInit,
): Promise<TalendHttpResponse<T>> {
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
export async function httpPut<T>(
	url: string,
	payload: any,
	config?: TalendRequestInit,
): Promise<TalendHttpResponse<T>> {
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
export async function httpDelete<T>(
	url: string,
	config?: TalendRequestInit,
): Promise<TalendHttpResponse<T>> {
	return httpFetch(url, config, HTTP_METHODS.DELETE, undefined);
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
export async function httpGet<T>(
	url: string,
	config?: TalendRequestInit,
): Promise<TalendHttpResponse<T>> {
	return httpFetch(url, config, HTTP_METHODS.GET, undefined);
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
export async function httpHead<T>(
	url: string,
	config?: TalendRequestInit,
): Promise<TalendHttpResponse<T>> {
	return httpFetch(url, config, HTTP_METHODS.HEAD, undefined);
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
