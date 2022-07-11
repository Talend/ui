const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const groupBy = require('./mdx/groupBy');

module.exports = {
	features: {
		buildStoriesJson: true,
		modernInlineRender: true,
		previewCsfV3: true,
		// storyStoreV7: true, // will break all work related to aggregated status in the next major version of Storybook
	},
	framework: '@storybook/react',
	stories: [
		'../src/Welcome.stories.@(js|tsx|mdx)',
		'../src/GettingStarted.stories.@(js|tsx|mdx)',
		'../src/DesignSystem.stories.@(js|tsx|mdx)',
		'../src/Status.stories.@(js|tsx|mdx)',
		'../src/Catalog.stories.@(js|tsx|mdx)',
		'../src/deprecatedTokens/docs/*.stories.@(js|tsx|mdx)',
		'../src/content/docs/VoiceAndTone.stories.@(js|tsx|mdx)',
		'../src/content/docs/Internationalization.stories.@(js|tsx|mdx)',
		'../src/content/docs/Conventions.stories.@(js|tsx|mdx)',
		'../src/content/docs/Capitalization.stories.@(js|tsx|mdx)',
		'../src/content/docs/Wording.stories.@(js|tsx|mdx)',
		'../src/themes/docs/Light.stories.@(js|tsx|mdx)',
		'../src/themes/docs/*.stories.@(js|tsx|mdx)',
		'../src/components/**/*.stories.mdx',
		'../src/templates/**/*.stories.@(js|tsx|mdx)',
		'../src/pages/**/*.stories.@(js|tsx|mdx)',
	],
	staticDirs: ['../static'],
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
		'storybook-addon-mdx-embed',
	],
	typescript: {
		reactDocgen: false,
		check: true,
	},
	core: {
		builder: 'webpack5',
		options: {
			lazyCompilation: true,
			fsCache: true,
		},
	},
	webpackFinal: async config => {
		config.plugins.push(
			new BrowserSyncPlugin({
				host: 'localhost',
				port: 3002,
				proxy: 'http://localhost:6006/',
				notify: false,
				codeSync: false,
			}),
		);
		config.module.rules.map(rule => {
			if (rule.use?.some(use => use.loader?.includes('@mdx-js'))) {
				return rule.use.map(use => {
					if (use.options?.remarkPlugins) {
						use.options.remarkPlugins.push(groupBy);
					}
					return use;
				});
			}
			return rule;
		});
		const existingAlias = config.resolve.alias || {};
		config.resolve.alias = {
			...existingAlias,
			'~docs': path.resolve(__dirname, './docs'),
		};
		return config;
	},
};
