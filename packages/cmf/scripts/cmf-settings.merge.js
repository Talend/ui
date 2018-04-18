const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const deepmerge = require('deepmerge');

const {
	getI18Next,
	getLocaleByNamespaceInFolder,
	parseSettings,
	saveSettings,
	updateLocales,
} = require('./cmf-settings.i18n');

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

function merge(options, errorCallback) {
	const onErrorCallback = errorCallback || Function.prototype;
	function onError(...args) {
		console.error(args); // eslint-disable-line no-console
		return onErrorCallback();
	}

	const { quiet, recursive } = Object.assign(
		{
			quiet: false,
			recursive: false,
		},
		options,
	);

	setLogger(quiet);
	const logger = getLogger();

	// Init some stuff to use next
	const cmfconfigPath = path.join(process.cwd(), DEFAULT_CONFIG_FILENAME);
	const cmfconfig = importAndValidate(cmfconfigPath, onError);

	let sources;
	let destination;
	let settings;
	let jsonFiles;

	if (cmfconfig.settings.destination) {
		// Get sources & destination paths
		sources = cmfconfig.settings.sources;
		destination = path.join(process.cwd(), cmfconfig.settings.destination);

		// Extract json from sources
		jsonFiles = sources.reduce(
			(acc, source) => acc.concat([...findJson(path.join(process.cwd(), source), recursive)]),
			[],
		);

		logger('Extracting configuration from:', jsonFiles);
		const configurations = jsonFiles.map(jsonFile => importAndValidate(jsonFile)).concat([{}]);

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

	// extract all keys from a folder
	if (
		cmfconfig.settings.i18n &&
		cmfconfig.settings.i18n.languages &&
		cmfconfig.settings.i18n['extract-from'] &&
		cmfconfig.settings.i18n['namepace-paths'] &&
		cmfconfig.settings.i18n['extract-namepaces']
	) {
		cmfconfig.settings.i18n['extract-namepaces']
			.filter(namespace => cmfconfig.settings.i18n['namepace-paths'][namespace])
			.forEach(namespace => {
				let i18nKeys = {};
				i18nKeys = getLocaleByNamespaceInFolder(
					path.join(process.cwd(), ...cmfconfig.settings.i18n['extract-from'].split('/')),
					namespace,
				);

				updateLocales(
					i18nKeys,
					cmfconfig.settings.languages,
					namespace,
					cmfconfig.settings.i18n['namepace-paths'][namespace],
				);
			});
	}

	// parse settings to replace i18n object by the translated value
	if (
		cmfconfig.settings.i18n &&
		cmfconfig.settings.i18n.languages &&
		cmfconfig.settings.i18n['namepace-paths']
	) {
		const i18next = getI18Next(
			cmfconfig.settings.i18n.languages,
			cmfconfig.settings.i18n['namepace-paths'],
		);

		if (i18next) {
			cmfconfig.settings.languages.forEach(locale =>
				saveSettings(i18next, settings, locale, destination),
			);
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
		file.write(JSON.stringify(settingWithoutI18n));
		file.end();
		logger('CMF settings has been merged');
		return jsonFiles.concat(cmfconfigPath);
	}

	return [];
}

module.exports = merge;
