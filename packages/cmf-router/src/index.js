import React from 'react';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import cmf from '@talend/react-cmf';
import { fork, takeLatest } from 'redux-saga/effects';
import { create as createBrowserHistory } from './history';
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
	if (options.routerFunctions) {
		throw new Error('@talend/react-cmf-router routerFunctions is not supported');
	}
	const history = options.history || createBrowserHistory(options);

	const basename = options.basename;

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

	// router is renderer after the store is created so we refer to routerHistory
	const UIRouter = getRouter(history, basename);
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
		},
		RootComponent: CMFRouter,
	};
}

export default getModule;

const routerAPI = {
	selectors,
	matchPath: cmf.router.matchPath,
};

export { routerAPI, route, sagaRouter, createBrowserHistory };
