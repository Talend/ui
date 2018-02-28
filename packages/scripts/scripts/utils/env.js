/* eslint-disable global-require */

const fs = require('fs');
const get = require('lodash.get');
const path = require('path');

/**
 * Get a new env object containing current env variables
 * and the serialized talend-scripts.json configuration
 * @returns {process.env} The env object
 */
function getEnv() {
	const env = Object.create(process.env);

	const userConfigFilePath = path.join(process.cwd(), 'talend-scripts.json');
	if (fs.existsSync(userConfigFilePath)) {
		env.TALEND_SCRIPTS_CONFIG = JSON.stringify(require(userConfigFilePath));
	}

	return env;
}

/**
 * Deserialize the talend-scripts.json configuration from env object
 * @returns {*} The user configuration
 */
function getTalendScriptsConfig() {
	if (typeof process.env.TALEND_SCRIPTS_CONFIG === 'string') {
		return JSON.parse(process.env.TALEND_SCRIPTS_CONFIG);
	}
	return process.env.TALEND_SCRIPTS_CONFIG;
}

/**
 * Create a user configuration getter
 * @returns {getUserConfig} The user configuration getter
 */
function createUserConfigGetter() {
	const talendScriptsConfig = getTalendScriptsConfig();
	return function getUserConfig(configObjectPath, defaultValue) {
		return get(
			talendScriptsConfig,
			configObjectPath,
			defaultValue
		);
	};
}

module.exports = {
	createUserConfigGetter,
	getEnv,
};
