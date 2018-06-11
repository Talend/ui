import React from 'react';
import { render } from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { call, fork } from 'redux-saga/effects';
import compose from 'redux';

import App from './App';
import actionCreator from './actionCreator';
import actions from './actions';
import { assertTypeOf } from './assert';
import component from './component';
import expression from './expression';
import storeAPI from './store';
import sagaRouter from './sagaRouter';
import sagas from './sagas';
import { registerInternals } from './register';

export const bactchedSubscribe = batchedSubscribe(notify => {
	requestAnimationFrame(notify);
});

export function bootstrapRegistry(options) {
	assertTypeOf(options, 'sagas', 'object');
	assertTypeOf(options, 'components', 'object');
	assertTypeOf(options, 'expressions', 'object');
	assertTypeOf(options, 'actionCreators', 'object');
	registerInternals();
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
		yield fork(sagas.component.handle);
		if (options.sagaRouterConfig) {
			// eslint-disable-next-line no-console
			console.warn("sagaRouter is deprecated please use cmfConnect 'saga' props");
			yield fork(sagaRouter, options.history || hashHistory, options.sagaRouterConfig);
		}
		if (typeof options.saga === 'function') {
			yield call(options.saga);
		}
	}
	const middleware = createSagaMiddleware();
	return {
		middleware,
		run: () => middleware.run(cmfSaga),
	};
}

export function bootstrapRedux(options, sagaMiddleware) {
	assertTypeOf(options, 'settingsURL', 'string');
	assertTypeOf(options, 'preReducer', 'function');
	assertTypeOf(options, 'httpMiddleware', 'function');
	assertTypeOf(options, 'enhancer', 'function');
	assertTypeOf(options, 'preloadedState', 'object');
	assertTypeOf(options, 'middlewares', 'Array');
	assertTypeOf(options, 'storeCallback', 'function');
	assertTypeOf(options, 'reducer', ['object', 'function']);

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
export default function bootstrap(options = {}) {
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
