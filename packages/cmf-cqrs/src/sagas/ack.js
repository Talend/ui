import { take, put } from 'redux-saga/effects';
import { ACK_RECEIVE_MESSAGE } from '../constants';

/**
 * this module define a high level API to handle ack in sagas
 * @module react-cmf-cqrs/lib/sagas/ack
 * @example
import { channel } from 'redux-saga';
import { fork, take, put, race, call, select } from 'redux-saga/effects';
import { sagas } from '@talend/react-cmf-cqrs';
function* onMyButtonClicked() {
    const requestId = objectID().toString();
    const chan = yield call(channel);
    yield fork(ack.listen, chan);
    const action = ... //action with ack and requestId
    yield put(action);
    yield call(ack.check, chan, requestId);
}
 */

/**
 * this function let you listen a channel ACK_RECEIVE_MESSAGE
 * @param {Object} channel redux-saga channel
 */
function* listen(chan) {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const action = yield take(ACK_RECEIVE_MESSAGE);
		yield put(chan, action.requestId);
	}
}

/**
 * this function will wait for the ack to be filled.
 * @param {Object} channel redux-saga channel instance
 * @param {string} requestId the requestId to check in the channel
 */
function* check(chan, requestId) {
	let ackRequestId;
	do {
		ackRequestId = yield take(chan);
	} while (ackRequestId !== requestId);

	return true;
}

export default { listen, check };
