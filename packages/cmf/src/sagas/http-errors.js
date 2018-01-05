import { takeLatest } from 'redux-saga/effects';

import { HTTP_STATUS, ACTION_TYPE_HTTP_ERRORS } from '../middlewares/http/constants';

const HTTPErrorsCodes = [HTTP_STATUS.UNAUTHORIZED, HTTP_STATUS.FORBIDDEN, HTTP_STATUS.NOT_FOUND];

/**
 * getHttpErrorsSaga - description
 *
 * @param  {Object} errors = {}    code to trigger a saga when the error is triggered
 * @param  {Function} errors.on401 saga to spawn when 401 errors
 * @param  {Function} errors.on403 saga to spawn when 403 errors
 * @param  {Function} errors.on404 saga to spawn when 404 errors
 * @return {Function}              a generator function
 */
export default function getHttpErrorsSaga(errors = {}) {
	return function* httpErrorSaga() {
		yield HTTPErrorsCodes.filter(code => errors[`on${code}`]).map(code =>
			takeLatest(`${ACTION_TYPE_HTTP_ERRORS}/${code}`, errors[`on${code}`]),
		);
	};
}
