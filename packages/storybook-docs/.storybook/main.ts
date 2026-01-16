import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const _dirname = path.dirname(new URL(import.meta.url).pathname);

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.tsx'],
	staticDirs: [
		{
			from: path.join(_dirname, '../dist'),
			to: `/storybook-docs/assets/`,
		},
	],
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
