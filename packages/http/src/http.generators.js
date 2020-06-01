import { httpFetch } from './http.common';
import { HTTP_METHODS } from './http.constants';

/**
 * function - fetch a url with POST method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.post, '/foo', {foo: 42});
 */
export function* httpPost(url, payload, config, options) {
	return yield* httpFetch(url, config, HTTP_METHODS.POST, payload, options);
}

/**
 * function - fetch a url with PATCH method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.patch, '/foo', {foo: 42});
 */
export function* httpPatch(url, payload, config, options) {
	return yield* httpFetch(url, config, HTTP_METHODS.PATCH, payload, options);
}

/**
 * function - fetch a url with PUT method
 *
 * @param  {string} url     url to request
 * @param  {object} payload payload to send with the request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.put, '/foo', {foo: 42});
 */
export function* httpPut(url, payload, config, options) {
	return yield* httpFetch(url, config, HTTP_METHODS.PUT, payload, options);
}

/**
 * function - fetch a url with DELETE method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.delete, '/foo');
 */
export function* httpDelete(url, config, options) {
	return yield* httpFetch(url, config, HTTP_METHODS.DELETE, undefined, options);
}

/**
 * function - fetch a url with GET method
 *
 * @param  {string} url     url to request
 * @param  {object} config  option that you want apply to the request
 * @param  {object} options options to deal with cmf automatically
 * @example
 * import { sagas } from '@talend/react-cmf';
 * import { call } from 'redux-saga/effects'
 * yield call(sagas.http.get, '/foo');
 */
export function* httpGet(url, config, options) {
	return yield* httpFetch(url, config, HTTP_METHODS.GET, undefined, options);
}

export const generators = {
	get: httpGet,
	post: httpPost,
	patch: httpPatch,
	put: httpPut,
	delete: httpDelete,
};
