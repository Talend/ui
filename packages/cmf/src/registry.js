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
 * Call this one to add anything you want into the registry.
 * It will be added only if not locked.
 * Be warned any existing content will be overridden.
 * @param {string} id Where you want it to store in the registry to get it later
 * @param {any} item Everything you want, a function, an object or whatever
 */
function addToRegistry(id, item) {
	const r = Registry.getRegistry();
	if (!r.isLocked) {
		r[id] = item;
	}
	// Should it do nothing ?
}

/**
 * @return {object} the registry singleton instance
 */
function getRegistry() {
	return Registry.getRegistry();
}

/**
 * @param  {string} id the object's id in the registry you want to get
 * @return {any}    the object you are looking for
 */
function getFromRegistry(id) {
	return getRegistry()[id];
}

export default {
	Registry,
	addToRegistry,
	getRegistry,
	getFromRegistry,
};
