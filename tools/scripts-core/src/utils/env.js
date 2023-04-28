import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { get } = _;
/**
 * Get talend-scripts configuration
 * (either talend-scripts.js or talend-scripts.json in current working dir)
 */
function getScriptsConfig() {
	let configFilePath = path.join(process.cwd(), 'talend-scripts.config.js');

	if (fs.existsSync(configFilePath)) {
		// Load and return first config file found
		return require(configFilePath);
	}
	configFilePath = path.join(process.cwd(), 'talend-scripts.json');
	if (fs.existsSync(configFilePath)) {
		return JSON.parse(fs.readFileSync(configFilePath));
	}

	// No config file found
	return {};
}

/**
 * Get a new env object containing current env variables
 * and the serialized talend-scripts configuration
 * @returns {process.env} The env object
 */
export function getEnv() {
	const env = Object.create(process.env);

	const userConfig = getScriptsConfig();
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
export function createUserConfigGetter(env = process.env) {
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
export function getUserConfigFile(userPossibleConfigFiles) {
	return []
		.concat(userPossibleConfigFiles)
		.map(fileName => path.join(process.cwd(), fileName))
		.find(fs.existsSync);
}
