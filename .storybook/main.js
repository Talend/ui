const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
	stories: [
		'../src/Welcome.stories.mdx',
		'../src/GettingStarted.stories.mdx',
		'../src/Status.stories.mdx',
		'../src/Catalog.stories.mdx',
		'../src/tokens/docs/*.stories.mdx',
		'../src/content/docs/*.stories.mdx',
		'../src/themes/docs/Light.stories.mdx',
		'../src/themes/docs/*.stories.mdx',
		'../src/components/**/*.stories.mdx',
		'../src/components/**/*.stories.js',
		'../src/templates/**/*.stories.mdx',
		'../src/templates/**/*.stories.js',
		'../src/pages/**/*.stories.mdx',
		'../src/pages/**/*.stories.js',
	],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		'storybook-addon-pseudo-states',
		'storybook-addon-mdx-embed',
	],
	webpackFinal: async config => {
		config.entry.unshift('core-js');
		config.plugins.push(new BrowserSyncPlugin({
			host: 'localhost',
			port: 3002,
			proxy: 'http://localhost:6006/'
		}));
		return config;
	},
};
