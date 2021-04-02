import { call, put } from 'redux-saga/effects';
import merge from 'lodash/merge';
import get from 'lodash/get';
import curry from 'lodash/curry';
import { httpFetch } from '@talend/http';
import { ACTION_TYPE_HTTP_ERRORS, HTTP_METHODS } from '../middlewares/http/constants';

/**
 * function - wrap the fetch request with the actions errors
 *
 * @param  {string} url                       url to request
 * @param  {object} config                    option that you want apply to the request
 * @param  {string} method = HTTP_METHODS.GET method to apply
 * @param  {object} payload                   payload to send with the request
 * @param  {object} options                   options to deal with cmf automatically
 * @return {object}                           the response of the request
 */
export function* wrapFetch(url, config, method = HTTP_METHODS.GET, payload, options) {
	const answer = yield call(
		httpFetch,
		url,
		config,
		method,
		payload,
	);
	const silent = get(options, 'silent');
	if (silent !== true && answer instanceof Error) {
		yield put({
			error: {
				// allow RFC-7807 compliance
				...get(answer, 'data', {}),
				// legacy properties
				message: get(answer, 'data.message'),
				stack: { status: get(answer, 'response.status') },
			},
			url,
			config,
			method,
			payload,
			options,
			type: ACTION_TYPE_HTTP_ERRORS,
		});
	}

	return answer;
}

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
	return yield* wrapFetch(url, config, HTTP_METHODS.POST, payload, options);
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
	return yield* wrapFetch(url, config, HTTP_METHODS.PATCH, payload, options);
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
	return yield* wrapFetch(url, config, HTTP_METHODS.PUT, payload, options);
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
	return yield* wrapFetch(url, config, HTTP_METHODS.DELETE, undefined, options);
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
	return yield* wrapFetch(url, config, HTTP_METHODS.GET, undefined, options);
}

export const handleDefaultHttpConfiguration = curry((defaultHttpConfig, httpConfig) =>
	/**
	 * Wall of explain
	 * merge mutate your object see https://lodash.com/docs/4.17.10#merge little note at the
	 * end of the documentation, so why ? don't know but its bad.
	 *
	 * so defaultHttpConfig was mutated inside the curried function and applied to
	 * all other call providing httpConfig, leading to interesting bug like having one time
	 * httpConfig override merged into defaultHttConfig.
	 * a test with two sccessive call will detect this issue.
	 */
	merge({}, defaultHttpConfig, httpConfig),
);

export default {
	delete: httpDelete,
	get: httpGet,
	post: httpPost,
	put: httpPut,
	patch: httpPatch,
};
