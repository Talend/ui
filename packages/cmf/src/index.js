/**
 * @module react-cmf
 */
import * as mock from './mock';
// DEPRECATED APIs
import action from './action';
import actionCreator from './actionCreator';
import actions from './actions';
import App from './App';
import bootstrap from './bootstrap';
import cmfConnect from './cmfConnect';
import cmfModule from './cmfModule';
import component from './component';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.component';
import { CmfRegisteredSaga, Saga } from './components/Saga';
import componentState from './componentState';
import constants from './constant';
import ConnectedDispatcher from './Dispatcher';
import expression from './expression';
import expressions from './expressions';
import Inject from './Inject.component';
import localStorage from './localStorage';
import matchPath from './matchPath';
import middlewares from './middlewares';
import onError from './onError';
import reducers from './reducers';
import registry from './registry';
import RegistryProvider from './RegistryProvider';
import sagas from './sagas';
import selectors from './selectors';
import settings from './settings';
import store from './store';
import { useCMFContext } from './useContext';

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
	mock,
	sagas,
	selectors,
	// DEPRECATED
	componentState,
	getErrorMiddleware,
	httpMiddleware,
	reducers,
	registry,
	RegistryProvider,
	Saga,
	CmfRegisteredSaga,
	store,
	useCMFContext,
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
	CmfRegisteredSaga,
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
	Saga,
	saga: sagas,
	sagas,
	selectors,
	settings,
	localStorage,
};
