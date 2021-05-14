const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const deepmerge = require('deepmerge');

const { getI18Next, parseI18n, parseSettings, saveSettings } = require('./cmf-settings.i18n');

const {
	concatMerge,
	findJson,
	getLogger,
	importAndValidate,
	overrideActions,
	overrideRoutes,
	setLogger,
} = require('./cmf-settings.utils');

const DEFAULT_CONFIG_FILENAME = 'cmf.json';

function getCmfconfig(cmfconfigPath, onError) {
	const cmfconfig = importAndValidate(cmfconfigPath, onError);
	if (process.env.CMF_ENV) {
		return cmfconfig[process.env.CMF_ENV];
	}
	return cmfconfig;
}

/**
 * merge write a json settings file for CMF ready to be served
 * @param {Object} options
 * @param {function} errorCallback
 * @return Array<string> source files used
 */
function merge(options, errorCallback) {
	const onErrorCallback = errorCallback || Function.prototype;
	function onError(...args) {
		console.error(args); // eslint-disable-line no-console
		return onErrorCallback();
	}

	const { dev, quiet, recursive } = Object.assign(
		{
			dev: false,
			quiet: false,
			recursive: false,
		},
		options,
	);

	setLogger(quiet);
	const logger = getLogger();

	// Init some stuff to use next
	const cmfconfigPath = path.join(process.cwd(), DEFAULT_CONFIG_FILENAME);
	const cmfconfig = options.cmfConfig || getCmfconfig(cmfconfigPath, onError);
	const sources = dev ? cmfconfig.settings['sources-dev'] : cmfconfig.settings.sources;
	let destination = cmfconfig.settings.destination;
	if (destination && !path.isAbsolute(destination)) {
		destination = path.join(process.cwd(), cmfconfig.settings.destination);
	}
	let settings;
	let jsonFiles = [];
	if (cmfconfig.settings.destination) {
		// Extract json from sources
		jsonFiles = sources.reduce(
			(acc, source) => acc.concat([...findJson(path.join(process.cwd(), source), recursive)]),
			[],
		);

		logger('Extracting configuration from:', jsonFiles);
		const configurations = jsonFiles
			.map(jsonFile => importAndValidate(jsonFile, onError))
			.concat([{}]);

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
		if (settings.routes && options.publicPath) {
			settings.routes.path = options.publicPath;
		}
		if (settings.overrideActions) {
			Object.keys(settings.overrideActions).forEach(id => {
				overrideActions(id, settings);
			});
		}
	}

	// extract all keys from a folder
	if (
		cmfconfig.settings.i18n &&
		(cmfconfig.settings.i18n['extract-languages'] || cmfconfig.settings.i18n.languages) &&
		cmfconfig.settings.i18n['extract-from'] &&
		cmfconfig.settings.i18n['namespace-paths'] &&
		cmfconfig.settings.i18n['extract-namespaces']
	) {
		const namespaces = cmfconfig.settings.i18n['namespace-paths'].filter(namespace =>
			cmfconfig.settings.i18n['extract-namespaces'].includes(namespace.name),
		);

		const languages =
			cmfconfig.settings.i18n['extract-languages'] || cmfconfig.settings.i18n.languages;

		parseI18n(
			namespaces,
			languages,
			cmfconfig.settings.i18n['extract-from'],
			cmfconfig.settings.i18n['extract-sort'] || true,
		);
	}

	// parse settings to replace i18n object by the translated value
	if (
		cmfconfig.settings.i18n &&
		destination &&
		(cmfconfig.settings.i18n['source-languages'] || cmfconfig.settings.i18n.languages) &&
		cmfconfig.settings.i18n['namespace-paths']
	) {
		const languages =
			cmfconfig.settings.i18n['source-languages'] || cmfconfig.settings.i18n.languages;

		const i18next = getI18Next(
			languages,
			cmfconfig.settings.i18n['namespace-paths'],
		);

		if (i18next) {
			languages.forEach(locale => {
				saveSettings(i18next, settings, locale, destination);
			});
		}
	}

	if (!cmfconfig.settings.i18n && destination) {
		const settingWithoutI18n = parseSettings(
			{
				changeLanguage: () => {},
				t: (key, i18nOptions) => i18nOptions.defaultValue,
			},
			settings,
		);
		// Write the merged file
		logger(`Merge to ${destination}`);
		mkdirp.sync(path.dirname(destination));
		const file = fs.createWriteStream(destination);
		file.write(JSON.stringify(settingWithoutI18n) + String.fromCharCode(10));
		file.end();
		logger('CMF settings has been merged');
	}
	return jsonFiles;
}

module.exports = merge;
