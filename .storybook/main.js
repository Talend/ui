module.exports = {
	stories: [
		'../src/Welcome.stories.mdx',
		'../src/tokens/docs/Tokens.stories.mdx',
		'../src/themes/docs/Themes.stories.mdx',
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.js',
	],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-controls',
		'@storybook/addon-links',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
		'@storybook/addon-viewport/register',
		'@storybook/addon-contexts/register',
		'@storybook/addon-backgrounds/register',
	],
	typescript: {
		reactDocgen: 'react-docgen',
	},
};
