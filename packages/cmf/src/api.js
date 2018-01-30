/**
 * this module define a high level API to handle common tasks
 * {action,router,registry}
 * @module react-cmf/lib/api
 * @see module:react-cmf/lib/route
 * @see module:react-cmf/lib/action
 * @see module:react-cmf/lib/actions
 * @see module:react-cmf/lib/expression
 * @see module:react-cmf/lib/saga
 * @example
// register a component in configure.js of your app

import { api } from '@talend/react-cmf';
import components from './components';
import expressions from './expressions';
import actions from './actions';

Object.keys(components).forEach(id => api.route.registerComponent(id, components[id]));
Object.keys(expressions).forEach(id => api.expressions.register(id, expressions[id]));

api.action.registerActionCreator('my:edit', actions.myEdit);
 */

import registry from './registry';
import route from './route';
import action from './action';
import actions from './actions';
import actionCreator from './actionCreator';
import expression from './expression';
import saga from './saga';
import component from './component';

export default {
	action,
	actions,
	actionCreator,
	component,
	expression,
	route,
	registry,
	saga,
};
