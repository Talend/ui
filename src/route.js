/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/route
 */
import { connect } from 'react-redux';
import registry from './registry';

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
 * internal. Is here to replace all 'component' from an object by their
 * value in the registry
 * @param  {object} context
 * @param  {object} item
 */
function loadComponents(context, item) {
	/* eslint no-param-reassign: ["error", { "props": false }] */
	if (item.component) {
		item.component = getComponentFromRegistry(context, item.component);
		if (item.view) {
			if (context.store) {
				item.component = connect(
					(state) =>
						Object.assign(
							{},
							state.cmf.settings.views[item.view],
							{ dispatch: context.store.dispatch }
						)
				)(item.component);
			} else {
				item.component = connect(
					(state) => state.cmf.settings.views[item.view]
				)(item.component);
			}
		}
	}
	if (item.components) {
		// TODO: iterate over all keys to call loadComponents
	}
	if (item.getComponent) {
		item.getComponent = getFunction(item.getComponent);
	}
	if (item.getComponents) {
		item.getComponents = getFunction(item.getComponents);
	}
	if (item.onEnter) {
		item.onEnter = getFunction(item.onEnter);
	}
	if (item.onLeave) {
		item.onEnter = getFunction(item.onEnter);
	}
	if (item.childRoutes) {
		item.childRoutes.forEach((route) => loadComponents(context, route));
	}
	if (item.indexRoute) {
		loadComponents(context, item.indexRoute);
	}
}

/**
 * get the react router configuration 'routes' from our settings
 * @param  {object} context
 * @param  {object} settings
 * @return {object} react router config
 */
function getRoutesFromSettings(context, settings) {
	const copy = Object.assign({}, settings);
	loadComponents(context, copy);
	return copy;
}

export default {
	loadComponents,
	getRoutesFromSettings,
	getComponentFromRegistry,
	registerComponent,
	registerFunction,
	getFunction,
};
