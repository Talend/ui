import React from 'react';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import cmf from '@talend/react-cmf';
import { fork } from 'redux-saga/effects';
import UIRouter from './UIRouter';
import expressions from './expressions';
import sagaRouter from './sagaRouter';
import * as selectors from './selectors';
import documentTitle from './sagas/documentTitle';
import cmfRouterMiddleware from './middleware';

function getModule(options = {}) {
	const history = options.history || hashHistory;
	function* saga() {
		yield fork(documentTitle);
		if (options.sagaRouterConfig) {
			yield fork(sagaRouter, history, options.sagaRouterConfig);
		}
	}
	const middlewares = [routerMiddleware(history), cmfRouterMiddleware];
	let routerHistory;
	function storeCallback(store) {
		routerHistory = syncHistoryWithStore(history, store);
	}
	// router is renderer after the store is created so we refer to routerHistory
	function Router() {
		return <UIRouter history={routerHistory} />;
	}
	return {
		cmfModule: {
			id: 'react-cmf-router',
			expressions,
			reducer: {
				routing: routerReducer,
			},
			middlewares,
			saga,
			storeCallback,
		},
		RootComponent: Router,
	};
}

export default getModule;

const routerAPI = {
	selectors,
	matchPath: cmf.router.matchPath,
};

export { routerAPI };
