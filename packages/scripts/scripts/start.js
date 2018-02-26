#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');
const execSync = require('child_process').execSync;
const yargsParser = require('yargs-parser');
const { getAbsolutePath, resolveBin } = require('./utils');

const crossEnv = resolveBin('cross-env');
const webpackDevServer = resolveBin('webpack-dev-server');
const here = p => path.join(__dirname, p);
const hereRelative = p => here(p).replace(process.cwd(), '.');

const args = process.argv.slice(2);
const parsedArgs = yargsParser(args);
const env = Object.create( process.env );

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

console.log('\nCONFIGURATION ------------------------------------------------------------------------------------');

// USER : Pass extra config to merge with common config.
// talend-scripts-start --config ./webpack.config.js
const appConfigPath = parsedArgs['config'];
if (appConfigPath) {
	const appConfigResolvedPath = getAbsolutePath(appConfigPath);
	console.log(`App extra webpack config : ${appConfigResolvedPath}`);
	env.TALEND_APP_CONFIG = appConfigResolvedPath;
}

// USER : Pass api url to proxy /api routes
// talend-scripts-start --api-url http://localhost:8080
const apiUrl = parsedArgs['api-url'];
if (apiUrl) {
	console.log(`Proxy /api to : ${apiUrl}`);
	env.TALEND_API_URL = apiUrl;
}

// INTERNAL : Set the mode to get devServer config
env.TALEND_MODE = 'development';

console.log('\nRUN ----------------------------------------------------------------------------------------------');

// Run webpack dev server
const result = spawn.sync(
	webpackDevServer,
	[
		'--inline',
		'--mode', 'development',
		'--config', hereRelative('../config/webpack.config.merge.js'),
		'--content-base', 'build/',
	],
	{ stdio: 'inherit', env: env });

process.exit(result.status);

