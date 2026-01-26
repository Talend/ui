import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.jsx'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-links'],
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
