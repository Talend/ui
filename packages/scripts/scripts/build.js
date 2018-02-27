#!/usr/bin/env node
const spawn = require('cross-spawn');
const { getEnv, hereRelative, printSeparator, resolveBin } = require('./utils');

const rimraf = resolveBin('rimraf');
const webpack = resolveBin('webpack');

printSeparator('CONFIGURATION');

// USER : current env vars and talend scripts configuration in <project-folder>/talend-scripts.json
const env = getEnv();
if (env.TALEND_SCRIPTS_CONFIG) {
	console.log('Talend scripts configuration file found and loaded');
}

// INTERNAL : Set the mode to get devServer config
env.TALEND_MODE = 'production';

printSeparator('RUN');
// remove old builds folder
const rmResult = spawn.sync(
	rimraf,
	['./build', './dist'],
	{ stdio: 'inherit', env }
);
if (rmResult.status === 0) {
	console.log('Folders ./dist and ./build removed successfully');
}

// Run webpack dev server
const result = spawn.sync(
	webpack,
	['--config', hereRelative(__dirname, '../config/webpack.config.js')],
	{ stdio: 'inherit', env }
);

process.exit(result.status);
