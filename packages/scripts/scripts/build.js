const path = require('path');
const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');
const { getAbsolutePath, resolveBin } = require('./utils');

const crossEnv = resolveBin('cross-env');
const webpack = resolveBin('webpack');
const here = p => path.join(__dirname, p);
const hereRelative = p => here(p).replace(process.cwd(), '.');

const args = process.argv.slice(2);
const parsedArgs = yargsParser(args);
const commands = [];

// USER : Pass extra config to merge with common config.
// talend-scripts-start --config ./webpack.config.js
const appConfigPath = parsedArgs['app-config'];
if (appConfigPath) {
	const appConfigAbsolutePath = getAbsolutePath(appConfigPath);
	commands.push(`${crossEnv} TALEND_APP_CONFIG=${appConfigAbsolutePath}`);
}

// INTERNAL : run webpack
commands.push(`${webpack} --mode production --config ${hereRelative('../config/webpack.config.js')}`);


const result = spawn.sync(commands.join(' '));
process.exit(result.status);
