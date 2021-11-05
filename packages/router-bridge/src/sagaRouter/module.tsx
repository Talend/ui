import React from 'react';
import { Router } from 'react-router-dom';

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { fork, takeLatest } from 'redux-saga/effects';

import cmf from '@talend/react-cmf';
import { sagaRouter, SAGA_ROUTER_HISTORY_CHANGE } from './sagaRouter';

const { history }: { history: any } = require('../router');

const mergeConfig = {
	history: cmf.module.merge.getUnique,
	sagaRouterConfig: cmf.module.merge.mergeObjects,
	titleRouterConfig: cmf.module.merge.mergeObjects,
	routerFunctions: cmf.module.merge.mergeObjects,
	startOnAction: cmf.module.merge.getUnique,
};

function mergeRouterConfig(...configs: any[]) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return configs.reduce(cmf.module.merge.getReduceConfig(mergeConfig), {});
}

export const getSagaRouterModule = (...args: any[]): any => {
	const options = mergeRouterConfig(...args);
	function* saga() {
		let routerStarted = false;
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

	return {
		id: 'react-router-saga-bridge',
		reducer: {
			router: connectRouter(history),
		},
		saga,
		storeCallback: (store: { dispatch: (action: any) => void }) => {
			history.listen(() => store.dispatch({ type: SAGA_ROUTER_HISTORY_CHANGE }));
		},
		middlewares: [routerMiddleware(history)],
		RootComponent: (props: any) => (
			<ConnectedRouter history={history}>
				<Router {...props} history={history} />
			</ConnectedRouter>
		),
	};
};
