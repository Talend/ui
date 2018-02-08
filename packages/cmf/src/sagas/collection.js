import { call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* waitFor(id, timeToWait = 10) {
	let found = false;
	while (!found) {
		const state = yield select();
		found = state.cmf.collections.has(id);
		yield call(delay, timeToWait);
	}
}
