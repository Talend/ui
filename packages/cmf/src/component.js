import invariant from 'invariant';
import action from './action';
import expression from './expression';
import registry from './registry';
import CONST from './constant';

/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/component
 */

/**
 * return a component from the registry
 * @param  {object} context
 * @param  {string} id
 * @return {function} the react component
 */
function get(contextOrId, idOrUndefined) {
	// backward compatibility can be called with or without context
	let id = idOrUndefined;
	let context = contextOrId;
	if (!id && typeof contextOrId === 'string') {
		id = contextOrId;
		context = undefined;
	}
	const component = registry.getFromRegistry(`${CONST.REGISTRY_COMPONENT_PREFIX}:${id}`, context);
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
function register(id, component, context) {
	if (!component) {
		invariant(
			process.env.NODE_ENV !== 'production',
			'You can register undefined as a component'
		);
		return;
	}
	registry.addToRegistry(`${CONST.REGISTRY_COMPONENT_PREFIX}:${id}`, component, context);
	if (component.actions) {
		Object.keys(component.actions).forEach((key) => {
			action.registerActionCreator(key, component.actions[key], context);
		});
	}
	if (component.expressions) {
		Object.keys(component.expressions).forEach((key) => {
			expression.register(key, component.expressions[key], context);
		});
	}
}

function registerMany(components, context) {
	Object.keys(components).forEach((key) => {
		register(key, components[key], context);
	});
}


export default {
	get,
	register,
	registerMany,
};
