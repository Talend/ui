/**
 * @module react-cmf
 */

import actions from './actions/';
import actionCreator from './actionCreator';

import bootstrap from './bootstrap';
import cmfConnect from './cmfConnect';
import component from './component';
import ConnectedDispatcher from './Dispatcher';
import expression from './expression';
import expressions from './expressions';
import Inject from './Inject.component.js';
import matchPath from './matchPath';
import sagas from './sagas';
import selectors from './selectors';
import localStorage from './localStorage';

// DEPRECATED APIs
import action from './action';
import App from './App';
import reducers from './reducers';
import registry from './registry';
import RegistryProvider from './RegistryProvider';
import store from './store';
import getErrorMiddleware from './middlewares/error';
import httpMiddleware from './middlewares/http';
import componentState from './componentState';

const Dispatcher = ConnectedDispatcher;

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
	expression,
	expressions,
	registerInternals,
	registry,
	router: {
		matchPath,
	},
	saga: sagas,
	sagas,
	selectors,
	localStorage,
};
