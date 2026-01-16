const config = {
	stories: ['../src/**/*.stories.jsx'],
	addons: ['@storybook/addon-a11y'],
	framework: {
		name: '@storybook/react-vite',
		options: {
			builder: {
				viteConfigPath: './.storybook/vite.config.ts',
			},
		},
	},
	typescript: {
		reactDocgen: false,
		check: false,
	},
};

export default config;
