import { put, select, takeEvery } from 'redux-saga/effects';
import objectId from 'uuid/v4';
import CMF_CONST from '@talend/react-cmf/lib/constant';
import onError from '@talend/react-cmf/lib/onError';
import Notification from './Notification.connect';
import Constants from './Notification.constants';
import { pushError } from './Notification.actions';

const DEFAULT_COMPONENT_ID = 'Notification';

export function* onPushNotification(action) {
	const componentState = yield select(state => Notification.getState(state, DEFAULT_COMPONENT_ID));
	const newComponentState = componentState.updateIn(['notifications'], notifications =>
		notifications.push({
			id: objectId(),
			...action.notification,
		}),
	);
	const updateStateAction = Notification.setStateAction(newComponentState, DEFAULT_COMPONENT_ID);

	yield put(updateStateAction);
}

function* onCMFError(action) {
	if (process.env.DISABLE_JS_ERROR_NOTIFICATION && process.env.NODE_ENV === 'production') {
		return;
	}
	const error = action.error;
	const download = {
		href: onError.createObjectURL(error),
		label: 'Download details',
		download: 'report.json',
		'data-feature': 'download-on-error-details',
	};
	const notification = {
		type: 'error',
		title: error.name,
		message: error.message,
		action: download,
	};
	yield put(pushError(notification));
}

function* defaultHandler() {
	yield takeEvery(Constants.PUSH_NOTIFICATION, onPushNotification);
	yield takeEvery(CMF_CONST.ERROR, onCMFError);
}

export default {
	'Notification#default': defaultHandler,
};
