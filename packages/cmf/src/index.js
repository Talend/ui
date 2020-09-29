/**
 * @module react-cmf
 */

import actions from './actions';
import actionCreator from './actionCreator';

import bootstrap from './bootstrap';
import cmfConnect from './cmfConnect';
import cmfModule from './cmfModule';
import component from './component';
import ConnectedDispatcher from './Dispatcher';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.component';
import expression from './expression';
import expressions from './expressions';
import Inject from './Inject.component';
import matchPath from './matchPath';
import sagas from './sagas';
import selectors from './selectors';
import settings from './settings';
import localStorage from './localStorage';
import onError from './onError';

// DEPRECATED APIs
import action from './action';
import App from './App';
import reducers from './reducers';
import registry from './registry';
import RegistryProvider from './RegistryProvider';
import store from './store';
import middlewares from './middlewares';
import componentState from './componentState';
import constants from './constant';

const Dispatcher = ConnectedDispatcher;
const getErrorMiddleware = middlewares.error;
const httpMiddleware = middlewares.http;

function registerInternals(context) {
	actionCreator.register('cmf.saga.start', actions.saga.start, context);
	actionCreator.register('cmf.saga.stop', actions.saga.stop, context);
	expression.registerMany(expressions, context);
}

export {
	App,
	actions,
	cmfConnect,
	Dispatcher,
	ErrorBoundary,
	Inject,
	sagas,
	selectors,
	// DEPRECATED
	componentState,
	getErrorMiddleware,
	httpMiddleware,
	reducers,
	registry,
	RegistryProvider,
	store,
};

/**
 * API exported
 * @type {Object}
 * @example
import cmf from '@talend/react-cmf';
cmf.actionCreator.register(...);
cmf.connect()(MyComponent);
cmf.actions.collections.addOrReplace(...);
 * @example
import { Inject } from '@talend/react-cmf';
import { Dispatcher } from '@talend/react-cmf';
 * @see module:react-cmf/lib/api
 */
export default {
	action,
	actions,
	actionCreator,
	bootstrap,
	component,
	connect: cmfConnect,
	constants,
	expression,
	expressions,
	middlewares,
	module: cmfModule,
	onError,
	registerInternals,
	registry,
	router: {
		matchPath,
	},
	saga: sagas,
	sagas,
	selectors,
	settings,
	localStorage,
};
