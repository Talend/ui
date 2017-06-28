/**
 * This is the core principle of react-cmf.
 * The registry will register everything from a react component to redux action.
 * @module react-cmf/lib/registry
 */
/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }]*/

/**
 * The registry that will have the singleton
 * - getRegistry() -> the registry which is a simple key/value POJO
 * @type {Object}
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
 * @return {object} the registry singleton instance
 */
function getRegistry(context) {
	if (context && context.registry) {
		return context.registry;
	}
	return Registry.getRegistry();
}

/**
 * Call this one to add anything you want into the registry.
 * It will be added only if not locked.
 * Be warned any existing content will be overridden.
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
