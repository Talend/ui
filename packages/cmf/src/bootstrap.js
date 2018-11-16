import React from 'react';
import { render } from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { spawn } from 'redux-saga/effects';
import compose from 'redux';

import App from './App';
import actionCreator from './actionCreator';
import actions from './actions';
import { assertTypeOf } from './assert';
import component from './component';
import expression from './expression';
import onError from './onError';
import storeAPI from './store';
import registry from './registry';
import sagaRouter from './sagaRouter';
import sagas from './sagas';
import { registerInternals } from './register';
import cmfModule from './cmfModule';

export const bactchedSubscribe = batchedSubscribe(notify => {
	requestAnimationFrame(notify);
});

export function bootstrapRegistry(options) {
	assertTypeOf(options, 'sagas', 'object');
	assertTypeOf(options, 'components', 'object');
	assertTypeOf(options, 'expressions', 'object');
	assertTypeOf(options, 'actionCreators', 'object');
	assertTypeOf(options, 'registry', 'object');
	registerInternals();
	if (options.registry) {
		registry.registerMany(options.registry);
	}
	if (options.components) {
		component.registerMany(options.components);
	}
	if (options.expressions) {
		expression.registerMany(options.expressions);
	}
	if (options.actionCreators) {
		actionCreator.registerMany(options.actionCreators);
	}
	if (options.sagas) {
		sagas.registerMany(options.sagas);
	}
}

export function bootstrapSaga(options) {
	assertTypeOf(options, 'saga', 'function');
	function* cmfSaga() {
		yield spawn(sagas.component.handle);
		if (options.sagaRouterConfig) {
			// eslint-disable-next-line no-console
			console.warn("sagaRouter is deprecated please use cmfConnect 'saga' props");
			yield spawn(sagaRouter, options.history || hashHistory, options.sagaRouterConfig);
		}
		if (typeof options.saga === 'function') {
			yield spawn(options.saga);
		}
	}
	// https://github.com/abettadapur/redux-saga-devtools-extension
	// eslint-disable-next-line no-underscore-dangle
	const sagaMonitor = window.__SAGA_MONITOR_EXTENSION__;
	const middleware = createSagaMiddleware({ onError: onError.report, sagaMonitor });
	return {
		middleware,
		run: () => middleware.run(cmfSaga),
	};
}

export function bootstrapRedux(options, sagaMiddleware) {
	assertTypeOf(options, 'settingsURL', 'string');
	assertTypeOf(options, 'preReducer', ['Array', 'function']);
	assertTypeOf(options, 'httpMiddleware', 'function');
	assertTypeOf(options, 'enhancer', 'function');
	assertTypeOf(options, 'preloadedState', 'object');
	assertTypeOf(options, 'middlewares', 'Array');
	assertTypeOf(options, 'storeCallback', 'function');
	assertTypeOf(options, 'reducer', 'object');

	if (options.preReducer) {
		storeAPI.addPreReducer(options.preReducer);
	}
	if (typeof options.httpMiddleware === 'function') {
		storeAPI.setHttpMiddleware(options.httpMiddleware);
	}
	let enhancer = bactchedSubscribe;
	if (typeof options.enhancer === 'function') {
		enhancer = compose(
			options.enhancer,
			bactchedSubscribe,
		);
	}
	const middlewares = options.middlewares || [];
	const store = storeAPI.initialize(options.reducer, options.preloadedState, enhancer, [
		...middlewares,
		sagaMiddleware,
	]);
	if (options.settingsURL) {
		store.dispatch(actions.settings.fetchSettings(options.settingsURL));
	} else {
		store.dispatch(actions.settings.fetchSettings('/settings.json'));
	}
	if (typeof options.storeCallback === 'function') {
		options.storeCallback(store);
	}
	return store;
}

/**
 * Bootstrap your cmf app
 * It takes your configuration and provides a very good default one.
 * By default it starts react with the following addons:
 * - react-router
 * - redux
 * - redux-saga
 * @param {object} options the set of supported options
 * @returns {object} app object with render function
 */
export default function bootstrap(appOptions = {}) {
	// setup asap
	onError.addOnErrorListener();
	const options = cmfModule(appOptions);
	assertTypeOf(options, 'appId', 'string');
	assertTypeOf(options, 'history', 'object');

	bootstrapRegistry(options);
	const appId = options.appId || 'app';
	const saga = bootstrapSaga(options);

	const history = options.history || hashHistory;
	if (options.history) {
		storeAPI.setRouterMiddleware(routerMiddleware(options.history));
	}
	const store = bootstrapRedux(options, saga.middleware);
	onError.bootstrap(options, store);
	saga.run();

	render(
		<App
			store={store}
			history={syncHistoryWithStore(history, store)}
			loading={options.AppLoader}
		/>,
		document.getElementById(appId),
	);
}
