const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
	features: {
		buildStoriesJson: true,
		modernInlineRender: true,
		previewCsfV3: true,
		// storyStoreV7: true, // will break all work related to aggregated status in the next major version of Storybook
	},
	framework: '@storybook/react',
	stories: [
		'../src/components/**/*.stories.mdx',
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
		check: true,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: prop => {
				if (prop.parent) {
					// filter inherited props
					return !prop.parent.fileName.includes('node_modules');
				}
				// filter inherited styled-components props
				return !['theme', 'as', 'forwardedAs', 'ref'].includes(prop.name);
			},
		},
	},
	webpackFinal: async config => {
		config.entry.unshift('core-js');
		const existingAlias = config.resolve.alias || {};
		config.resolve.alias = {
			...existingAlias,
		};
		return config;
	},
};
