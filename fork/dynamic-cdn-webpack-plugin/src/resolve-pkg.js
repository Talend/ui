/* eslint-disable no-empty */
/**
 *
 * @param {string} moduleId use to require it
 * @param {Object} options object with cwd property
 * @returns {string|undefined} the full path of the module id requested
 */
function resolve(moduleId, options) {
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
