import invariant from 'invariant';
import actionCreator from './actionCreator';
import expression from './expression';
import sagas from './sagas';
import registry from './registry';
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
 * register a component to let CMF be able to Inject it.
 * @param  {string} id the component id you want to register
 * @param  {any} component the component you want to register
 * @param  {object} context optional context to get the registry
 */
function register(id, component, context) {
	if (!component) {
		invariant(
			process.env.NODE_ENV === 'production',
			'You cannot register undefined as a component for id "%s"',
			id,
		);
		return;
	}
	registry.addToRegistry(`${CONST.REGISTRY_COMPONENT_PREFIX}:${id}`, component, context);
	if (component.actions) {
		actionCreator.registerMany(component.actions, context);
	}
	if (component.expressions) {
		expression.registerMany(component.expressions, context);
	}
	if (component.sagas) {
		sagas.registerMany(component.sagas, context);
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
