import http from '@talend/react-cmf/lib/sagas/http';
import { HTTP_STATUS } from '@talend/react-cmf/lib/middlewares/http/constants';
import get from 'lodash/get';
import { put, call, takeLatest } from 'redux-saga/effects';
import { redirectToStatusCodePage, logout } from '../actions/redirectTo';

export function* handleHttpError(action) {
	const silentOptionConfig = get(action, 'options.silent');
	const status = get(action, 'status', get(action, 'error.stack.status'));

	switch (status) {
		case undefined:
			yield put(redirectToStatusCodePage(status));
			break;
		case HTTP_STATUS.UNAUTHORIZED:
			if (IS_EE) {
				yield call(logout);
			}
			break;
		default:
			if (
				silentOptionConfig === true ||
				(silentOptionConfig && silentOptionConfig.redirect === true) ||
				// avoid redirection on legacy calls that are not yet parameterized
				silentOptionConfig === undefined
			) {
				return;
			}
			yield put(redirectToStatusCodePage(status));
	}
}

export function* httpHandler() {
	yield takeLatest('@@HTTP/ERRORS', handleHttpError);
}

export default http.create();
