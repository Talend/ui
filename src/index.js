/**
 * @module react-cmf
 */

import api from './api';
import App from './App';
import ConnectedDispatcher from './Dispatcher';
import Icon from './Icon';
import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';
import history from './history';
import initializeStore from './store';
import actions from './actions/';
import reducers from './reducers/';

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
	Dispatcher,
	history,
	initializeStore,
	Icon,
	reducers,
	RegistryProvider,
	UIRouter,
};
