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
	],
};
