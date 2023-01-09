/* eslint-disable import/extensions */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
import { merge } from 'webpack-merge';
import { getAbsolutePath } from '../utils/path-resolver.js';
import { getPresetApi } from '../utils/preset.js';

function getPluginInfo(a) {
	return {
		name: a.constructor.name,
		simpleattr: Object.keys(a)
			.filter(key => ['string', 'boolean'].includes(typeof a[key]))
			.filter(key => !Array.isArray(a[key]))
			.map(key => [key, a[key]]),
	};
}

export default async (env = {}) => {
	const presetApi = getPresetApi();

	let webpackConfigurations = [];
	// eslint-disable-next-line import/no-extraneous-dependencies
	const defaultConfig = await import('@talend/scripts-config-react-webpack');
	webpackConfigurations = webpackConfigurations.concat(
		defaultConfig.default(presetApi, { umd: env.umd }),
	);

	// User configuration file
	const userConfigPath = presetApi.getUserConfig(['webpack', 'config', presetApi.mode]);
	if (userConfigPath) {
		const userConfigAbsolutePath = getAbsolutePath(userConfigPath);
		console.log(
			`Merge ${presetApi.mode} webpack config with custom one (${userConfigAbsolutePath})`,
		);
		const config = await import(userConfigAbsolutePath);
		webpackConfigurations.push(config.default);
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
	const config = merge(...webpackConfigurations);

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
