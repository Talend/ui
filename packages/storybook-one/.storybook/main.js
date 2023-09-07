import path from 'path';
const iconConfig = require('@talend/icons/.storybook/main.js');
const rootPath = require.resolve('@talend/ui-storybook-one').replace('src/index.ts', '');
const {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getSassData,
	getAssetsRules,
	getFileNameForExtension,
} = require('@talend/scripts-config-react-webpack/config/webpack.config.common');

const STORIES = [
	// `${rootPath}../design-system/src/**/*.stories.@(js|tsx)`,
	`${rootPath}../components/**/*.stories.@(js|tsx)`,
	// `${rootPath}../forms/**/*.stories.@(js|tsx)`,
	`${rootPath}../dataviz/src/**/*.stories.@(js|tsx)`,
	`${rootPath}../icons/stories/**/*.stories.@(js|tsx)`,
];

const monoRepoFixSourceMap = [
	'../design-system/src',
	'../components/src',
	'../dataviz/src',
	'../forms/src',
	'../icons/stories',
];
const srcDirectories = monoRepoFixSourceMap.map(src => path.resolve(process.cwd(), src));

const config = {
	stories: STORIES,
	webpackFinal: async originalConfig => {
		const config = await iconConfig.webpackFinal(originalConfig);
		// weird, replace the loader of the current storybook which do not support mono repo
		const rules = [
			...config.module.rules.filter(rule => {
				return !rule.test?.toString().includes('tsx?');
			}),
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				include: srcDirectories,
				use: getJSAndTSLoader({}, true),
			},
		];
		config.module.rules = rules;
		return config;
	},
};

export default config;
