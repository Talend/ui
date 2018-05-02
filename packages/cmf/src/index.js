/**
 * @module react-cmf
 */

import actions from './actions/';
import actionCreator from './actionCreator';
import api from './api';
import bootstrap from './bootstrap';
import cmfConnect from './cmfConnect';
import component from './component';
import ConnectedDispatcher from './Dispatcher';
import expression from './expression';
import expressions from './expressions';
import Inject from './Inject.component.js';
import sagaRouter from './sagaRouter';
import sagas from './sagas';
import selectors from './selectors';

const Dispatcher = ConnectedDispatcher;

export {
	actions,
	api,
	cmfConnect,
	Dispatcher,
	Inject,
	history,
	sagaRouter,
	sagas,
	selectors,
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
	actions,
	actionCreator,
	bootstrap,
	component,
	connect: cmfConnect,
	expression,
	expressions,
	sagas,
	selectors,
};
