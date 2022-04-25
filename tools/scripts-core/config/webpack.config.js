const merge = require('webpack-merge');
const { getAbsolutePath } = require('../utils/path-resolver');
const { getPreset, getPresetApi } = require('../utils/preset');

function getPluginInfo(a) {
	return {
		name: a.constructor.name,
		simpleattr: Object.keys(a)
			.filter(key => ['string', 'boolean'].includes(typeof a[key]))
			.filter(key => !Array.isArray(a[key]))
			.map(key => [key, a[key]]),
	};
}

module.exports = async (env = {}) => {
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
		webpackConfigurations.push(require(userConfigAbsolutePath));
	}

	webpackConfigurations = await Promise.all(
		webpackConfigurations.map(async conf => {
			if (typeof conf === 'function') {
				const asyncConf = await conf(env);
				return asyncConf;
			}
			return conf;
		}),
	);

	// Merge all configuration. User config can override preset ones,
	const config = merge.smart(webpackConfigurations);

	if (presetApi.getUserConfig(['webpack', 'debug'], false)) {
		const light = Object.keys(config)
			.filter(key => key !== 'plugins')
			.reduce((acc, key) => {
				acc[key] = config[key];
				return acc;
			}, {});
		console.log(JSON.stringify(light, null, 2));
		console.log('plugins:', JSON.stringify(config.plugins.map(getPluginInfo), null, 2));
	}

	return config;
};
