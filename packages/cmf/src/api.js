/**
 * this module define a high level API to handle common tasks
 * {action,router,registry}
 * @module react-cmf/lib/api
 * @see module:react-cmf/lib/registry
 * @see module:react-cmf/lib/route
 * @see module:react-cmf/lib/action
 */

import registry from './registry';
import route from './route';
import action from './action';
import expression from './expression';

export default {
	action,
	expression,
	route,
	registry,
};
