import { delay, call, put, select, take } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';

import { PENDING_DELAY_TO_SHOW, PENDING_COLLECTION_NAME, SHOW_PENDING } from '../constants';

const addOrReplace = cmf.actions.collections.addOrReplace;

/**
 * find a datastore by its id
 * @param {*} state the application state
 * @param {string} asyncActionId the unique contextualized actionId
 */
export function findPenderById(state, asyncActionId) {
	const collection = cmf.selectors.collections.getCollectionPlain(state, PENDING_COLLECTION_NAME);
	return collection ? collection[asyncActionId] : undefined;
}

export function findPenders(state) {
	return cmf.selectors.collections.getCollectionPlain(state, PENDING_COLLECTION_NAME);
}

/**
 * Create the penders map in cmf.collections if it doesn't already exists
 */
export function* ensurePendersCollectionExists() {
	const collection = yield select(findPenders);
	if (!collection) {
		yield put(addOrReplace(PENDING_COLLECTION_NAME, {}));
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
		yield delay(PENDING_DELAY_TO_SHOW);
		pending = true;
		yield call(ensurePendersCollectionExists);
		const pendersCollection = yield select(findPenders);
		const newPendersCollection = { ...pendersCollection, [asyncActionId]: SHOW_PENDING };
		yield put(addOrReplace(PENDING_COLLECTION_NAME, newPendersCollection));
		yield take('DO_NOT_QUIT');
	} finally {
		if (pending) {
			yield call(ensurePendersCollectionExists);
			const penderStatus = yield select(findPenderById, asyncActionId);

			if (penderStatus) {
				const pendersCollection = yield select(findPenders);
				const { [asyncActionId]: _, ...updatedPendersCollection } = pendersCollection;
				yield put(addOrReplace(PENDING_COLLECTION_NAME, updatedPendersCollection));
			}
		}
	}
}
