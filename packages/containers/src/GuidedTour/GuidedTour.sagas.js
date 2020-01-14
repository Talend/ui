import { put, takeEvery } from 'redux-saga/effects';

import Connected from './GuidedTour.connect';
import Constants from './GuidedTour.constants';

export function* show() {
	yield put(Connected.setStateAction({ show: true }));
}

export function* hide() {
	yield put(Connected.setStateAction({ show: false }));
}

function* defaultHandler() {
	yield takeEvery(Constants.GUIDED_TOUR_SHOW, show);
	yield takeEvery(Constants.GUIDED_TOUR_HIDE, hide);
}

export default {
	'GuidedTour#default': defaultHandler,
};
