module.exports = {
	stories: [
		'../src/Welcome.stories.mdx',
		'../src/tokens/docs/*.stories.mdx',
		'../src/themes/docs/Light.stories.mdx',
		'../src/themes/docs/*.stories.mdx',
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.js',
	],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
		'@storybook/addon-links',
		'@storybook/addon-contexts/register',
	],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};
