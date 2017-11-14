import { take, put } from 'redux-saga/effects';
import { ACK_RECEIVE_MESSAGE } from '../constants';

function* listen(chan) {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const action = yield take(ACK_RECEIVE_MESSAGE);
		yield put(chan, action.requestId);
	}
}

function* check(chan, requestId) {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const ackRequestId = yield take(chan);
		if (ackRequestId === requestId) {
			break;
		}
	}
	return true;
}

export default { listen, check };
