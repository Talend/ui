const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const deepmerge = require('deepmerge');

const DEFAULT_SETTINGS_EXT = '.json';

const DEFAULT_CONFIG_FILENAME = 'cmf.json';

function merge(options, callback) {
	const {
		dev,
		quiet,
		recursive,
	} = Object.assign({
		dev: false,
		quiet: false,
		recursive: false,
	}, options);

	function log(message) {
		if (!quiet) {
			console.log(message); // eslint-disable-line no-console
		}
	}

	function error(...args) {
		console.error(args); // eslint-disable-line no-console
		callback();
	}

	function importAndValidate(filePath) {
		let file;
		try {
			delete require.cache[require.resolve(filePath)];
			file = require(filePath); // eslint-disable-line global-require
		} catch (e) {
			error(`${filePath} does not exist`, e);
		}
		try {
			JSON.parse(file);
		} catch (e) {
			error(`${filePath} is invalid`, e);
		}
		return file;
	}

	function findJson(fileOrFolder) {
		let files = [];
		if (fileOrFolder.endsWith(DEFAULT_SETTINGS_EXT)) {
			files.push(fileOrFolder);
		} else {
			fs.readdirSync(fileOrFolder).forEach(path => {
				const fullpath = pathLib.join(fileOrFolder, path);
				if (path.endsWith(DEFAULT_SETTINGS_EXT)) {
					files.push(fullpath);
				} else if (recursive && fs.lstatSync(fullpath).isDirectory()) {
					files = files.concat(...findJson(fullpath));
				}
			});
		}
		return files;
	}

	function concatMerge(destinationArray, sourceArray) {
		return destinationArray.concat(sourceArray);
	}

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

	// Init some stuff to use next
	const cmfconfigPath = path.join(process.cwd(), DEFAULT_CONFIG_FILENAME);
	const cmfconfig = importAndValidate(cmfconfigPath);

	// Get sources & destination paths
	const sources = dev ? cmfconfig.settings['sources-dev'] : cmfconfig.settings.sources;
	const destination = path.join(process.cwd(), cmfconfig.settings.destination);

	// Extract json from sources
	const jsonFiles = sources.reduce(
		(acc, source) => acc.concat([...findJson(path.join(process.cwd(), source))]),
		[],
	);

	log('Extracting configuration from:', jsonFiles);
	const configurations = jsonFiles.map(importAndValidate);

	// Merge json stuff in one object / settings
	const settings = deepmerge.all(configurations, {
		arrayMerge: concatMerge,
	});

	// Override actions & routes
	if (settings.overrideRoutes) {
		Object.keys(settings.overrideRoutes).forEach(route => {
			overrideRoutes(route, settings);
		});
	}
	if (settings.overrideActions) {
		Object.keys(settings.overrideActions).forEach(id => {
			overrideActions(id, settings);
		});
	}

	// Write the merged file
	log(`Merge to ${destination}`);
	mkdirp(path.dirname(destination), () => {
		fs.writeFile(destination, JSON.stringify(settings), () => {
			log('Merged');
		});
	});

	return jsonFiles.concat(cmfconfig);
}

export default merge;
