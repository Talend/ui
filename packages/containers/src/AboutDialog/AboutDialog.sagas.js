import cmf from '@talend/react-cmf';
import { all, call, put, takeEvery, take } from 'redux-saga/effects';

import Connected from './AboutDialog.connect';
import Constants from './AboutDialog.constant';

/**
 * This saga takes care of fetching versions for the AboutDialog
 * container according to the provided versions URL in the action payload.
 * @param {Object} action
 */
export function* fetch({ url }) {
	yield put(Connected.setStateAction({ loading: true }));
	const { response, data } = yield call(cmf.sagas.http.get, url);

	if (response.ok) {
		yield put(
			cmf.actions.collections.addOrReplace(Constants.COLLECTION_ID, {
				version: data.displayVersion,
				services: data.services.map(({ serviceName, buildId, versionId }) => ({
					name: serviceName,
					version: versionId,
					build: buildId,
				})),
			}),
		);
		yield put(Connected.setStateAction({ loading: false }));
	}
}

export function* show(action) {
	yield all([put(Connected.setStateAction({ show: true })), call(fetch, action)]);
}

export function* hide() {
	yield put(Connected.setStateAction({ show: false }));
}

function* defaultHandler() {
	yield takeEvery(Constants.ABOUT_DIALOG_SHOW, show);
	yield takeEvery(Constants.ABOUT_DIALOG_HIDE, hide);
	yield take('DO_NOT_QUIT');
}

export default {
	'AboutDialog#default': defaultHandler,
};
