
import path from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const rootPath = require.resolve('@talend/ui-storybook').replace('src/index.ts', '');

const STORIES = [
	`${rootPath}src/Welcome.stories.@(js|tsx|mdx)`,
	`${rootPath}src/GettingStarted.stories.@(js|tsx|mdx)`,
	`${rootPath}src/DesignSystem.stories.@(js|tsx|mdx)`,
	`${rootPath}src/Status.stories.@(js|tsx|mdx)`,
	`${rootPath}src/Catalog.stories.@(js|tsx|mdx)`,
	`${rootPath}src/tokens/**/*.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/VoiceAndTone.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Internationalization.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Conventions.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Capitalization.stories.@(js|tsx|mdx)`,
	`${rootPath}src/content/docs/Wording.stories.@(js|tsx|mdx)`,
	`${rootPath}src/design-system/**/*.stories.mdx`,
	`${rootPath}src/design-system/Accordion/*.stories.mdx`,
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
	// stories: STORIES,
	stories: [],
	staticDirs: [`${rootPath}static`],
	addons: ['storybook-addon-mdx-embed'],
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
		};
		return config;
	},
};

export default config;
