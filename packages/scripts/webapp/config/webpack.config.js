/* eslint-disable global-require,no-console */

const mergeWith = require('lodash.mergewith');
const { getAbsolutePath } = require('../utils/path-resolver');
const { getPreset, getPresetApi } = require('../utils/preset');

const presetApi = getPresetApi();
const presetName = presetApi.getUserConfig(['preset'], 'talend');
const preset = getPreset(presetName);

// Preset default configuration file
let webpackConfigurations = [];
webpackConfigurations = webpackConfigurations.concat(
	preset.getWebpackConfiguration(presetApi)
);

// User configuration file
const userConfigPath = presetApi.getUserConfig(['webpack', 'config', presetApi.mode]);
if (userConfigPath) {
	const userConfigAbsolutePath = getAbsolutePath(userConfigPath);
	console.log(`Merge ${presetApi.mode} webpack config with custom one (${userConfigAbsolutePath})`);
	webpackConfigurations.push(require(userConfigAbsolutePath));
}

// Merge all configuration. User config can override preset ones,
module.exports = mergeWith({}, ...webpackConfigurations, function customizer(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
});
