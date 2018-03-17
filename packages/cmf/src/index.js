/**
 * @module react-cmf
 */

import api from './api';
import App from './App';
import cmfConnect from './cmfConnect';
import ConnectedDispatcher from './Dispatcher';
import Inject from './Inject.component.js';
import RegistryProvider from './RegistryProvider';
import CMFRouter from './route/CMFRouter';
import store from './store';
import actions from './actions/';
import reducers from './reducers/';
import getErrorMiddleware from './middlewares/error';
import httpMiddleware from './middlewares/http';
import componentState from './componentState';
import sagaRouter from './sagaRouter';
import sagas from './sagas';
import selectors from './selectors';

const Dispatcher = ConnectedDispatcher;

/**
 * API exported
 * @type {Object}
 * @example
import { api } from 'react-cmf';
api.registry; api.route; api.action;
 * @example
import { App } from 'react-cmf';
 * @example
import { Dispatcher, Icon } from 'react-cmf';
 * @see module:react-cmf/lib/api
 */
export {
	actions,
	api,
	App,
	cmfConnect,
	Dispatcher,
	Inject,
	history,
	store,
	reducers,
	componentState,
	RegistryProvider,
	CMFRouter,
	getErrorMiddleware,
	httpMiddleware,
	sagaRouter,
	sagas,
	selectors,
};
