// import path from 'path';
import { packageDirectorySync } from 'pkg-dir';

const rootPath = packageDirectorySync();

console.log('rootPath', rootPath);

// const monoRepoFixSourceMap = ['./src', '../design-system/src'];
// const srcDirectories = monoRepoFixSourceMap.map(src => path.resolve(process.cwd(), src));

const STORIES = [
	`${rootPath}/src/Welcome.mdx`,
	`${rootPath}/src/GettingStarted.mdx`,
	`${rootPath}/src/Principles.mdx`,
	`${rootPath}/src/Statuses.mdx`,
	// `${rootPath}/src/Catalog.mdx`,
	`${rootPath}/src/content/VoiceAndTone.@(js|jsx|tsx|mdx)`,
	`${rootPath}/src/content/Internationalization.@(js|jsx|tsx|mdx)`,
	`${rootPath}/src/content/Conventions.@(js|jsx|tsx|mdx)`,
	`${rootPath}/src/content/Capitalization.@(js|jsx|tsx|mdx)`,
	`${rootPath}/src/content/Wording.@(js|jsx|tsx|mdx)`,
	`${rootPath}/src/tokens/**/*.mdx`,
	`${rootPath}/../design-system/src/stories/**/*.@(stories.tsx|mdx)`,
	// `${rootPath}/src/components/**/*.@(stories.tsx|mdx)`,
];

export default {
	stories: STORIES,
	addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-vite',
		options: {
			builder: {
				viteConfigPath: './.storybook/vite.config.ts',
			},
		},
	},
	typescript: {
		reactDocgen: false,
		check: false,
	},
};
