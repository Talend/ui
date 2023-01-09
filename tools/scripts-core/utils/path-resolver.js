import fs from 'fs';
import path from 'path';
import which from 'which';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
/**
 * Resolve the bin module executable path.
 * This is from kcd-scripts (https://github.com/kentcdodds/kcd-scripts/blob/master/src/utils.js#L21)
 * @param modName The bin module name
 * @param executable The executable name (in case the executable has a different name)
 * @param cwd The execution path
 * @returns {*} The executable path
 */
export function resolveBin(modName, { executable = modName, cwd = process.cwd() } = {}) {
	let systemCommandPath;
	try {
		systemCommandPath = fs.realpathSync(which.sync(executable));
	} catch (_error) {
		// ignore _error
	}
	try {
		const modPkgPath = require.resolve(`${modName}/package.json`);
		const modPkgDir = path.dirname(modPkgPath);
		const mod = JSON.parse(fs.readFileSync(modPkgPath));
		const { bin } = mod.bin;
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
export function getAbsolutePath(userPath) {
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
export function hereRelative(dirname, filePath) {
	return path.join(dirname, filePath).replace(process.cwd(), '.');
}

export function getPkgRootPath(name) {
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
export function fixWindowsPath(pathStr) {
	return process.platform === 'win32' ? pathStr.replace(/\\/g, '/') : pathStr;
}
