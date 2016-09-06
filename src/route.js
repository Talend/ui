import { connect } from 'react-redux';
import registry from './registry';

const componentPrefix = '_.route.component';
const hookPrefix = '_.route.hook';

/**
 * return a component from the registry
 * @param  {object} context
 * @param  {string} id
 * @return {function} the react component
 */
function getComponentFromRegistry(context, id) {
	const component = context.registry[`${componentPrefix}:${id}`];
	if (!component) {
		throw new Error(`component not found in the registry: ${id}`);
	}
	return component;
}


/**
 * register a component for the router configuration
 * @param  {string} id
 * @param  {function} component
 */
function registerComponent(id, component) {
	registry.addToRegistry(`${componentPrefix}:${id}`, component);
}


function registerFunction(id, func) {
	if ((typeof func) !== 'function') {
		throw new Error('registerFunction wait for a function');
	}
	registry.addToRegistry(`${hookPrefix}:${id}`, func);
}

function getFunction(id) {
	return registry.getFromRegistry(`${hookPrefix}:${id}`);
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
			item.component = connect(
				(state) => state.cmf.settings.views[item.view]
			)(item.component);
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
