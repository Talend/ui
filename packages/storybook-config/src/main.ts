import type { StorybookConfig } from '@storybook/react-vite';
import * as fs from 'fs';
import _ from 'lodash';
import * as path from 'path';

import { fixWindowsPaths } from './utils.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
		stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.jsx'],
		framework: {
			name: '@storybook/react-vite',
			options: {
				builder: {
					viteConfigPath: path.join(__dirname, 'vite.config.mjs'),
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
			// buildStoriesJson: true,
		},
		// stories: getStoriesFolders(cwd),
		staticDirs: [
			path.join(__dirname, '../public/msw'),
			// require
			// 	.resolve('@talend/icons')
			// 	.replace('index.js', '')
			// 	.replace('/dist/TalendIcons.js', '/dist/svg-bundle'),
		],
		addons: ['@storybook/addon-a11y', '@storybook/addon-links'],
	};

	// const stories = fixWindowsPaths([...(options.stories || defaultMain.stories || [])] as any);

	const finalConfig: StorybookConfig = {
		...defaultMain,
		features: _.merge(defaultMain.features, options.features),
		// stories,
		addons: [...(defaultMain.addons || []), ...(options.addons || [])],
		core: _.merge(defaultMain.core, options.core),
		typescript: _.merge(defaultMain.typescript, options.typescript),
		staticDirs: fixWindowsPaths([
			// @ts-expect-error
			...(defaultMain.staticDirs || []),
			...(options.staticDirs || []),
		] as any),
	};

	return finalConfig;
}
