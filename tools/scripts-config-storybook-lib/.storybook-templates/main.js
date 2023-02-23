const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');
const CDNPlugin = require('@talend/dynamic-cdn-webpack-plugin');
const { getAllModules } = require('@talend/module-to-cdn');

const { fixWindowsPaths } = require('./utils');

const cwd = process.cwd();

function getFolderGlob(folderName) {
	return path.join(cwd, folderName, '**/*.stories.@(js|jsx|ts|tsx|mdx)');
}

function getStoriesFolders() {
	const storiesFolders = [getFolderGlob('src')];

	if (fs.existsSync(path.join(cwd, 'stories'))) {
		storiesFolders.push(getFolderGlob('stories'));
	}
	return storiesFolders;
}

const defaultMain = {
	features: {
		buildStoriesJson: true,
		previewCsfV3: true,
	},
	stories: getStoriesFolders(),
	staticDirs: [path.join(__dirname, 'msw')],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-interactions',
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: true,
				},
			},
		},
	],
	core: {
		builder: 'webpack5',
		disableTelemetry: true,
		enableCrashReports: false,
	},
	typescript: { reactDocgen: false },
	webpackFinal: async (config) => {
		// by default storybook do not support scss without css module
		// here we remove storybook scss config and replace it by our config
		const rules = [
			...config.module.rules.filter(rule => {
				return !rule.test?.toString().includes('s[ca]ss');
			}),
			{
				test: /\.html$/,
				use: [
					{ loader: 'cache-loader' },
					{ loader: 'ngtemplate-loader' },
					{ loader: 'html-loader', options: { esModule: false } },
				],
				exclude: path.resolve(process.cwd(), 'src', 'app', 'index.html'),
			},
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
			plugins: [
				...config.plugins,
				// use dynamic-cdn-webpack-plugin with default modules
				new CDNPlugin({
					exclude: Object.keys(getAllModules()).filter(name => name.match(/^(@talend\/|angular)/))
				}),
			],
			rules,
			resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
			},
		};

		return mergedConfig;
	},
};

const userMain = <%  if(userFilePath) { %> require(String.raw`<%= userFilePath %>`); <% } else { %> {}; <% } %>

module.exports = {
	...defaultMain,
	features: merge(defaultMain.features, userMain.features),
	stories: fixWindowsPaths([...(userMain.stories || defaultMain.stories)]),
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
