#!/usr/bin/env node
const spawn = require('cross-spawn');
const { getEnv } = require('./utils/env');
const { hereRelative, resolveBin } = require('./utils/path-resolver');
const { printSeparator } = require('./utils/log');

const webpackDevServer = resolveBin('webpack-dev-server');
printSeparator('CONFIGURATION');

// USER : current env vars and talend scripts configuration in <project-folder>/talend-scripts.json
const env = getEnv();
if (env.TALEND_SCRIPTS_CONFIG) {
	console.log('Talend scripts configuration file found and loaded');
}

// INTERNAL : Set the mode to get devServer config
env.TALEND_MODE = 'development';

// Run webpack dev server
printSeparator('RUN');
const result = spawn.sync(
	webpackDevServer,
	[
		'--inline',
		'--config', hereRelative(__dirname, '../config/webpack.config.js'),
		'--content-base', 'build/',
	],
	{ stdio: 'inherit', env });

process.exit(result.status);
