/**
 * Internal. This is the core of react-cmf.
 * The registry will register everything from a react component to redux action.
 * @module react-cmf/lib/registry
 */
/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }]*/

/**
 * @typedef {Object<string, *>} Registry
 */

/**
 * The registry that will have the singleton
 * - getRegistry() -> the registry which is a simple key/value POJO
 * @type {Registry}
 */
const Registry = {
	_registry: {},
	_isLocked: false,
	getRegistry() {
		return this._registry;
	},
	lock() {
		this._isLocked = true;
	},
	isLocked() {
		return this._isLocked;
	},
};

/**
 * Returns the global registry if no context found. If count is found it returns
 * the context.registry
 * @param {object} context React context
 * @return {Registry} the registry singleton instance
 */
function getRegistry(context) {
	if (context && context.registry) {
		return context.registry;
	}
	return Registry.getRegistry();
}

/**
 * Internal. Call this one to add anything you want into the registry.
 * It will be added only if not locked.
 * Be warned any existing content will be overridden.
 * You should use this to add a new configurable concept to CMF.
 * By default it's internally used to register expression, component and actionCreator
 * @param {string} id Where you want it to store in the registry to get it later
 * @param {any} item Everything you want, a function, an object or whatever
 */
function addToRegistry(id, item, context) {
	if (Registry.isLocked()) {
		throw new Error(
			`CMF: The registry is locked, you cannot therefore add '${id}' in it. ` +
			'Please check your CMF configuration, it should not move after the initial ' +
			'configuration before bootstrap.'
		);
	}

	const registry = getRegistry(context);
	if (registry[id]) {
		console.warn( // eslint-disable-line no-console
			`CMF: The '${id}' object is registered, overriding an existing '${id}' object. ` +
			'Please check your CMF configuration, you might not want that.'
		);
	}
	if (item === undefined) {
		throw new Error(
			`CMF: you can't register undefined in '${id}'.
			You may have an import error in your configuration`
		);
	}
	registry[id] = item;
}

/**
 * Internal: return element registred under the ID.
 * @param  {string} id the object's id in the registry you want to get
 * @return {any}    the object you are looking for
 */
function getFromRegistry(id, context) {
	return getRegistry(context)[id];
}

/**
 * Lock the registry
 */
function lock() {
	Registry.lock();
}

export default {
	Registry,
	addToRegistry,
	getRegistry,
	getFromRegistry,
	lock,
};
