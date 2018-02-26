const mergeWith = require('lodash.mergeWith');
const { getAbsolutePath, getUserConfig } = require('../scripts/utils');

// Default configuration file
const webpackConfigurations = [require('./webpack.config')];

// Dev configuration file
const mode = process.env.TALEND_MODE || 'production';
if (mode === 'development') {
	webpackConfigurations.push(require('./webpack.config.dev'));
}

// App configuration file
const userConfigPath = getUserConfig(['webpack', 'config', mode]);
if (userConfigPath) {
	const userConfigAbsolutePath = getAbsolutePath(userConfigPath);
	console.log(`Merge ${mode} webpack config with custom one (${userConfigAbsolutePath})`);
	webpackConfigurations.push(require(userConfigAbsolutePath));
}

module.exports = mergeWith({}, ...webpackConfigurations, function customizer(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
});
