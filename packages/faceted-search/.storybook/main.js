const SASS_DATA = "@use '~@talend/bootstrap-theme/src/theme/guidelines' as *;";

module.exports = {
	features: {
		buildStoriesJson: true,
		previewCsfV3: true,
	},
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../stories/**/*.stories.js',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		{
			name: '@storybook/preset-scss',
			options: {
				sassLoaderOptions: {
					prependData: SASS_DATA,
				},
				cssLoaderOptions: {
					modules: {
						localIdentName: '[name]--[local]',
					},
				},
			},
		},
	],
};
