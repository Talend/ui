import type { StorybookConfig } from '@storybook/react-webpack5';
import * as fs from 'fs';
import { merge } from 'lodash';
import * as path from 'path';
import { getSassLoaders } from '@talend/scripts-config-react-webpack/config/webpack.config.common';

import { fixWindowsPaths } from './utils';

/**
 * Options for configuring the main Storybook configuration
 */
export interface MainConfigOptions {
	/**
	 * Custom stories glob patterns to add
	 */
	stories?: StorybookConfig['stories'];

	/**
	 * Additional addons to include
	 */
	addons?: string[];

	/**
	 * Static directories to serve
	 */
	staticDirs?: string[];

	/**
	 * Custom webpack configuration function
	 */
	webpackFinal?: StorybookConfig['webpackFinal'];

	/**
	 * Additional features configuration
	 */
	features?: Record<string, any>;

	/**
	 * Core configuration options
	 */
	core?: Record<string, any>;

	/**
	 * TypeScript configuration options
	 */
	typescript?: Record<string, any>;

	/**
	 * Current working directory (defaults to process.cwd())
	 */
	cwd?: string;
}

/**
 * Get folder glob pattern for stories
 */
function getFolderGlob(cwd: string, folderName: string): string {
	return path.join(cwd, folderName, '**/*.@(stories.js|stories.jsx|stories.tsx|mdx)');
}

/**
 * Get default stories folders
 */
function getStoriesFolders(cwd: string): string[] {
	const storiesFolders = [getFolderGlob(cwd, 'src')];
	if (fs.existsSync(path.join(cwd, 'stories'))) {
		storiesFolders.push(getFolderGlob(cwd, 'stories'));
	}
	return storiesFolders;
}

/**
 * Creates the main Storybook configuration with Talend's defaults
 *
 * @param options - Configuration options
 * @returns Storybook main configuration object
 *
 * @example
 * ```typescript
 * import { createMainConfig } from '@talend/storybook-config';
 *
 * export default createMainConfig({
 *   stories: ['./custom/**\/*.stories.tsx'],
 *   addons: ['@storybook/addon-themes']
 * });
 * ```
 */
export function createMainConfig(options: MainConfigOptions = {}): StorybookConfig {
	const cwd = options.cwd || process.cwd();

	const defaultMain: StorybookConfig = {
		framework: {
			name: '@storybook/react-webpack5',
			options: {
				builder: {
					fsCache: true,
				},
			},
		},
		typescript: {
			reactDocgen: false,
			check: false,
		},
		core: {
			enableCrashReports: false,
			disableTelemetry: true,
		},
		features: {
			buildStoriesJson: true,
		},
		stories: getStoriesFolders(cwd),
		staticDirs: [
			path.join(__dirname, '../public/msw'),
			require
				.resolve('@talend/icons')
				.replace('index.js', '')
				.replace('/dist/TalendIcons.js', '/dist/svg-bundle'),
		],
		addons: [
			'@storybook/addon-essentials',
			'@storybook/addon-a11y',
			'@storybook/addon-links',
			'@storybook/addon-interactions',
			'@storybook/addon-storysource',
		],
		webpackFinal: async (config, configOptions) => {
			// by default storybook do not support scss without css module
			// here we remove storybook scss config and replace it by our config
			const rules = [
				...(config.module?.rules || []).filter(rule => {
					if (rule && typeof rule === 'object' && 'test' in rule) {
						return !rule.test?.toString().includes('s[ca]ss');
					}
					return true;
				}),
				{
					test: /\.scss$/,
					exclude: /\.module\.scss$/,
					use: getSassLoaders(false, '', true),
				},
				{
					test: /\.module\.scss$/,
					use: getSassLoaders(true, '', true),
				},
			];

			const mergedConfig = {
				...config,
				module: {
					...config.module,
					rules,
				},
				plugins: [...(config.plugins || [])],
				resolve: {
					...config.resolve,
					extensions: (config.resolve?.extensions || []).concat([
						'.js',
						'.jsx',
						'.ts',
						'.tsx',
						'.json',
						'.css',
						'.scss',
					]),
					fallback: {
						...config.resolve?.fallback,
						path: false as any,
						querystring: require.resolve('querystring-es3') as any,
					},
				},
			};

			return mergedConfig as any;
		},
	};

	const stories = fixWindowsPaths([...(options.stories || defaultMain.stories || [])] as any);

	const finalConfig: StorybookConfig = {
		...defaultMain,
		features: merge(defaultMain.features, options.features),
		stories,
		addons: [...(defaultMain.addons || []), ...(options.addons || [])],
		core: merge(defaultMain.core, options.core),
		typescript: merge(defaultMain.typescript, options.typescript),
		staticDirs: fixWindowsPaths([
			...(defaultMain.staticDirs || []),
			...(options.staticDirs || []),
		] as any),
		webpackFinal: async (config, configOptions) => {
			let finalConfig = await defaultMain.webpackFinal!(config, configOptions);
			if (options.webpackFinal) {
				finalConfig = await options.webpackFinal(finalConfig, configOptions);
			}
			return finalConfig;
		},
	};

	return finalConfig;
}
