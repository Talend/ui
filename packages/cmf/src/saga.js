/**
 * This module provide helpers to use redux-saga in the CMF context
 */

import { put, select } from 'redux-saga/effects';
import action from './action';
import registry from './registry';

function* putActionCreator(actionCreatorId, event, data, optContext) {
	const state = yield select();
	const context = optContext || {
		registry: registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	const actionCreator = action.getActionCreatorFunction(context, actionCreatorId);
	yield put(actionCreator(event, data, context));
}

export default {
	putActionCreator,
};
