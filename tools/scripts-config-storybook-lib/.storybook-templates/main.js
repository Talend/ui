const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');
const CDNPlugin = require('@talend/dynamic-cdn-webpack-plugin');
const { getAllModules } = require('@talend/module-to-cdn');
const {
	getSassLoaders,
} = require('@talend/scripts-config-react-webpack/config/webpack.config.common');

const { fixWindowsPaths } = require('./utils');
const { createRequire } = require('module');

const cwd = process.cwd();

function getFolderGlob(folderName) {
	return path.join(cwd, folderName, '**/*.@(stories.js|stories.jsx|stories.tsx|mdx)');
}

function getStoriesFolders() {
	const storiesFolders = [getFolderGlob('src')];
	if (fs.existsSync(path.join(cwd, 'stories'))) {
		storiesFolders.push(getFolderGlob('stories'));
	}
	return storiesFolders;
}

const defaultMain = {
	framework: {
		name: '@storybook/react-webpack5',
		options: {
			builder: {
				disableTelemetry: true,
				enableCrashReports: false,
			},
		},
	},
	features: {
		buildStoriesJson: true,
	},
	stories: getStoriesFolders(),
	staticDirs: [path.join(__dirname, 'msw')],
	addons: [
		'@storybook/addon-storysource',
		'@storybook/addon-a11y',
		'@storybook/addon-controls',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-interactions',
	],
	webpackFinal: async (config) => {
		// by default storybook do not support scss without css module
		// here we remove storybook scss config and replace it by our config
		const rules = [
			...config.module.rules.filter(rule => {
				return !rule.test?.toString().includes('s[ca]ss');
			}),
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: getSassLoaders(false, '', true),
			},
			{
				test: /\.module\.scss$/,
				use: getSassLoaders(true, '', true),
			},
		];
		const mergedConfig = {
			...config,
			module: {
				...config.module,
				rules,
			},
			plugins: [
				...config.plugins,
			],
			resolve: {
				...config.resolve,
				extensions: config.resolve.extensions.concat(['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss']),
				fallback: {
					...config.resolve.fallback,
					path: false,
				},
			},
		};

		return mergedConfig;
	},
};

const temp_userMain = <%  if(userFilePath) { %> require(String.raw`<%= userFilePath %>`); <% } else { %> {}; <% } %>

const userMain = temp_userMain.default || {};

let stories = fixWindowsPaths([...(userMain.stories || defaultMain.stories)]);

module.exports  = {
	...defaultMain,
	features: merge(defaultMain.features, userMain.features),
	stories,
	addons: [...defaultMain.addons, ...(userMain.addons || [])],
	core: merge(defaultMain.core, userMain.core),
	staticDirs: fixWindowsPaths([...(defaultMain.staticDirs|| []), ...(userMain.staticDirs || [])]),
	webpackFinal: async (config) => {
		let finalConfig = await defaultMain.webpackFinal(config);
		if(userMain.webpackFinal) {
			finalConfig = await userMain.webpackFinal(finalConfig);
		}
		return finalConfig
	}
};

