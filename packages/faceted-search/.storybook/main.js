module.exports = {
	features: {
		buildStoriesJson: true,
		modernInlineRender: true,
		previewCsfV3: true,
	},
	stories: [
		'../src/**/*.stories.mdx',
		'../stories/**/*.js',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
