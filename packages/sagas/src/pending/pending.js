import { delay } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import { api } from '@talend/react-cmf';
import { Map } from 'immutable';

import { PENDING_DELAY_TO_SHOW, SHOW_PENDING } from '../constants';

const addOrReplace = api.actions.collections.addOrReplace;

/**
 * find a datastore by its id
 * @param {*} state the application state
 * @param {*} id the datastoreId
 */
export function findPenderById(state, asyncActionId) {
	return state.cmf.collections.getIn(['penders', asyncActionId]);
}

export function findPenders(state) {
	return state.cmf.collections.get('penders');
}

/**
 * Create the penders map in cmf.collections if it doesn't already exists
 */
export function* ensurePendersCollectionExists() {
	const collection = yield select(findPenders);
	if (!collection) {
		yield put(addOrReplace('penders', new Map()));
	}
}

/**
 * Automatically triggers a spinner while action perform is longer than PENDING_DELAY_TO_SHOW
 * @param {*} asyncCallerId id of the context object from which the action was called
 * @param {*} actionId the actionId
 */
export default function* pendingMaybeNeeded(asyncCallerId, actionId) {
	const asyncActionId = `${asyncCallerId}#${actionId}`;
	let pending = false;

	try {
		yield call(delay, PENDING_DELAY_TO_SHOW);
		pending = true;
		yield call(ensurePendersCollectionExists);
		let pendersCollection = yield select(findPenders);
		pendersCollection = pendersCollection.set(asyncActionId, SHOW_PENDING);
		yield put(addOrReplace('penders', pendersCollection));
		yield take('DO_NOT_QUIT');
	} finally {
		if (pending) {
			yield call(ensurePendersCollectionExists);
			const penderStatus = yield select(findPenderById, asyncActionId);

			if (penderStatus) {
				let pendersCollection = yield select(findPenders);
				pendersCollection = pendersCollection.delete(asyncActionId);
				yield put(addOrReplace('penders', pendersCollection));
			}
		}
	}
}
