import path from 'path';
import { packageDirectorySync } from 'pkg-dir';

const iconConfig = require('@talend/icons/.storybook/main.js');
const rootPath = packageDirectorySync();
const {
	getJSAndTSLoader,
} = require('@talend/scripts-config-react-webpack/config/webpack.config.common');

const STORIES = [
	{
		titlePrefix: 'Design System',
		directory: `${rootPath}/../design-system/src`,
	},
	`${rootPath}/../components/**/*.stories.@(js|tsx)`,
	`${rootPath}/../forms/**/*.stories.@(js|tsx)`,
	`${rootPath}/../dataviz/src/**/*.stories.@(js|tsx)`,
	`${rootPath}/../icons/stories/**/*.stories.@(js|tsx)`,
	`${rootPath}/../faceted-search/stories/**/*.stories.@(js|tsx)`,
];

const monoRepoFixSourceMap = [
	'../design-system/src',
	'../components/src',
	'../forms/src',
	'../forms/stories',
	'../dataviz/src',
	'../icons/stories',
	'../faceted-search/stories',
	'../faceted-search/src',
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
