import invariant from 'invariant';
import { fork, cancel, take, takeEvery } from 'redux-saga/effects';
import curry from 'lodash/curry';
import CONST from '../constant';
import registry from '../registry';

/**
 * This function register a saga in the cmf registry
 * @param {string} id the saga id you want
 * @param {generator} saga the saga generator
 * @param {object} context optional context to get the registry
 */
export function register(id, saga, context) {
	registry.addToRegistry(`SAGA:${id}`, saga, context);
}

/**
 * This function allow to get a saga from the registry
 * @param {string} id the saga id you want
 * @param {object} context optional context to get the registry
 */
export function get(id, context) {
	return registry.getFromRegistry(`SAGA:${id}`, context);
}

export const registerMany = registry.getRegisterMany(register);

export const isActionCancelable = curry(
	(startAction, action) =>
		action.type === `${CONST.WILL_UNMOUNT_SAGA_STOP}_${startAction.saga}` &&
		startAction.event.componentId === action.event.componentId,
);

export function* onSagaStart(action) {
	const saga = get(action.saga);
	if (!saga) {
		invariant(
			process.env.NODE_ENV === 'production',
			`You cannot register undefined as saga for id "${action.saga}"`,
		);
	} else {
		const task = yield fork(saga, action.props);
		yield take(isActionCancelable(action));
		yield cancel(task);
	}
}

export function* handle() {
	yield takeEvery(CONST.DID_MOUNT_SAGA_START, onSagaStart);
	yield take('DO_NOT_QUIT');
}
