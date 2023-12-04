const { fileURLToPath } = require('url');
const path = require('path');
const fs = require('fs');
const which = require('which');

function getDirName(url) {
	const filename = fileURLToPath(url);
	return path.dirname(filename);
}

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
	if (process.platform === 'win32' && systemCommandPath) {
		return systemCommandPath;
	} else if (systemCommandPath) {
		return executable;
	}
}

/**
 * Resolve the module script path.
 * @param modName The bin module name
 * @returns {*} The executable path
 */
function resolveScript(modName) {
	const filePath = import.meta.resolve(modName);
	const parsedUrl = new URL(filePath);
	let fileURL = parsedUrl.pathname;

	// For windows, remove the first char who is a slash
	if (process.platform === 'win32') {
		fileURL = fileURL.substring(1);
	}
	return fileURL;
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
	return path.join(process.cwd(), userPath);
}

/**
 * Resolve relative path from cwd
 * @param dirname The folder the path starts from
 * @param filePath The path
 * @returns {string} The relative path from cwd
 */
function hereRelative(dirname, filePath) {
	return path.join(dirname, filePath).replace(process.cwd(), '.');
}

function getPkgRootPath(name) {
	let rootPath;
	try {
		const indexPath = require.resolve(name);
		let currentPath = indexPath;
		let found = false;
		while (!found) {
			currentPath = path.dirname(currentPath);
			found = fs.existsSync(path.join(currentPath, 'package.json'));
			if (found) {
				rootPath = currentPath;
			}
		}
	} catch (e) {
		console.error(e);
	}
	return rootPath;
}

// Temporary fixes until Storybook handles well Windows path
// Waiting for a release https://github.com/storybookjs/storybook/pull/17641
function fixWindowsPath(pathStr) {
	return process.platform === 'win32' ? pathStr.replace(/\\/g, '/') : pathStr;
}

module.exports = {
	fixWindowsPath,
	getPkgRootPath,
	hereRelative,
	getDirName,
	getAbsolutePath,
	resolveBin,
	resolveScript,
};
