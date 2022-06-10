const path = require('path');
const fs = require('fs');
const jsonpath = require('jsonpath');
const cloneDeep = require('lodash/cloneDeep');
const difference = require('lodash/difference');
const get = require('lodash/get');
const intersection = require('lodash/intersection');
const set = require('lodash/set');
const mkdirp = require('mkdirp');

const { getLogger, sortObject } = require('./cmf-settings.utils');
const { getJSON } = require('./getJSON');

const JSON_PATH_EXPRESSION = '$..i18n';
const NAMESPACE_SEPARATOR = ':';
const PATTERN_REG_EXP = /{{namespace}}|{{locale}}/g;
const DEFAULT_LOCALE = 'en';

/**
 * getPathFromPattern - get the path from the current pattern
 *
 * @param  {string} pattern   is the template string of the path with {{namespace}} and {{local}}
 * @param  {string} namespace namespace to set
 * @param  {string} locale    local to set
 * @return {string}           path with replaced value
 */
function getPathFromPattern(pattern, namespace, locale) {
	if (!pattern.match(PATTERN_REG_EXP)) {
		throw new Error('No {{locale}} or {{namespace}} found');
	}

	const replaceMap = {
		'{{namespace}}': namespace,
		'{{locale}}': locale,
	};

	return path.join(
		process.cwd(),
		...pattern.replace(PATTERN_REG_EXP, match => replaceMap[match]).split('/'),
	);
}

function manageEmptyNamespace(i18n) {
	if (!i18n.key.split(NAMESPACE_SEPARATOR)[1]) {
		throw new Error(
			`The key '${i18n.key}' doesn't have namespace defined. if a key doesn't have a namespace defined, it will not be extracted.`,
		);
	}
}

/**
 * getLocalesFromNamespace - transform a JSON to a dictionary of key/value with a given namespace
 *
 * @param  {object} settings  JSON Object
 * @param  {string} namespace namespace to parse
 * @return {Map}              dictionary of key/value locales
 */
function getLocalesFromNamespace(settings, namespace) {
	return jsonpath.query(settings, JSON_PATH_EXPRESSION).reduce((locale, i18n) => {
		const extractKey = i18n.key.split(`${namespace}${NAMESPACE_SEPARATOR}`)[1];
		if (!extractKey) {
			manageEmptyNamespace(i18n);
			return locale;
		}
		return locale.set(extractKey, i18n.options.defaultValue);
	}, new Map());
}

/**
 * getNameSpacesByLocale - get all namespace by locale
 *
 * @param  {object} namespaces object of namespaces ({namespace:pattern to get the file})
 * @param  {string} locale    locale to get
 * @return {object}           return all locales by namespace
 */
function getNameSpacesByLocale(namespaces, locale) {
	return namespaces.reduce((state, namespace) => {
		const name = namespace.name;
		const filePath = namespace.sourcePath || namespace.path;
		return {
			...state,
			[namespace.name]: getJSON(getPathFromPattern(filePath, name, locale)),
		};
	}, {});
}

/**
 * setTranslate - replace in the given setting all i18n key by the this translated value
 *
 * @param  {type} i18next       i18next instance
 * @param  {type} object        settings to replace
 * @param  {type} jsonpaths     remove without the first index set by jsonpath ($)
 */
function setTranslate(i18next, object, [, ...jsonpaths]) {
	const i18n = get(object, jsonpaths.join('.'));
	jsonpaths.splice(-1); // replace the object by the new value
	let value = i18next.t(i18n.key, i18n.options);
	if (!value) {
		value = i18n.options.defaultValue;
	}
	if (!value) {
		console.error(`${i18n.key} has no value. You should add a defaultValue to it`);
	}
	set(object, jsonpaths.join('.'), value);
}

/**
 * parseSettings - parse settings and apply the locale on it
 *
 * @param  {object} i18next  i18n instance
 * @param  {type} settings   settings to translate
 * @param  {string} locale   locale to apply
 * @return {object}          translated settings
 */
function parseSettings(i18next, settings, locale) {
	const clonedSettings = cloneDeep(settings);
	i18next.changeLanguage(locale);
	jsonpath
		.paths(clonedSettings, JSON_PATH_EXPRESSION)
		.forEach(jsonpaths => setTranslate(i18next, clonedSettings, jsonpaths));

	return clonedSettings;
}

/**
 * saveSettings - description
 *
 /**
  * saveSettings - save the settings
  *
  * @param  {object} i18next  i18n instance
  * @param  {type}   settings   settings to translate
  * @param  {string} locale   locale to apply
  * @param  {string} destination destination to write the settings
 */
function saveSettings(i18next, settings, locale, destination) {
	const translatedSetting = parseSettings(i18next, settings, locale);

	mkdirp.sync(path.dirname(destination));
	const basename = `${path.basename(
		destination,
		path.extname(destination),
	)}.${locale}${path.extname(destination)}`;
	const filePath = path.join(path.dirname(destination), basename);
	const file = fs.createWriteStream(filePath);
	file.write(JSON.stringify(translatedSetting) + String.fromCharCode(10));
	file.end();
	getLogger()('Settings created:', `${filePath}  settings has been created`);
}

/**
 * getI18nextResources - get the resource object to i18next
 *
 * @param  {array} locales    array of locales to get
 * @param  {object} namespaces object of namespaces to get
 * @return {object}            return the resource object
 */
function getI18nextResources(locales, namespaces) {
	return locales.reduce(
		(resource, locale) => ({
			...resource,
			[locale]: getNameSpacesByLocale(namespaces, locale),
		}),
		{},
	);
}

/**
 * updateLocale - adding or removing unused keys/values
 * 								write the new locale
 *
 * @param  {Map} i18nKeys        key/value used in the projets
 * @param  {string} locale       current locale
 * @param  {string} namespace    current namespace
 * @param  {string} pattern      pattern to get the locale

 */
function updateLocale(i18nKeys, locale, namespace, pattern, sort) {
	const filePath = getPathFromPattern(pattern, namespace, locale);
	let savedLocale = {};
	if (fs.existsSync(filePath)) {
		// eslint-disable-next-line global-require
		savedLocale = getJSON(filePath);
	}

	// find the difference between the code & the dictionary. prior is the code
	// remove unused keys
	// add new keys
	const keys = [
		...intersection([...i18nKeys.keys()], Object.keys(savedLocale)),
		...difference([...i18nKeys.keys()], Object.keys(savedLocale)),
	];

	// set value that exist in the current locale or set defaultValue (only for en)
	const newLocale = keys.reduce(
		(refreshedLocale, key) => ({
			...refreshedLocale,
			[key]: savedLocale[key] || (locale === DEFAULT_LOCALE ? i18nKeys.get(key) : ''),
		}),
		{},
	);

	mkdirp.sync(path.dirname(filePath));
	fs.writeFileSync(
		filePath,
		JSON.stringify(sort ? sortObject(newLocale) : newLocale, null, '  ') + String.fromCharCode(10),
	);
}

/**
 * getLocalesFromNamespaceInFolder - search all locale used in a folder for a given namespace
 *
 * @param  {string} folder    folder to search
 * @param  {string} namespace namespace to get
 * @return {Map}              locale of key/value
 */
function getLocalesFromNamespaceInFolder(folder, namespace) {
	if (!fs.existsSync(folder)) {
		return new Map();
	}

	const files = fs.readdirSync(folder);

	return new Map(
		files
			// eslint-disable-next-line global-require
			.map(file => getLocalesFromNamespace(getJSON(path.join(folder, file)), namespace))
			.reduce((state, map) => [...state, ...map], []),
	);
}

/**
 * setI18Next - description
 *
 * @param  {array} languages  language to get
 * @param  {object} namespaces object of namespaces to get
 */
function getI18Next(languages, namespaces) {
	let i18next;
	try {
		// eslint-disable-next-line global-require
		i18next = require('i18next');
	} catch (e) {
		console.error('The package i18next have to be installed on your project to use i18n feature.');
		return false;
	}

	i18next.init({
		resources: getI18nextResources(languages, namespaces),
	});

	return i18next;
}

/**
 * updateLocales - update the locales for all languages used in the project
 *
 * @param  {Map} i18nKeys        key/value used in the projets
 * @param  {string} locale       current locale
 * @param  {string} namespace    current namespace
 * @param  {string} pattern      pattern to get the locale

 */
function updateLocales(i18nKeys, locales, namespace, pattern, sort) {
	locales.forEach(locale => {
		updateLocale(i18nKeys, locale, namespace, pattern, sort);
	});
}

/**
 * parseI18n - parse a folder to extract key/values for all given namespace and languages
 *
 * @param  {Array<Namespace>} namespaces Array of Namespace to extract (name, path)
 * @param  {array<string>} languages              Locales to extract
 * @param  {string} froms                         Folders to parse
 */
function parseI18n(namespaces, languages, froms, sort) {
	const foldersToParse = [].concat(froms);

	namespaces.forEach(namespace => {
		let i18nKeys = new Map();
		const name = namespace.name;
		const extractPath = namespace.extractPath || namespace.path;

		foldersToParse.forEach(from => {
			i18nKeys = new Map([
				...i18nKeys,
				...getLocalesFromNamespaceInFolder(path.join(process.cwd(), ...from.split('/')), name),
			]);
		});

		updateLocales(i18nKeys, languages, name, extractPath, sort);
	});
}

module.exports = {
	getI18Next,
	getI18nextResources,
	getLocalesFromNamespace,
	getLocalesFromNamespaceInFolder,
	getNameSpacesByLocale,
	getPathFromPattern,
	parseI18n,
	parseSettings,
	saveSettings,
	setTranslate,
	updateLocales,
	updateLocale,
};
