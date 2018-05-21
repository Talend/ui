/**
 * @module react-cmf
 */

import actions from './actions/';
import actionCreator from './actionCreator';
import component from './component';
import ConnectedDispatcher from './Dispatcher';
import cmfConnect from './cmfConnect';
import Inject from './Inject.component.js';
import sagas from './sagas';
import selectors from './selectors';
import matchPath from './sagaRouter/matchPath';
import expression from './expression';
import expressions from './expressions';

// DEPRECATED APIs
import action from './action';
import App from './App';
import reducers from './reducers';
import registry from './registry';
import route from './route';
import sagaRouter from './sagaRouter';
import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';
import history from './history';
import store from './store';
import getErrorMiddleware from './middlewares/error';
import httpMiddleware from './middlewares/http';
import componentState from './componentState';

const Dispatcher = ConnectedDispatcher;

export {
	App,
	actions,
	cmfConnect,
	Dispatcher,
	Inject,
	sagas,
	selectors,

	// DEPRECATED by bootstrap
	componentState,
	getErrorMiddleware,
	history,
	httpMiddleware,
	reducers,
	RegistryProvider,
	sagaRouter,
	store,
	UIRouter,
};

function registerInternals(context) {
	actionCreator.register('cmf.saga.start', actions.saga.start, context);
	actionCreator.register('cmf.saga.stop', actions.saga.stop, context);
	expression.registerMany(expressions, context);
}

/**
 * API exported
 * @type {Object}
 * @example
import cmf from 'react-cmf';
cmf.registry; cmf.route; cmf.action;
 * @example
import { App } from 'react-cmf';
 * @example
import { Dispatcher, Icon } from 'react-cmf';
 */
export default {
	action,
	actions,
	actionCreator,
	cmfConnect,
	component,
	expression,
	expressions,
	registerInternals,
	registry,
	route,
	router: {
		matchPath,
	},
	saga: sagas,
	sagas,
	selectors,
};
