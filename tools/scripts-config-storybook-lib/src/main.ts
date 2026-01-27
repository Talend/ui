/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import _ from 'lodash';
import * as path from 'path';

import { fixWindowsPaths } from './utils.js';

const mydirname = path.dirname(fileURLToPath(import.meta.url));

async function getIconPath(): Promise<string> {
	try {
		const iconPath = fileURLToPath(await import.meta.resolve('@talend/icons'));
		return iconPath.replace('/dist/index.js', '');
	} catch (e) {
		return '';
	}
}

async function getPreviewHead(): Promise<string> {
	let iconVersion = '7.14.0';
	try {
		const iconsPath = await getIconPath();
		const iconsPackageJson = JSON.parse(
			fs.readFileSync(path.join(iconsPath, 'package.json'), { encoding: 'utf-8' }),
		);
		if (iconsPackageJson.version) {
			iconVersion = iconsPackageJson.version;
		}
	} catch (e) {
		// do nothing, use default version
	}

	return `<script type="text/javascript" id="talend-icons-loader">
	// add this because of badly built https://unpkg.com/hoist-non-react-statics@3.3.2/dist/hoist-non-react-statics.min.js
	window.process = window.process || { env: { NODE_ENV: 'production' } };
</script>
<meta name="@talend/icons" content="${iconVersion}" />`;
}

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

	/**
	 * Custom preview head HTML content
	 */
	previewHead?: (head?: string) => string;
}

/**
 * Creates the main Storybook configuration with Talend's defaults
 *
 * @param options - Configuration options
 * @returns Storybook main configuration object
 *
 * @example
 * ```typescript
 * import { createMainConfig } from '@talend/scripts-config-storybook-lib';
 *
 * export default createMainConfig({
 *   stories: ['./custom/**\/*.stories.tsx'],
 *   addons: ['@storybook/addon-themes']
 * });
 * ```
 */
export async function createMainConfig(options: MainConfigOptions = {}): Promise<StorybookConfig> {
	let iconsPath = await getIconPath();
	if (iconsPath) {
		iconsPath = `${iconsPath}/dist/svg-bundle`;
	}
	const defaultMain: StorybookConfig = {
		stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.jsx'],
		framework: {
			name: '@storybook/react-vite',
			options: {
				builder: {
					viteConfigPath: path.join(mydirname, 'vite.config.mjs'),
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
		staticDirs: [path.join(mydirname, '../public/msw'), iconsPath],
		addons: ['@storybook/addon-a11y', '@storybook/addon-links'],
	};

	// const stories = fixWindowsPaths([...(options.stories || defaultMain.stories || [])] as any);

	const finalConfig: StorybookConfig = {
		...defaultMain,
		previewHead: async (head?: string) =>
			`${options?.previewHead?.(head) || head}\n${await getPreviewHead()}`,
		stories: options.stories || defaultMain.stories,
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
