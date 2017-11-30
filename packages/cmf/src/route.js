/**
 * Internal. Provide low level function to configure CMF to drive react-router.
 * @module react-cmf/lib/route
 */

/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/

import { connect } from 'react-redux';
import registry from './registry';
import { mapStateToViewProps } from './settings';
import deprecated from './deprecated';
import CONST from './constant';
import component from './component';

const getComponentFromRegistry = deprecated(
	(context, id) => component.get(id, context),
	'stop use api.route.getComponentFromRegistry. Please use api.component.get',
);

const registerComponent = deprecated(
	component.register,
	'stop use api.route.registerComponent. please use api.component.register',
);

/**
 * register a function for the router configuration
 * @param  {string} id
 * @param  {function} func
 */
function registerFunction(id, func) {
	if (typeof func !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	registry.addToRegistry(`${CONST.REGISTRY_HOOK_PREFIX}:${id}`, func);
}

/**
 * return a function from the router configuration
 * @param  {string} id
 */
function getFunction(id) {
	return registry.getFromRegistry(`${CONST.REGISTRY_HOOK_PREFIX}:${id}`);
}

/**
 * DEPRECATED connection to support old component which are registred but
 * not CMF connected.
 * @param  {object} context React context with at least the stostore
 * @param  {any} component  React component to connect
 * @param  {string} view  the viewId to search for in settings
 * @return {any}       the connected component with it's view props injected
 */
function oldConnectView(context, Component, view) {
	return connect(state => mapStateToViewProps(state, { view }))(Component);
}

export const connectView = deprecated(oldConnectView, args => {
	const cName = args[1].displayName || args[1].name || 'Unknown';
	return `The component ${cName} must be connected using cmfConnect`;
});

export default {
	getComponentFromRegistry,
	registerComponent,
	registerFunction,
	getFunction,
	connectView,
};
