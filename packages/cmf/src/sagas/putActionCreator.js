/**
 * This module provide helpers to use redux-saga in the CMF context
 * @module react-cmf/lib/saga
 * @see module:react-cmf/lib/api
 * @example
import { api } from '@talend/react-cmf';

api.saga.putActionCreator('myaction', {}, {});
 */

import { put, select } from 'redux-saga/effects';
import actionCreatorAPI from '../actionCreator';
import registry from '../registry';

function* putActionCreator(actionCreatorId, event, data, optContext) {
	const state = yield select();
	const context = optContext || {
		registry: registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	const actionCreator = actionCreatorAPI.get(context, actionCreatorId);
	yield put(actionCreator(event, data, context));
}

export default putActionCreator;
