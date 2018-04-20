import React from 'react';
import { render } from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { call, fork } from 'redux-saga/effects';
import compose from 'redux';

import App from './App';
import storeAPI from './store';
import actions from './actions';
import sagaRouter from './sagaRouter';
import sagas from './sagas';

const bactchedSubscribe = batchedSubscribe(notify => {
	requestAnimationFrame(notify);
});

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
export default function bootstrap(options) {
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
	} else if (options.httpMiddleware) {
		throw new Error('options.httpMiddleware must be a function got ', typeof options.httpMiddleware);
	}
	let enhancer = bactchedSubscribe;
	if (typeof options.enhancer === 'function') {
		enhancer = compose(options.enhancer, bactchedSubscribe);
	} else if (options.enhancer) {
		throw new Error('options.enhancer must be a function, got ', typeof options.enhancer);
	}
	const store = storeAPI.initialize(
		options.reducer,
		options.preloadedState,
		enhancer,
		[...options.middlewares, sagaMiddleware],
	);
	if (options.settingsURL) {
		store.dispatch(actions.settings.fetchSettings(options.settingsURL));
	}
	if (typeof options.storeCallback === 'function') {
		options.storeCallback(store);
	} else if (options.storeCallback) {
		throw new Error('options.storeCallback must be a function got ', typeof options.storeCallback);
	}
	function* cmfSaga() {
		yield fork(sagas.component.handle);
		if (options.sagaRouterConfig) {
			// eslint-disable-next-line no-console
			console.warn('sagaRouter is deprecated please use cmfConnect \'saga\' props');
			yield fork(sagaRouter, options.history || hashHistory, options.sagaRouterConfig);
		}
		if (typeof options.saga === 'function') {
			yield call(options.saga);
		} else if (options.saga) {
			throw new Error('options.saga must be a generator function got ', typeof options.saga);
		}
	}
	sagaMiddleware.run(cmfSaga);
	return {
		render: () => render(
			(
				<App
					store={store}
					history={syncHistoryWithStore(options.history, store)}
					loading={options.AppLoader}
				/>
			),
			document.getElementById(appId)
		),
	};
}
