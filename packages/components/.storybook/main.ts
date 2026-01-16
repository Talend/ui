import type { StorybookConfig } from '@storybook/react-vite';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.tsx'],
	addons: ['@storybook/addon-links'],
	framework: {
		name: '@storybook/react-vite',
		options: {
			viteConfig: {
				optimizeDeps: {
					force: true,
					esbuildOptions: {
						plugins: [fixReactVirtualized],
					},
				},
			},
		},
	},
	docs: {
		autodocs: 'tag',
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};

export default config;
