const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');
// const getTalendWebpackConfig = require('@talend/scripts-core/config/webpack.config');
const CDNPlugin = require('@talend/dynamic-cdn-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getAllModules } = require('@talend/module-to-cdn');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { DuplicatesPlugin } = require('inspectpack/plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

// const excludedPlugins = [
// 	CDNPlugin, // will be overridden without @talend modules
// 	DuplicatesPlugin, BundleAnalyzerPlugin, // slow
// 	MiniCssExtractPlugin, // blocker for optimization
// 	HtmlWebpackPlugin, // use SB index.html, not app's
// ]


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
		process.env.TALEND_SCRIPTS_CONFIG = JSON.stringify(require(path.join(cwd, 'talend-scripts.json')));
		process.env.TALEND_MODE = 'development';
		// const talendWebpackConfig = await getTalendWebpackConfig();

		// const presetHasStyleRules = talendWebpackConfig.module.rules.some(rule => rule.test.toString().match(/scss|css/))
		// const presetHasSVGRules = talendWebpackConfig.module.rules.some(rule => rule.test.toString().match(/svg/))

		const mergedConfig = {
			...config,
			// module: {
			// 	...config.module,
			// 	rules: [
			// 		// there are rules on svg and sass/css that overlap with the talend/scripts preset config.
			// 		// remove those in SB config
			// 		...config.module.rules
			// 		// remove all sass/scss/css rules if handled by preset webpack rules
			// 		.filter(rule => !presetHasStyleRules || !rule.test.toString().match(/\.(s\[ca\]ss|scss|css)/))
			// 		// remove svg rule if handled by preset webpack rules
			// 		.map(rule => {
			// 			if (presetHasSVGRules && rule.test && rule.test.toString().match(/svg/)) {
			// 				return {
			// 					...rule,
			// 					// remove extra slashes surrounding the regex.toString() /regex/, then remove the "svg" from test
			// 					test: new RegExp(rule.test.toString().slice(1, -1).replace('svg|', '')),
			// 				};
			// 			}
			// 			return rule;
			// 		}),
			// 		// ...talendWebpackConfig.module.rules,
			// 	],
			// },
			plugins: [
				...config.plugins,
				// ...talendWebpackConfig.plugins
					// .filter(plugin => !excludedPlugins.some(excludedPlugin => plugin instanceof excludedPlugin)),
				// use dynamic-cdn-webpack-plugin with default modules
				new CDNPlugin({
					exclude: Object.keys(getAllModules()).filter(name => name.match(/^(@talend\/|angular)/))
				}),
				// new MiniCssExtractPlugin({
				// 	filename: `[name].css`,
				// 	chunkFilename: `[name].css`,
				// }),
			],
			// resolve: {
			// 	extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
			// },
		};

		return mergedConfig;
	},
};

const userMain = <%  if(userFilePath) { %> require(String.raw`<%= userFilePath %>`); <% } else { %> {}; <% } %>

// Temporary fix until Storybook handles well Windows path
// Waiting for a release https://github.com/storybookjs/storybook/pull/17641
function fixWindowsPath(paths){
	return process.platform === 'win32'
		? paths.map(p => p.replace(/\\/g, '/'))
		: paths;
}

module.exports = {
	...defaultMain,
	features: merge(defaultMain.features, userMain.features),
	stories: fixWindowsPath([...defaultMain.stories, ...(userMain.stories || [])]),
	addons: [...defaultMain.addons, ...(userMain.addons || [])],
	core: merge(defaultMain.core, userMain.core),
	staticDirs: fixWindowsPath([...(defaultMain.staticDirs|| []), ...(userMain.staticDirs || [])]),
	webpackFinal: async (config) => {
		let finalConfig = await defaultMain.webpackFinal(config);
		if(userMain.webpackFinal) {
			finalConfig = await userMain.webpackFinal(finalConfig);
		}
		return finalConfig
	}
};
