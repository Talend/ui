const fs = require('fs');
const get = require('lodash.get');
const path = require('path');

/**
 * Get talend-scripts configuration
 * (either talend-scripts.js or talend-scripts.json in current working dir)
 */
function getScriptsConfig(options = []) {
	const optionConfigFile = options.find(opt => opt.startsWith('--config='));
	let configFilePath;

	if (optionConfigFile) {
		configFilePath = path.join(process.cwd(), optionConfigFile.split('=')[1]);
		if (!fs.existsSync(configFilePath)) {
			console.error(`Config file ${configFilePath} not found.`);
			process.exit(1);
		}
	} else {
		configFilePath = [
			path.join(process.cwd(), 'talend-scripts.config.js'),
			path.join(process.cwd(), 'talend-scripts.json'),
		].find(file => fs.existsSync(file));
	}

	if (configFilePath) {
		// Load and return first config file found
		return require(configFilePath);
	}

	// No config file found
	return null;
}

/**
 * Get a new env object containing current env variables
 * and the serialized talend-scripts configuration
 * @returns {process.env} The env object
 */
function getEnv(options) {
	const env = Object.create(process.env);

	const userConfig = getScriptsConfig(options);
	if (userConfig) {
		env.TALEND_SCRIPTS_CONFIG = JSON.stringify(userConfig);
	}

	return env;
}

/**
 * Deserialize the talend-scripts configuration from env object
 * @returns {*} The user configuration
 */
function getTalendScriptsConfig({ TALEND_SCRIPTS_CONFIG }) {
	if (typeof TALEND_SCRIPTS_CONFIG === 'string') {
		return JSON.parse(TALEND_SCRIPTS_CONFIG);
	}
	return TALEND_SCRIPTS_CONFIG;
}

/**
 * Create a user configuration getter
 * @returns {getUserConfig} The user configuration getter
 */
function createUserConfigGetter(env = process.env) {
	const talendScriptsConfig = getTalendScriptsConfig(env);
	return function getUserConfig(configObjectPath, defaultValue) {
		return get(talendScriptsConfig, configObjectPath, defaultValue);
	};
}

/**
 * Get the user config file, based on a list of possible file names
 * @param userPossibleConfigFiles	The possible file names
 * @returns {string | undefined}	The existing user config file
 */
function getUserConfigFile(userPossibleConfigFiles) {
	return []
		.concat(userPossibleConfigFiles)
		.map(fileName => path.join(process.cwd(), fileName))
		.find(fs.existsSync);
}

module.exports = {
	createUserConfigGetter,
	getEnv,
	getUserConfigFile,
};
