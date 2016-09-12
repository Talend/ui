/**
 * @module react-cmf/lib/store
 */
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import invariant from 'invariant';

import cmfReducers from './reducers';

const enhancers = [];
const middlewares = [thunk];
if (window) {
	if (window.devToolsExtension) {
		enhancers.push(window.devToolsExtension());
	}
}

const configuredRouterMiddleware = routerMiddleware(hashHistory);
middlewares.push(configuredRouterMiddleware);

/**
 * helper to create the store with all the things needed by CMF
 * the store look like this:
 * - root
 * |- app (with appReducer)
 * |- routing (for react-router)
 * |- cmf (for the internals)
 *
 * @param  {function} appReducer   the reducer for your app.
 * @param  {any} preloadedState if you want to create your state tree with initial values.
 *                              This is usefull for server side renderring
 * @param  {function} enhancer     The store enhancer
 * @param  {Array|function} middleware   redux middleware: http://redux.js.org/docs/api/applyMiddleware.html
 * @return {Object}              The created store
 */
export default function initializeStore(appReducer, preloadedState, enhancer, middleware) {
	let rootReducer;
	if (appReducer) {
		rootReducer = combineReducers({
			app: appReducer,
			routing: routerReducer,
			cmf: cmfReducers,
		});
	} else {
		invariant(true, 'Are you sure you want to bootstrap an app without reducers ?');
		rootReducer = combineReducers({
			routing: routerReducer,
			cmf: cmfReducers,
		});
	}
	if (Array.isArray(middleware)) {
		middleware.forEach((mid) => {
			if (middlewares.indexOf(mid) === -1) {
				middlewares.push(mid);
			}
		});
	} else if (middleware) {
		middlewares.push(middleware);
	}
	if (typeof enhancer === 'function') {
		enhancers.push(enhancer);
	}
	const store = compose(
		applyMiddleware(...middlewares),
		...enhancers
	)(createStore)(rootReducer, preloadedState);

	return store;
}
