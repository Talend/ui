module.exports = {
	stories: ['../src/**/*.stories.@(js)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-toolbars',
		// {
		// 	name: '@storybook/preset-scss',
		// 	options: {
		// 		sassLoaderOptions: {
		// 			prependData: SASS_DATA,
		// 		},
		// 		cssLoaderOptions: {
		// 			modules: {
		// 				localIdentName: '[name]--[local]',
		// 			},
		// 		},
		// 	},
		// },
	],
};
