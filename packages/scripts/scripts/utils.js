/* eslint-disable global-require */

const fs = require('fs');
const get = require('lodash.get');
const path = require('path');
const which = require('which');

/**
 * Resolve the bin module executable path.
 * This is from kcd-scripts (https://github.com/kentcdodds/kcd-scripts/blob/master/src/utils.js#L21)
 * @param modName The bin module name
 * @param executable The executable name (in case the executable has a different name)
 * @param cwd The execution path
 * @returns {*} The executable path
 */
function resolveBin(modName, { executable = modName, cwd = process.cwd() } = {}) {
	let pathFromWhich;
	try {
		pathFromWhich = fs.realpathSync(which.sync(executable));
	} catch (_error) {
		// ignore _error
	}
	try {
		const modPkgPath = require.resolve(`${modName}/package.json`);
		const modPkgDir = path.dirname(modPkgPath);
		const { bin } = require(modPkgPath);
		const binPath = typeof bin === 'string' ? bin : bin[executable];
		const fullPathToBin = path.join(modPkgDir, binPath);
		if (fullPathToBin === pathFromWhich) {
			return executable;
		}
		return fullPathToBin.replace(cwd, '.');
	} catch (error) {
		if (pathFromWhich) {
			return executable;
		}
		throw error;
	}
}

/**
 * Get the absolute path for user provided path
 * @param userPath The path to resolve
 * @returns {*} The absolute path
 */
function getAbsolutePath(userPath) {
	if (userPath.startsWith('/')) {
		return userPath;
	}
	return `${process.cwd()}/${userPath}`;
}

/**
 * Resolve relative path from cwd
 * @param dirname The folder the path starts from
 * @param p The path
 * @returns {string} The relative path from cwd
 */
function hereRelative(dirname, p) {
	return path
		.join(dirname, p)
		.replace(process.cwd(), '.');
}

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

/**
 * Get the preset
 * @param presetName The preset name
 * @returns {*} The preset
 */
function getPreset(presetName) {
	if (presetName === 'talend') {
		return require('../preset/preset-talend');
	}
	return require(`talend-scripts-preset-${presetName}`);
}

/**
 * Print the awesome Talend/scripts logo in ASCII art
 */
function printLogo() {
	console.log('###################################################################################################################################################################\n' +
		' /  /#               /**                                                               @##                                                                  %# \n' +
		'      /              /**                                                             #####                                                                #### \n' +
		'/    #*@                 (                           %#                              #####                                                                #### \n' +
		'  /*      *%              *                       #####                              #####                                                                #### \n' +
		'              /*            *                     #####                              #####                                                                #### \n' +
		'                   *@        (&                   #####%%%%%%%      %########        #####           #######@        %%%%    #####@             %########### \n' +
		'                       *(      * ******/          ###########    ###############     #####        #############      #### ############&        ############### \n' +
		'                           (*  ***********        #####           ##       (#####    #####       #####     #####&    ########    ######      ######(      #### \n' +
		'      **&                     *************       #####                     (####    #####      ####        /####    #####         #####    #####         #### \n' +
		'     **************************************       #####                  &&&%####    #####     #####         #####   #####         #####   #####          #### \n' +
		'                              *************       #####           ###############    #####     ###################   #####         #####   #####          #### \n' +
		'                           *(  **********(        #####         ######       ####    #####     #####                 #####         #####   #####          #### \n' +
		'                      ***      (  *****           #####         ####(        ####    #####     #####                 #####         #####   #####          #### \n' +
		'                              *                   #####         ####%       ###    #####      #####&               #####         #####    #####        ### \n' +
		'                            #                      #####%&%##   ######%  %########   ########&   #######%& &%###&    #####         #####     ######%&&%####### \n' +
		'                           *                       (#########%   ########### #####    #########    ##############    #####         #####      ########### #####\n' +
		'                      ***&                                                                                                                                     \n' +
		'                    *     *                                                                                                                                    \n' +
		'                    *     *                                                                                                                                    \n' +
		'\n' +
		'           .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. \n' +
		'          | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |\n' +
		'          | |    _______   | || |     ______   | || |  _______     | || |     _____    | || |   ______     | || |  _________   | || |    _______   | |\n' +
		'          | |   /  ___  |  | || |   .\' ___  |  | || | |_   __ \\    | || |    |_   _|   | || |  |_   __ \\   | || | |  _   _  |  | || |   /  ___  |  | |\n' +
		'          | |  |  (__ \\_|  | || |  / .\'   \\_|  | || |   | |__) |   | || |      | |     | || |    | |__) |  | || | |_/ | | \\_|  | || |  |  (__ \\_|  | |\n' +
		'          | |   \'.___`-.   | || |  | |         | || |   |  __ /    | || |      | |     | || |    |  ___/   | || |     | |      | || |   \'.___`-.   | |\n' +
		'          | |  |`\\____) |  | || |  \\ `.___.\'\\  | || |  _| |  \\ \\_  | || |     _| |_    | || |   _| |_      | || |    _| |_     | || |  |`\\____) |  | |\n' +
		'          | |  |_______.\'  | || |   `._____.\'  | || | |____| |___| | || |    |_____|   | || |  |_____|     | || |   |_____|    | || |  |_______.\'  | |\n' +
		'          | |              | || |              | || |              | || |              | || |              | || |              | || |              | |\n' +
		'          | \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' |\n' +
		'           \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\' \n' +
		'###################################################################################################################################################################');
}

/**
 * Print a separator
 * @param title The title to print
 */
function printSeparator(title) {
	console.log(`\n${title} `.padEnd(100, '-'));
}

module.exports = {
	createUserConfigGetter,
	getAbsolutePath,
	getEnv,
	getPreset,
	hereRelative,
	printLogo,
	printSeparator,
	resolveBin,
};
