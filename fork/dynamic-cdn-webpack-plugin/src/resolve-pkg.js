const { findPackage } = require('./find');

/* eslint-disable no-empty */
/**
 *
 * @param {string} moduleId use to require it
 * @param {Object} options object with cwd property
 * @returns {string|undefined} the full path of the module id requested
 */
function resolve(moduleId, options) {
	if (options.version) {
		let scope;
		if (moduleId.startsWith('@')) {
			scope = moduleId.split('/')[0];
		}
		const found = findPackage({ name: moduleId, version: options.version });
	}
	let paths = require.resolve.paths(moduleId) || [];

	if (options && options.cwd) {
		paths = [options.cwd].concat(paths);
	}

	try {
		return require.resolve(moduleId, { paths });
	} catch {}
	return undefined;
}

module.exports = resolve;
