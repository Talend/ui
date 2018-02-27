const mergeWith = require('lodash.mergeWith');
const { getAbsolutePath, getPreset, createUserConfigGetter } = require('../scripts/utils');
const getUserConfig = createUserConfigGetter();

const mode = process.env.TALEND_MODE || 'production';
const presetName = getUserConfig(['preset'], 'talend');
const preset = getPreset(presetName);

// Preset default configuration file
let webpackConfigurations = [];
webpackConfigurations = webpackConfigurations.concat(
	preset.getWebpackConfiguration({ mode, getUserConfig })
);

// User configuration file
const userConfigPath = getUserConfig(['webpack', 'config', mode]);
if (userConfigPath) {
	const userConfigAbsolutePath = getAbsolutePath(userConfigPath);
	console.log(`Merge ${mode} webpack config with custom one (${userConfigAbsolutePath})`);
	webpackConfigurations.push(require(userConfigAbsolutePath));
}

// Merge all configuration. User config can override preset ones,
module.exports = mergeWith({}, ...webpackConfigurations, function customizer(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
});
