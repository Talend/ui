import React from 'react';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { fork } from 'redux-saga/effects';
import UIRouter from './UIRouter';
import sagaRouter from './sagaRouter';

function getModule(options) {
	const history = options.history || hashHistory;
	function* saga() {
		if (options.sagaRouterConfig) {
			yield fork(sagaRouter, history, options.sagaRouterConfig);
		}
	}
	const middlewares = [routerMiddleware(history)];
	let routerHistory;
	function storeCallback(store) {
		routerHistory = syncHistoryWithStore(history, store);
	}
	// router is renderer after the store is created so we refer to routerHistory
	function Router() {
		return <UIRouter history={routerHistory} />;
	}
	const components = {
		Router,
	};
	return {
		id: 'react-cmf-router',
		reducer: {
			routing: routerReducer,
		},
		components,
		middlewares,
		saga,
		storeCallback,
	};
}

// cmfModule
export default getModule;
