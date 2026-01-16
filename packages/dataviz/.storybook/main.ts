import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.tsx'],
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
		reactDocgen: 'react-docgen-typescript',
	},
};

export default config;
