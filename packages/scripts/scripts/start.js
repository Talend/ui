#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');
const { getAbsolutePath, resolveBin } = require('./utils');

const crossEnv = resolveBin('cross-env');
const webpackDevServer = resolveBin('webpack-dev-server');
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

// USER : Pass api url to proxy /api routes
// talend-scripts-start --api-url http://localhost:8080
const apiUrl = parsedArgs['api-url'];
if (apiUrl) {
	commands.push(`${crossEnv} TALEND_API_URL=${apiUrl}`);
}

// INTERNAL : Set the mode to get devServer config
commands.push(`${crossEnv} TALEND_MODE=development`);

// INTERNAL : run webpack dev server
commands.push(`${webpackDevServer} --inline --mode development --config ${hereRelative('../config/webpack.config.merge.js')} --content-base build/`);

console.log(
	'##################################################################################################',
	'#####################                       TALEND SCRIPTS                   #####################',
	'##################################################################################################',
);
console.log(commands.join(' '));
const result = spawn.sync(commands.join(' '), [], { stdio: 'inherit' });
console.log(JSON.stringify(result))
process.exit(result.status);
