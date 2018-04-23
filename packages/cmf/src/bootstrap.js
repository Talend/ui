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
import component from './component';
import expression from './expression';
import storeAPI from './store';
import sagaRouter from './sagaRouter';
import sagas from './sagas';
import { registerInternals } from './register';

const bactchedSubscribe = batchedSubscribe(notify => {
	requestAnimationFrame(notify);
});

function assertTypeOf(options, attr, type) {
	if (
		type === 'Array' &&
		options[attr] &&
		!Array.isArray(options[attr]) &&
		// eslint-disable-next-line valid-typeof
		(options[attr] && typeof options[attr] !== type)
	) {
		throw new Error(`${attr} must be a ${type} but got ${typeof options[attr]}`);
	}
}

/**
 * This is the function to use in your app index.js file.
 * It take your configuration and provide a very good default one.
 * By default it start react with the following addons:
 * - react-router
 * - redux
 * - redux-saga
 * @param {object} options the set of supported options
 * @returns {object} app object with render function
 */
export default function bootstrap(unSafeOptions) {
	const options = unSafeOptions || {};
	assertTypeOf(options, 'settingsURL', 'string');
	assertTypeOf(options, 'appId', 'string');
	assertTypeOf(options, 'history', 'object');
	assertTypeOf(options, 'preReducer', 'function');
	assertTypeOf(options, 'httpMiddleware', 'function');
	assertTypeOf(options, 'enhancer', 'function');
	assertTypeOf(options, 'preloadedState', 'object');
	assertTypeOf(options, 'middlewares', 'Array');
	assertTypeOf(options, 'storeCallback', 'function');
	assertTypeOf(options, 'saga', 'function');
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

	const appId = options.appId || 'app';
	const sagaMiddleware = createSagaMiddleware();

	if (options.history) {
		storeAPI.setRouterMiddleware(routerMiddleware(options.history));
	}
	if (options.preReducer) {
		storeAPI.addPreReducer(options.preReducer);
	}
	if (typeof options.httpMiddleware === 'function') {
		storeAPI.setHttpMiddleware(options.httpMiddleware);
	}
	let enhancer = bactchedSubscribe;
	if (typeof options.enhancer === 'function') {
		enhancer = compose(options.enhancer, bactchedSubscribe);
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
	sagaMiddleware.run(cmfSaga);
	return {
		render: () =>
			render(
				<App
					store={store}
					history={syncHistoryWithStore(options.history, store)}
					loading={options.AppLoader}
				/>,
				document.getElementById(appId),
			),
	};
}
