const fs = require('fs');
const pathLib = require('path');

/**
 * this function go in recursive way to get all the json in the directory
 * @param {string} fileOrFolder path to the folder or the json file
 */
function findJson(fileOrFolder, recursive) {
	let jsonFiles = [];
	if (fileOrFolder.endsWith('.json')) {
		jsonFiles.push(fileOrFolder);
	} else {
		fs.readdirSync(fileOrFolder).forEach(path => {
			const fullpath = pathLib.join(fileOrFolder, path);
			if (path.endsWith('.json')) {
				jsonFiles.push(fullpath);
			} else if (recursive && fs.lstatSync(fullpath).isDirectory()) {
				jsonFiles = jsonFiles.concat(...findJson(fullpath, recursive));
			}
		});
	}
	return jsonFiles;
}

/**
 * default function handler to deepmerge settings
 * @param {Array} destinationArray some array
 * @param {Array} sourceArray another array
 */
function concatMerge(destinationArray, sourceArray) {
	return destinationArray.concat(sourceArray);
}

/**
 * This function return a logger to use in script
 * @param {boolean} quiet set the logger in quiet mode or not
 */
function getLogger(quiet) {
	return somethingToLog => {
		if (!quiet) {
			console.log(somethingToLog);
		}
	};
}

/**
 * This function scan the current folder to search for cmf.json file
 * & return the content of this file
 */
function getCmfConfig() {
	try {
		return require(pathLib.join(process.cwd(), 'cmf.json')); // eslint-disable-line
	} catch (e) {
		console.error('cmf.json file is required to run this script');
		process.exit();
	}
	return null;
}

/**
 * This function allow to get some settings from path
 * @param {string} splitedPath part of path
 * @param {object} settings Settings of a cmf application
 */
function getChildRoutes(splitedPath, settings) {
	let currentChild = settings.routes.childRoutes;
	splitedPath.forEach(path => {
		if (path !== '') {
			currentChild.forEach(config => {
				if (config.path === path) {
					currentChild = config.childRoutes || [];
				}
			});
		}
	});
	return currentChild;
}

/**
 * This function allow to override some route settings
 * @param {string} path The path of the route to override
 * @param {object} settings the settings of a cmf application
 */
function overrideRoutes(path, settings) {
	const childRoutes = getChildRoutes(path.split('/'), settings);
	settings.overrideRoutes[path].forEach(config => {
		childRoutes.push(config);
	});
	delete settings.overrideRoutes[path]; // eslint-disable-line no-param-reassign
}

function overrideActions(id, settings) {
	// eslint-disable-next-line no-param-reassign
	settings.actions[id] = Object.assign({}, settings.actions[id], settings.overrideActions[id]);
}

module.exports = {
	findJson,
	concatMerge,
	getLogger,
	getCmfConfig,
	overrideRoutes,
	getChildRoutes,
	overrideActions,
};
