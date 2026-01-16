const path = require('path');
const { packageDirectorySync } = require('pkg-dir');
const { createMainConfig } = require('@talend/storybook-config');

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
	`${rootPath}/../components/src/**/*.stories.@(js|jsx|tsx)`,
	`${rootPath}/../forms/@(src|stories)/**/*.stories.@(js|jsx|tsx)`,
	`${rootPath}/../dataviz/src/**/*.stories.@(js|jsx|tsx)`,
	`${rootPath}/../icons/stories/**/*.stories.@(js|jsx|tsx)`,
	`${rootPath}/../faceted-search/stories/**/*.stories.@(js|jsx|tsx)`,
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

const config = createMainConfig({
	stories: STORIES,
	// webpackFinal: async (originalConfig, options) => {
	//     const config = await iconConfig.webpackFinal(originalConfig);
	//     // weird, replace the loader of the current storybook which do not support mono repo
	//     const rules = [
	//         ...(config.module?.rules || []).filter(rule => {
	//             if (rule && typeof rule === 'object' && 'test' in rule) {
	//                 return !rule.test?.toString().includes('tsx?');
	//             }
	//             return true;
	//         }),
	//         {
	//             test: /\.(js|jsx|ts|tsx)$/,
	//             exclude: /node_modules/,
	//             include: srcDirectories,
	//             use: getJSAndTSLoader({}, true),
	//         },
	//     ];
	//     if (config.module) {
	//         config.module.rules = rules;
	//     }
	//     return config;
	// },
});
module.exports = config;
