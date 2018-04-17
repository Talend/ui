const fs = require('fs').default || require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const deepmerge = require('deepmerge');
const Ajv = require('ajv');

const {
	getLocaleByNamespaceInFolder,
	getLocaleByNamespace,
	updateLocales,
	setI18Next,
	saveSettings,
} = require('./cmf-settings.i18n');

const ajv = new Ajv();

const DEFAULT_SETTINGS_EXT = '.json';
const DEFAULT_CONFIG_FILENAME = 'cmf.json';

function merge(options, errorCallback) {
	const onError = errorCallback || Function.prototype;

	const { dev, recursive } = Object.assign(
		{
			dev: false,
			quiet: false,
			recursive: false,
		},
		options,
	);

	function error(...args) {
		console.error(args); // eslint-disable-line no-console
		return onError();
	}

	function importAndValidate(filePath, schema) {
		let file;
		try {
			delete require.cache[require.resolve(filePath)];
			file = require(filePath); // eslint-disable-line global-require
		} catch (e) {
			error(`${filePath} does not exist`, e);
		}
		if (!ajv.validate(schema || {}, file)) {
			error(`${filePath} is invalid`, ajv.errors);
		}
		return file;
	}

	function findJson(fileOrFolder) {
		let files = [];
		if (fileOrFolder.endsWith(DEFAULT_SETTINGS_EXT)) {
			files.push(fileOrFolder);
		} else {
			fs.readdirSync(fileOrFolder).forEach(fileOrFolderPath => {
				const fullpath = path.join(fileOrFolder, fileOrFolderPath);
				if (fileOrFolderPath.endsWith(DEFAULT_SETTINGS_EXT)) {
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

	function overrideActions(id, settings) {
		// eslint-disable-next-line no-param-reassign
		settings.actions[id] = Object.assign({}, settings.actions[id], settings.overrideActions[id]);
	}

	// Init some stuff to use next
	const cmfconfigPath = path.join(process.cwd(), DEFAULT_CONFIG_FILENAME);
	const cmfconfig = importAndValidate(cmfconfigPath);

	let sources;
	let destination;
	let settings;

	if (cmfconfig.settings.destination) {
		// Get sources & destination paths
		sources = dev ? cmfconfig.settings['sources-dev'] : cmfconfig.settings.sources;
		destination = path.join(process.cwd(), cmfconfig.settings.destination);

		// Extract json from sources
		const jsonFiles = sources.reduce(
			(acc, source) => acc.concat([...findJson(path.join(process.cwd(), source))]),
			[],
		);

		const configurations = jsonFiles.map(jsonFile => importAndValidate(jsonFile));

		// Merge json stuff in one object / settings
		settings = deepmerge.all(configurations, {
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
	}

	if (cmfconfig.settings['extract-locale']) {
		Object.keys(cmfconfig.settings['extract-locale']).forEach(namespace => {
			let i18nKeys = {};
			if (cmfconfig.settings['extract-from']) {
				i18nKeys = getLocaleByNamespaceInFolder(
					path.join(process.cwd(), ...cmfconfig.settings['extract-from'].split('/')),
					namespace,
				);
			} // else {
			// 	i18nKeys = getLocaleByNamespace(settings, namespace);
			// }

			updateLocales(
				i18nKeys,
				cmfconfig.settings.languages,
				namespace,
				cmfconfig.settings['extract-locale'][namespace],
			);
		});
	}

	if (settings && cmfconfig.settings.namespaces && cmfconfig.settings.languages) {
		const i18next = setI18Next(cmfconfig.settings.languages, cmfconfig.settings.namespaces);

		if (i18next) {
			cmfconfig.settings.languages.forEach(locale =>
				saveSettings(i18next, settings, locale, destination),
			);
		}
	}

	if (destination) {
		// Write the merged file
		mkdirp(path.dirname(destination), () => {
			const file = fs.createWriteStream(destination);
			file.write(JSON.stringify(settings, null, '  '));
			console.log(`${destination} created.`);
			file.end();
		});
	}
}

module.exports = merge;
