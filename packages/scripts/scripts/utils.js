const fs = require('fs');
const get = require('lodash.get');
const path = require('path');
const which = require('which');

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

function getAbsolutePath(userPath) {
	if (userPath.startsWith('/')) {
		return userPath;
	}
	return `${process.cwd()}/${userPath}`;
}

function hereRelative(dirname, p) {
	return path
		.join(dirname, p)
		.replace(process.cwd(), '.');
}

function getEnv() {
	const env = Object.create(process.env);

	const userConfigFilePath = path.join(process.cwd(), 'talend-scripts.json');
	if (fs.existsSync(userConfigFilePath)) {
		env.TALEND_SCRIPTS_CONFIG = JSON.stringify(require(userConfigFilePath));
	}

	return env;
}

function getTalendScriptsConfig() {
	if (typeof process.env.TALEND_SCRIPTS_CONFIG === 'string') {
		return JSON.parse(process.env.TALEND_SCRIPTS_CONFIG);
	}
	return process.env.TALEND_SCRIPTS_CONFIG;
}

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

function getPreset(presetName) {
	if (presetName === 'talend') {
		return require('../preset/preset-talend');
	}
	return require(`talend-scripts-preset-${presetName}`);
}

function printLogo() {
	console.log('##########################################################################################################################################################################################################\n' +
		' */  */                   &**/                                                                               %#                                                                                  # \n' +
		'/      *                  ****                                                                            #####                                                                               ###### \n' +
		'       #                      (                                                                           #####                                                                               ###### \n' +
		'/(    /( *(                    /&                              ###                                      #####                                                                               ###### \n' +
		'             **                  *                            (#####                                      #####                                                                               ###### \n' +
		'                  *(               (                          (#####                                      #####                                                                               ###### \n' +
		'                      */            *                         (#####                   &%##%%&            #####                %%#%%                         &%%%%                     &%%%%%##### \n' +
		'                          **          *    &((&               (#############     %################        #####            #############&        #####   ############%            %################# \n' +
		'                              (*(      (**********(           (############      ###################      #####          #################       ######################         #################### \n' +
		'                                   */ **************          (#####              #/          #######     #####        #####       ######&     #########       #######      ########        ###### \n' +
		'       /**(                          ****************         (#####                           ######     #####        #####          ######     ######           ######     #######          ###### \n' +
		'      ***********************************************         (#####                           ######     #####       ######           ######    ######           ######    #######           ###### \n' +
		'       ****                          ****************         (#####               %#################     #####       #######################    ######           ######    ######            ###### \n' +
		'                                    #***************(         (#####             ####################     #####       #######################    ######           ######    ######            ###### \n' +
		'                             (  %*(    ************           (#####           #######         ######     #####       ######                     ######           ######    ######            ###### \n' +
		'                           (***(       *  /*****              (#####           ######          ######     #####       ######                     ######           ######    ######            ###### \n' +
		'                             (       #/                       (#####&          ######          ######     #####        ######&                   ######           ######     ######           ###### \n' +
		'                                    *                          ######     @    #######       ########     ######        #######&         ##      ######           ######     /#######       ######## \n' +
		'                                   (                           #############    #####################     ##########     ###################     ######           ######       #####################&\n' +
		'                                 *                              #############     ###########(  #####%     ###########      ###############      ######           ######         ############  ######\n' +
		'                           ****(/                                                                                                                                                                    \n' +
		'                         *      /                                                                                                                                                                    \n' +
		'                         *       *                                                                                                                                                                   \n' +
		'                         ((     *                                                                                                                                                                    \n' +
		'\n' +
		'                          .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. \n' +
		'                         | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |\n' +
		'                         | |    _______   | || |     ______   | || |  _______     | || |     _____    | || |   ______     | || |  _________   | || |    _______   | |\n' +
		'                         | |   /  ___  |  | || |   .\' ___  |  | || | |_   __ \\    | || |    |_   _|   | || |  |_   __ \\   | || | |  _   _  |  | || |   /  ___  |  | |\n' +
		'                         | |  |  (__ \\_|  | || |  / .\'   \\_|  | || |   | |__) |   | || |      | |     | || |    | |__) |  | || | |_/ | | \\_|  | || |  |  (__ \\_|  | |\n' +
		'                         | |   \'.___`-.   | || |  | |         | || |   |  __ /    | || |      | |     | || |    |  ___/   | || |     | |      | || |   \'.___`-.   | |\n' +
		'                         | |  |`\\____) |  | || |  \\ `.___.\'\\  | || |  _| |  \\ \\_  | || |     _| |_    | || |   _| |_      | || |    _| |_     | || |  |`\\____) |  | |\n' +
		'                         | |  |_______.\'  | || |   `._____.\'  | || | |____| |___| | || |    |_____|   | || |  |_____|     | || |   |_____|    | || |  |_______.\'  | |\n' +
		'                         | |              | || |              | || |              | || |              | || |              | || |              | || |              | |\n' +
		'                         | \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' |\n' +
		'                          \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\' \n' +
		'##########################################################################################################################################################################################################');
}

module.exports = {
	createUserConfigGetter,
	getAbsolutePath,
	getEnv,
	getPreset,
	hereRelative,
	printLogo,
	resolveBin,
};
