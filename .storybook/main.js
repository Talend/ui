module.exports = {
	stories: [
		'../src/Welcome.stories.js',
		'../src/tokens/docs/Tokens.stories.mdx',
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.js',
	],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-knobs/register',
		'@storybook/addon-links',
		'@storybook/addon-contexts/register',
		'@storybook/addon-backgrounds/register',
	],
	presets: ['@storybook/addon-docs/preset', 'storybook-addon-deps/preset'],
};
