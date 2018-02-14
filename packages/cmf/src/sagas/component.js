import invariant from 'invariant';
import { fork, cancel, take, takeEvery } from 'redux-saga/effects';
import CONST from '../constant';
import { get } from '../saga';

export function* onSagaStart(action) {
	const saga = get(action.saga);
	if (!saga) {
		invariant(process.env.NODE_ENV !== 'production', `The saga ${action.saga} is not registred`);
	} else {
		const task = yield fork(saga);
		yield take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_${action.saga}`);
		yield cancel(task);
	}
}

export function* handle() {
	yield takeEvery(CONST.DID_MOUNT_SAGA_START, onSagaStart);
	yield take('DO_NOT_QUIT');
}
