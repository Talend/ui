import { call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import selectors from '../selectors';

/**
 * this saga ends when the collection is available
 * @param {string} id of the collection to wait for
 * @param {number} interval in ms
 */
export function* waitFor(id, interval = 10) {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const collection = yield select(selectors.collections.get, id);
		if (collection !== undefined) {
			break;
		}
		yield call(delay, interval);
	}
}
