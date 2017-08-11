/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/route
 */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/

import { connect } from 'react-redux';
import registry from './registry';
import { mapStateToViewProps } from './settings';
import deprecated from './deprecated';

const COMPONENT_PREFIX = '_.route.component';
const HOOK_PREFIX = '_.route.hook';

/**
 * return a component from the registry
 * @param  {object} context
 * @param  {string} id
 * @return {function} the react component
 */
function getComponentFromRegistry(context, id) {
	const component = context.registry[`${COMPONENT_PREFIX}:${id}`];
	if (!component) {
		throw new Error(`component not found in the registry: ${id}`);
	}
	return component;
}


/**
 * register a component for the router configuration
 * @param  {string} id
 * @param  {any} component
 */
function registerComponent(id, component) {
	registry.addToRegistry(`${COMPONENT_PREFIX}:${id}`, component);
}

/**
 * register a function for the router configuration
 * @param  {string} id
 * @param  {function} func
 */
function registerFunction(id, func) {
	if ((typeof func) !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	registry.addToRegistry(`${HOOK_PREFIX}:${id}`, func);
}

/**
 * return a function from the router configuration
 * @param  {string} id
 */
function getFunction(id) {
	return registry.getFromRegistry(`${HOOK_PREFIX}:${id}`);
}

/**
 * return
 * @param  {[type]} state [description]
 * @param  {[type]} view  [description]
 * @return {[type]}       [description]
 */
function oldConnectView(context, component, view) {
	return connect(
		state => mapStateToViewProps(state, { view })
	)(component);
}

export const connectView = deprecated(
	oldConnectView,
	(args) => {
		const cName = args[1].displayName || args[1].name || 'Unknown';
		return `The component ${cName} must be connected using cmfConnect`;
	},
);

export default {
	getComponentFromRegistry,
	registerComponent,
	registerFunction,
	getFunction,
	connectView,
};
