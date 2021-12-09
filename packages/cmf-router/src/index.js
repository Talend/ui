import React from 'react';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import cmf from '@talend/react-cmf';
import { fork, takeLatest } from 'redux-saga/effects';
import { getRouter } from './UIRouter';
import expressions from './expressions';
import sagaRouter from './sagaRouter';
import * as selectors from './selectors';
import documentTitle from './sagas/documentTitle';
import cmfRouterMiddleware from './middleware';
import route from './route';

const mergeConfig = {
	history: cmf.module.merge.getUnique,
	basename: cmf.module.merge.getUnique,
	sagaRouterConfig: cmf.module.merge.mergeObjects,
	routerFunctions: cmf.module.merge.mergeObjects,
	startOnAction: cmf.module.merge.getUnique,
};

function mergeRouterConfig(...configs) {
	return configs.reduce(cmf.module.merge.getReduceConfig(mergeConfig), {});
}

function getModule(...args) {
	const options = mergeRouterConfig(...args);
	const history = options.history || createBrowserHistory();
	const registry = {};
	if (options.routerFunctions) {
		console.warn('options.routerFunctions is deprecated and not supported at  the moment. TODO');
		// TODO: find usage and a way to migrate
		// Object.keys(options.routerFunctions).reduce((acc, key) => {
		// 	// eslint-disable-next-line no-param-reassign
		// 	acc[`${REGISTRY_HOOK_PREFIX}:${key}`] = options.routerFunctions[key];
		// 	return acc;
		// }, registry);
	}

	function* saga() {
		let routerStarted = false;
		yield fork(documentTitle);
		if (options.sagaRouterConfig) {
			if (options.startOnAction) {
				yield takeLatest(options.startOnAction, function* startRouter() {
					if (!routerStarted) {
						yield fork(sagaRouter, history, options.sagaRouterConfig);
						routerStarted = true;
					}
				});
			} else {
				yield fork(sagaRouter, history, options.sagaRouterConfig);
			}
		}
	}
	const middlewares = [routerMiddleware(history), cmfRouterMiddleware];
	// let routerHistory;
	// function storeCallback(store) {
	// 	routerHistory = syncHistoryWithStore(history, store);
	// }
	// router is renderer after the store is created so we refer to routerHistory
	const UIRouter = getRouter(history, options.basename);
	function CMFRouter() {
		return <UIRouter />;
	}
	CMFRouter.displayName = 'CMFRouter';

	return {
		cmfModule: {
			id: 'react-cmf-router',
			expressions,
			reducer: {
				router: connectRouter(history),
			},
			middlewares,
			saga,
			// storeCallback,
			registry,
		},
		RootComponent: CMFRouter,
	};
}

export default getModule;

const routerAPI = {
	selectors,
	matchPath: cmf.router.matchPath,
};

export { routerAPI, route, sagaRouter };
