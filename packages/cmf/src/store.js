/**
 * This module is here to help app to create the redux store
 * @module react-cmf/lib/store
 */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { nestedCombineReducers } from 'nested-combine-reducers';
import thunk from 'redux-thunk';
import invariant from 'invariant';

import cmfReducers from './reducers';
import httpMiddleware from './middlewares/http';
import cmfMiddleware from './middlewares/cmf';
import onError from './onError';

/**
 * @typedef {Object} Store
 */

const preReducers = [];
const enhancers = [];
const middlewares = [thunk, cmfMiddleware, onError.middleware];

if (window) {
	// eslint-disable-next-line no-underscore-dangle
	if (window.__REDUX_DEVTOOLS_EXTENSION__) {
		// eslint-disable-next-line no-underscore-dangle
		enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
	} else if (window.devToolsExtension) {
		enhancers.push(window.devToolsExtension());
	}
}

let defaultHttpMiddlewareOverwrite = false;

/**
 * setHttpMiddleware overwrites the default http middleware
 * httpMiddleware NEED to be executed before cmfMiddleware
 *
 * @param middleware a http middleware
 */
function setHttpMiddleware(middleware) {
	const cmfMiddlewareIndex = middlewares.indexOf(cmfMiddleware);
	middlewares.splice(cmfMiddlewareIndex - 1, 0, middleware);
	defaultHttpMiddlewareOverwrite = true;
}

function addPreReducer(reducers) {
	if (typeof reducers === 'function') {
		preReducers.push(reducers);
	} else if (Array.isArray(reducers)) {
		preReducers.push(...reducers);
	}
}

function preApplyReducer(reducer) {
	if (preReducers.length === 0) {
		return reducer;
	}
	const newReducer = (state, action) => {
		const newState = preReducers.reduce(
			(accumulatedState, r) => r(accumulatedState, action),
			state,
		);
		return reducer(newState, action);
	};
	return newReducer;
}

/**
 * Return the CMF reducer
 * @param  {function|Object} appReducer [description]
 * @return {function}            [description]
 */
function getReducer(appReducer) {
	let reducerObject = {};
	if (appReducer) {
		if (typeof appReducer === 'object') {
			reducerObject = { ...appReducer };
		} else if (typeof appReducer === 'function') {
			reducerObject = { app: appReducer };
		}
	} else {
		invariant(true, 'Are you sure you want to bootstrap an app without reducers ?');
	}
	if (!reducerObject.cmf) {
		reducerObject.cmf = cmfReducers;
	}

	return enableBatching(preApplyReducer(nestedCombineReducers(reducerObject, combineReducers)));
}

/**
 * return the array of all middleware needed for CMF to run
 * @param {array|function} middleware
 * @returns {array} of middlewares
 */
function getMiddlewares(middleware) {
	if (Array.isArray(middleware)) {
		middleware.forEach(mid => {
			if (middlewares.indexOf(mid) === -1) {
				middlewares.push(mid);
			}
		});
	} else if (middleware) {
		middlewares.push(middleware);
	}
	if (!defaultHttpMiddlewareOverwrite) {
		setHttpMiddleware(httpMiddleware());
	}
	return middlewares;
}

/**
 * helper to create the store with all the things needed by CMF
 * the store look like this:
 * - root
 * |- app (with appReducer)
 * |- cmf (for the internals)
 *
 * @param  {function} appReducer   the reducer for your app.
 * @param  {any} preloadedState if you want to create your state tree with initial values.
 *                              This is usefull for server side renderring
 * @param  {function} enhancer     The store enhancer
 * @param  {Array|function} middleware   redux middleware: http://redux.js.org/docs/api/applyMiddleware.html
 * @return {Object}              The created store
 */
function initialize(appReducer, preloadedState, enhancer, middleware) {
	const reducer = getReducer(appReducer);
	if (typeof enhancer === 'function') {
		enhancers.push(enhancer);
	}
	const middles = getMiddlewares(middleware);
	const store = compose(applyMiddleware(...middles), ...enhancers)(createStore)(
		reducer,
		preloadedState,
	);

	return store;
}

export default {
	addPreReducer,
	setHttpMiddleware,
	initialize,
	// for testing purepose only
	getReducer,
	getMiddlewares,
};
