const { findPackage } = require('./find');

/* eslint-disable no-empty */
/**
 *
 * @param {string} moduleId use to require it
 * @param {Object} options object with cwd property
 * @returns {string|undefined} the full path of the module id requested
 */
function resolve(moduleId, options) {
	let result;
	if (options && options.version) {
		result = findPackage(options);
	}
	if (!result) {
		let paths = require.resolve.paths(moduleId) || [];
		if (options && options.cwd) {
			paths = [options.cwd].concat(paths);
		}
		try {
			return require.resolve(moduleId, { paths });
		} catch {}
	}

	return result;
}

module.exports = resolve;
