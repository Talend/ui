/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');
const which = require('which');

/**
 * Resolve the bin module executable path.
 * This is from kcd-scripts (https://github.com/kentcdodds/kcd-scripts/blob/master/src/utils.js#L21)
 * @param modName The bin module name
 * @param executable The executable name (in case the executable has a different name)
 * @param cwd The execution path
 * @returns {*} The executable path
 */
function resolveBin(modName, { executable = modName, cwd = process.cwd() } = {}) {
	let systemCommandPath;
	try {
		systemCommandPath = fs.realpathSync(which.sync(executable));
	} catch (_error) {
		// ignore _error
	}
	try {
		const modPkgPath = require.resolve(`${modName}/package.json`);
		const modPkgDir = path.dirname(modPkgPath);
		const { bin } = require(modPkgPath);
		const binPath = typeof bin === 'string' ? bin : bin[executable];
		const fullPathToBin = path.join(modPkgDir, binPath);
		if (fullPathToBin === systemCommandPath) {
			return executable;
		}
		return fullPathToBin.replace(cwd, '.');
	} catch (error) {
		if (systemCommandPath) {
			return executable;
		}
		throw error;
	}
}

/**
 * Get the absolute path for user provided path
 * @param userPath The path to resolve
 * @returns {*} The absolute path
 */
function getAbsolutePath(userPath) {
	if (userPath.startsWith('/')) {
		return userPath;
	}
	return `${process.cwd()}/${userPath}`;
}

/**
 * Resolve relative path from cwd
 * @param dirname The folder the path starts from
 * @param filePath The path
 * @returns {string} The relative path from cwd
 */
function hereRelative(dirname, filePath) {
	return path
		.join(dirname, filePath)
		.replace(process.cwd(), '.');
}

module.exports = {
	getAbsolutePath,
	hereRelative,
	resolveBin,
};
