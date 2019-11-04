import React from 'react';
import { render } from 'react-dom';
import createSagaMiddleware from 'redux-saga';
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
import sagas from './sagas';
import { registerInternals } from './register';
import cmfModule from './cmfModule';
import interceptors from './httpInterceptors';

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
		if (typeof options.saga === 'function') {
			yield spawn(options.saga);
		}
	}
	// https://chrome.google.com/webstore/detail/redux-saga-dev-tools/kclmpmjofefcpjlommdpokoccidafnbi
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
	}
	if (typeof options.storeCallback === 'function') {
		options.storeCallback(store);
	}
	return store;
}

function bootstrapInterceptors(options) {
	if (options.httpInterceptors) {
		options.httpInterceptors.forEach(interceptors.push);
	}
}

function DefaultRootComponent() {
	return 'RootComponent is required';
}

/**
 * Bootstrap your cmf app
 * It takes your configuration and provides a very good default one.
 * By default it starts react with the following addons:
 * - redux
 * - redux-saga
 * @param {object} options the set of supported options
 * @returns {object} app object with render function
 */
export default function bootstrap(appOptions = {}) {
	// setup asap
	const options = cmfModule(appOptions);
	assertTypeOf(options, 'appId', 'string');
	assertTypeOf(options, 'RootComponent', 'function');

	bootstrapRegistry(options);
	bootstrapInterceptors(options);
	const appId = options.appId || 'app';
	const saga = bootstrapSaga(options);

	const store = bootstrapRedux(options, saga.middleware);
	onError.bootstrap(options, store);
	saga.run();
	const RootComponent = options.RootComponent || DefaultRootComponent;
	render(
		<App store={store} loading={options.AppLoader} withSettings={!!options.settingsURL}>
			<RootComponent />
		</App>,
		document.getElementById(appId),
	);
}
