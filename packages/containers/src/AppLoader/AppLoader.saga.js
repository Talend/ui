import api from '@talend/react-cmf';
import { delay, call, select, all, take } from 'redux-saga/effects';
import invariant from 'invariant';

export const ACTION_CREATORS = 'actionCreators';
export const SAGAS = 'sagas';
export const WAIT_FOR = 'waitFor';
export const TAKE_ACTION = 'takeAction';

/**
 * This function wait until a collection is here
 * @param {string} collectionName the name of the collection
 * @param {int} interval the interval to check again if the collection is there
 */
export function* waitFor(collectionName, interval = 10) {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const collection = yield select(api.selectors.collections.get, collectionName);
		if (collection !== undefined) {
			break;
		}
		yield delay(interval);
	}
}
/**
 * This function handle a specific step
 * @param {object} step a bootstrap step that could contain a actionCreator list or a waitList
 */
export function* handleStep(step) {
	if (step[SAGAS]) {
		return yield all(step[SAGAS].map(saga => call(api.sagas.get(saga))));
	}
	if (step[ACTION_CREATORS]) {
		return yield all(
			step[ACTION_CREATORS].map(actionCreator => api.sagas.putActionCreator(actionCreator)),
		);
	} else if (step[WAIT_FOR]) {
		return yield all(step[WAIT_FOR].map(collectionName => call(waitFor, collectionName)));
	} else if (step[TAKE_ACTION]) {
		return yield all(step[TAKE_ACTION].map(actionName => take(actionName, actionName)));
	}
	return invariant(
		process.env.NODE_ENV !== 'production',
		`Step object must have ${ACTION_CREATORS} or ${WAIT_FOR} attribute`,
	);
}

/**
 * This saga load the actionCreator or wait on some steps
 * @param {object} props the saga props
 * @param {array} props.steps an array of steps to handle
 */
export function* appLoaderSaga({ steps }) {
	// eslint-disable-next-line no-restricted-syntax
	for (const step of steps) {
		yield call(handleStep, step);
	}
}
