import path from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const rootPath = require.resolve('@talend/ui-storybook').replace('src/index.ts', '');

const STORIES = [
	`${rootPath}src/Welcome.mdx`,
	`${rootPath}src/GettingStarted.mdx`,
	`${rootPath}src/DesignSystem.mdx`,
	`${rootPath}src/Status.mdx`,
	`${rootPath}src/Catalog.mdx`,
	`${rootPath}src/tokens/**/*.mdx`,
	`${rootPath}src/content/docs/VoiceAndTone.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Internationalization.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Conventions.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Capitalization.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Wording.stories.@(js|tsx|mdx)`,
	`${rootPath}src/design-system/**/*.@(stories.js|stories.tsx|mdx)`,
	// `${rootPath}../components/**/*.stories.@(js|tsx|mdx)`,
	// `${rootPath}../forms/**/*.stories.@(js|tsx|mdx)`,
	// `${rootPath}../dataviz/**/*.stories.@(js|tsx|mdx)`,
	// `${rootPath}../icons/**/*.stories.@(js|tsx|mdx)`,
];

const config = {
	framework: {
		name: '@storybook/react-webpack5',
		options: {
			builder: {
				lazyCompilation: true,
				fsCache: true,
			},
		},
	},
	stories: STORIES,
	staticDirs: [`${rootPath}static`],
	typescript: {
		reactDocgen: false,
		check: true,
	},
	webpackFinal: async config => {
		config.plugins.push(
			new BrowserSyncPlugin(
				{
					host: 'localhost',
					port: 3002,
					proxy: 'http://localhost:6006/',
					notify: false,
					codeSync: false,
				},
				{
					// prevent BrowserSync from reloading the page
					// and let Webpack Dev Server take care of this
					reload: false,
				},
			),
		);

		const existingAlias = config.resolve.alias || {};
		config.resolve.alias = {
			...existingAlias,
			'~docs': path.resolve(__dirname, './docs'),
			'~blocks': path.resolve(__dirname, './blocks'),
		};

		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			stream: false,
			constants: false,
			path: false,
		};

		return config;
	},
};

export default config;
