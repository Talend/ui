/* eslint-disable global-require,no-console */

const mergeWith = require('lodash.mergewith');
const { getAbsolutePath } = require('../utils/path-resolver');
const { getPreset, getPresetApi } = require('../utils/preset');

module.exports = env => {
	const presetApi = getPresetApi();
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);

	// Preset default configuration file
	let webpackConfigurations = [];
	webpackConfigurations = webpackConfigurations.concat(preset.getWebpackConfiguration(presetApi));

	// User configuration file
	const userConfigPath = presetApi.getUserConfig(['webpack', 'config', presetApi.mode]);
	if (userConfigPath) {
		const userConfigAbsolutePath = getAbsolutePath(userConfigPath);
		console.log(
			`Merge ${presetApi.mode} webpack config with custom one (${userConfigAbsolutePath})`,
		);
		let userConfig = require(userConfigAbsolutePath);
		if (typeof userConfig === 'function') {
			userConfig = userConfig(env);
		}
		webpackConfigurations.push(userConfig);
	}
	if (env && env.analyze) {
		webpackConfigurations.push(require('./webpack.analyzer'));
	}

	// Merge all configuration. User config can override preset ones,
	const config = mergeWith({}, ...webpackConfigurations, (objValue, srcValue) => {
		if (Array.isArray(objValue)) {
			return objValue.concat(srcValue);
		}
	});

	if (presetApi.getUserConfig(['webpack', 'debug'], false)) {
		console.log(JSON.stringify(config, null, 2));
	}

	return config;
};
