const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";

module.exports = {
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-toolbars',
		{
			name: '@storybook/preset-scss',
			options: {
				sassLoaderOptions: {
					prependData: SASS_DATA,
				},
				cssLoaderOptions: {
					modules: {
						localIdentName: '[name]--[local]',
					}
				},
			},
		},
	],
};
