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
		'@storybook/addon-actions',
		'@storybook/addon-links',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
		'@storybook/addon-controls',
		'@storybook/addon-viewport/register',
		'@storybook/addon-contexts/register',
		'@storybook/addon-backgrounds/register',
	],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};
