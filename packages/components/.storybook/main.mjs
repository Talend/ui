const config = {
	stories: ['../src/**/*.stories.@(tsx|js|jsx)'],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		// '@storybook/addon-designs',
		// '@storybook/addon-links',
		// 'storybook-addon-rtl',
		// '@chromatic-com/storybook',
		// 'storybook-addon-pseudo-states',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		docsMode: false,
	},
	// typescript: {
	// 	// Setting to false since we want to fully control what to document in argTypes
	// 	reactDocgen: false,
	// },
};
export default config;
