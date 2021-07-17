const fs = require('fs');
const path = require('path');
const noop = require('lodash/noop');

const DEFAULT_SETTINGS_EXT = '.json';

let logger;

function log(...args) {
	console.log(args); // eslint-disable-line no-console
}

function setLogger(quiet) {
	if (quiet) {
		logger = noop;
	} else {
		logger = log;
	}
}

function getLogger() {
	return logger;
}

function overrideActions(id, settings) {
	// eslint-disable-next-line no-param-reassign
	settings.actions[id] = Object.assign({}, settings.actions[id], settings.overrideActions[id]);
}

function getChildRoutes(splitedPath, settings) {
	let currentChild = settings.routes.childRoutes;
	splitedPath.forEach(filePath => {
		if (filePath !== '') {
			currentChild.forEach(config => {
				if (config.path === filePath) {
					currentChild = config.childRoutes || [];
				}
			});
		}
	});
	return currentChild;
}

function overrideRoutes(filePath, settings) {
	const childRoutes = getChildRoutes(filePath.split('/'), settings);
	settings.overrideRoutes[filePath].forEach(config => {
		childRoutes.push(config);
	});
	delete settings.overrideRoutes[filePath]; // eslint-disable-line no-param-reassign
}

function concatMerge(destinationArray, sourceArray) {
	return destinationArray.concat(sourceArray);
}

function findJson(fileOrFolder, recursive = false) {
	let files = [];
	if (fileOrFolder.endsWith(DEFAULT_SETTINGS_EXT)) {
		files.push(fileOrFolder);
	} else {
		fs.readdirSync(fileOrFolder).forEach(fileOrFolderPath => {
			const fullpath = path.join(fileOrFolder, fileOrFolderPath);
			if (fileOrFolderPath.endsWith(DEFAULT_SETTINGS_EXT)) {
				files.push(fullpath);
			} else if (recursive && fs.lstatSync(fullpath).isDirectory()) {
				files = files.concat(...findJson(fullpath, recursive));
			}
		});
	}
	return files;
}

function importAndValidate(filePath, onError) {
	let file;

	try {
		delete require.cache[require.resolve(filePath)];
		file = require(filePath); // eslint-disable-line global-require
	} catch (e) {
		onError(`${filePath} does not exist`, e);
	}

	return file;
}

function sortObject(object) {
	return Object.keys(object)
		.sort()
		.reduce((state, key) => ({ ...state, [key]: object[key] }), {});
}


module.exports = {
	concatMerge,
	findJson,
	importAndValidate,
	getLogger,
	overrideActions,
	overrideRoutes,
	setLogger,
	sortObject,
};
