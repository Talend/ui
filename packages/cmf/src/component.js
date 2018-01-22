import invariant from 'invariant';
import action from './action';
import expression from './expression';
import registry from './registry';
import schema from './schema';
import CONST from './constant';

/**
 * All stuff related to the routing in CMF
 * @module react-cmf/lib/component
 * @see module:react-cmf/lib/component
 */

/**
 * return a component from the registry
 * @param  {string} id the component id you want
 * @param  {object} context optional context to get the registry
 * @return {function} the react component
 */
function get(id, context) {
	const component = registry.getFromRegistry(`${CONST.REGISTRY_COMPONENT_PREFIX}:${id}`, context);
	if (!component) {
		throw new Error(`component not found in the registry: ${id}`);
	}
	return component;
}

/**
 * register a component for the router configuration
 * @param  {string} id the component id you want to register
 * @param  {any} component the component you want to register
 * @param  {object} context optional context to get the registry
 */
function register(id, component, context) {
	if (!component) {
		invariant(process.env.NODE_ENV !== 'production', 'You can register undefined as a component');
		return;
	}
	registry.addToRegistry(`${CONST.REGISTRY_COMPONENT_PREFIX}:${id}`, component, context);
	if (component.actions) {
		Object.keys(component.actions).forEach(key => {
			action.registerActionCreator(key, component.actions[key], context);
		});
	}
	if (component.expressions) {
		Object.keys(component.expressions).forEach(key => {
			expression.register(key, component.expressions[key], context);
		});
	}
	if (component.schema) {
		Object.keys(component.schema).forEach(key => {
			schema.register(key, component.schema, context)
		});
	}
}

const registerMany = registry.getRegisterMany(register);

function has(id, context) {
	return (
		registry.getFromRegistry(`${CONST.REGISTRY_COMPONENT_PREFIX}:${id}`, context) !== undefined
	);
}

export default {
	get,
	has,
	register,
	registerMany,
};
