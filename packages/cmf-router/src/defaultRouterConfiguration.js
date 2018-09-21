import React from 'react';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import omit from 'lodash/omit';
import get from 'lodash/get';
import UIRouter from './UIRouter';

const cmfMiddleware = store => next => action => {
	const config = action.cmf;
	if (!config) {
		return next(action);
	}
	if (config.routerPush || config.routerReplace) {
		let route = config.routerPush || config.routerReplace;
		if (typeof route === 'function') {
			route = route(action);
		}
		store.dispatch({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				method: config.routerPush ? 'push' : 'replace',
				args: [route],
			},
		});
	}
	return next(action);
};

function getHistory() {
	return hashHistory;
}

function getReduxMiddleware(history) {
	return [cmfMiddleware, routerMiddleware(history)];
}

function insertReducerFactory() {
	return rootReducer =>
		function reducerWithRoute(state, action) {
			const routerState = state ? state.routing : undefined;
			const nonRouterState = omit(state, 'routing');
			const reducerResults = rootReducer(nonRouterState, action);

			return {
				...reducerResults,
				routing: routerReducer(routerState, action),
			};
		};
}

function getStoreHistory(history, store) {
	return syncHistoryWithStore(history, store);
}

function rootComponent(history) {
	return <UIRouter history={history} />;
}

function getCurrentPathname(state) {
	return get(state, 'routing.locationBeforeTransitions.pathname');
}

export default {
	getCurrentPathname,
	getHistory,
	getReduxMiddleware,
	getStoreHistory,
	insertReducerFactory,
	rootComponent,
};
