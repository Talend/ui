import path from 'path';
import { packageDirectorySync } from 'pkg-dir';

const iconConfig = require('@talend/icons/.storybook/main.js');
const rootPath = packageDirectorySync();
const {
	getJSAndTSLoader,
} = require('@talend/scripts-config-react-webpack/config/webpack.config.common');

console.log('rootPath', rootPath);

const monoRepoFixSourceMap = ['./src', '../design-system/src'];
const srcDirectories = monoRepoFixSourceMap.map(src => path.resolve(process.cwd(), src));

const STORIES = [
	`${rootPath}/src/Welcome.mdx`,
	`${rootPath}/src/GettingStarted.mdx`,
	`${rootPath}/src/Principles.mdx`,
	`${rootPath}/src/Statuses.mdx`,
	// `${rootPath}/src/Catalog.mdx`,
	`${rootPath}/src/content/VoiceAndTone.@(js|tsx|mdx)`,
	`${rootPath}/src/content/Internationalization.@(js|tsx|mdx)`,
	`${rootPath}/src/content/Conventions.@(js|tsx|mdx)`,
	`${rootPath}/src/content/Capitalization.@(js|tsx|mdx)`,
	`${rootPath}/src/content/Wording.@(js|tsx|mdx)`,
	`${rootPath}/src/tokens/**/*.mdx`,
	`${rootPath}/../design-system/src/stories/**/*.@(stories.tsx|mdx)`,
	// `${rootPath}/src/components/**/*.@(stories.tsx|mdx)`,
];

export default {
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
