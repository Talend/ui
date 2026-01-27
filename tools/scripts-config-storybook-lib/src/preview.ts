import React from 'react';
import type { Preview, StoryContext, StoryFn } from '@storybook/react';
import { merge } from 'lodash';
import { I18nextProvider } from 'react-i18next';
import { IconsProvider, ThemeProvider } from '@talend/design-system';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { initI18n, type I18nextOptions } from './i18n.js';
import { configureCmfModules, type CMFOptions } from './cmf.js';

/**
 * Get the preview head HTML content
 *
 * @param customContent - Optional custom HTML content to append
 * @returns HTML string to be used in preview-head.html
 */
function getPreviewHead(customContent: string = ''): string {
	return `<script type="text/javascript">
	// add this because of badly built https://unpkg.com/hoist-non-react-statics@3.3.2/dist/hoist-non-react-statics.min.js
	window.process = window.process || { env: { NODE_ENV: 'production' } };
</script>
<meta name="@talend/icons" content="7.14.0" />

${customContent}
`;
}

// i18n configuration
export { initI18n } from './i18n.js';
export type { I18nextOptions } from './i18n.js';

// CMF configuration
export { configureCmfModules } from './cmf.js';
export type { CMFOptions } from './cmf.js';

// Utilities
export { fixWindowsPath, fixWindowsPaths } from './utils.js';

/**
 * Options for configuring the preview
 */
export interface PreviewConfigOptions {
	/**
	 * i18next configuration options
	 */
	i18n?: I18nextOptions;

	/**
	 * CMF (Component Metadata Framework) configuration
	 */
	cmf?: CMFOptions;

	/**
	 * Additional global types for toolbar controls
	 */
	globalTypes?: Preview['globalTypes'];

	/**
	 * Additional decorators
	 */
	decorators?: Preview['decorators'];

	/**
	 * Additional parameters
	 */
	parameters?: Preview['parameters'];

	/**
	 * Additional loaders
	 */
	loaders?: Preview['loaders'];
}

/**
 * Bootstrap theme toggle component
 */
function ToggleBootstrap({ disabled }: { disabled: boolean }) {
	React.useEffect(() => {
		document.querySelectorAll('link[href*="bootstrap"]').forEach(link => {
			(link as HTMLLinkElement).disabled = disabled;
		});
	}, [disabled]);
	return null;
}

/**
 * Creates the preview Storybook configuration with Talend's defaults
 *
 * @param options - Configuration options
 * @param initI18nFunc - Function to initialize i18next (imported from ./i18n)
 * @param configureCmfFunc - Function to configure CMF (imported from ./cmf, optional)
 * @returns Preview configuration object with decorators, loaders, etc.
 *
 * @example
 * ```typescript
 * import { createPreviewConfig, initI18n } from '@talend/scripts-config-storybook-lib';
 *
 * export default createPreviewConfig({
 *   i18n: {
 *     namespaces: ['my-app'],
 *     locales: {
 *       en: { 'my-app': { hello: 'Hello' } }
 *     }
 *   }
 * }, initI18n);
 * ```
 */
export function createPreviewConfig(options: PreviewConfigOptions): Preview {
	// Initialize MSW
	initialize({
		onUnhandledRequest: 'bypass',
		serviceWorker: {
			url: './mockServiceWorker.js',
		},
	});

	if (!options.i18n) {
		options.i18n = {};
	}
	// Initialize i18next
	const i18n = initI18n(options.i18n);

	// Initialize CMF if configured
	let cmfLoader;
	let cmfDecorator;
	if (options.cmf) {
		try {
			const cmfPreview = configureCmfModules(options.cmf.modules, options.cmf.settings);
			cmfLoader = cmfPreview.loader;
			cmfDecorator = cmfPreview.decorator;
		} catch (e) {
			console.error('Error configuring CMF:', e);
		}
	}

	const defaultPreview: Preview = {
		previewHead: getPreviewHead(),
		globalTypes: {
			bootstrapTheme: {
				name: 'Bootstrap theme',
				description: 'Activate bootstrap theme',
				defaultValue: 'true',
				toolbar: {
					icon: 'beaker',
					items: [
						{ value: 'true', left: '✅', title: 'With Bootstrap' },
						{ value: 'false', left: '❌', title: 'Without Bootstrap' },
					],
					dynamicTitle: true,
				},
			},
			theme: {
				name: 'Theme',
				description: 'Choose a theme to apply to the design system',
				defaultValue: 'light',
				toolbar: {
					icon: 'paintbrush',
					items: [
						{ value: 'light', left: '⚪', title: 'Light mode' },
						{ value: 'dark', left: '🌑', title: 'Dark mode' },
						{ value: 'qlik-light', left: '🟢', title: 'Qlik light mode' },
					],
					dynamicTitle: true,
				},
			},
			locale: {
				name: 'Locale',
				defaultValue: 'en',
				toolbar: {
					icon: 'globe',
					items: [
						{ value: 'zh', left: '🇨🇳', title: 'Chinese' },
						{ value: 'en', left: '🇬🇧', title: 'English' },
						{ value: 'fr', left: '🇫🇷', title: 'French' },
						{ value: 'de', left: '🇩🇪', title: 'German' },
						{ value: 'ja', left: '🇯🇵', title: 'Japanese' },
					],
					dynamicTitle: true,
				},
			},
		},
		// @ts-expect-error
		loaders: [cmfLoader, mswLoader].filter(Boolean),
		// @ts-expect-error
		decorators: [
			(Story: StoryFn, context: StoryContext) => {
				i18n.changeLanguage(context.globals && context.globals.locale);
				return React.createElement(
					React.Suspense,
					{ fallback: null },
					React.createElement(
						I18nextProvider,
						{ i18n: i18n, key: 'i18n' },
						React.createElement(Story as any, { ...context, key: 'story' }),
					),
				);
			},
			(Story: StoryFn, context: StoryContext) => {
				const storyElement = React.createElement(Story as any, { ...context, key: 'story' });

				return [
					React.createElement(IconsProvider, {
						key: 'icons-provider-decorator',
						// bundles: ['all.svg', 'XS.svg', 'S.svg', 'M.svg', 'L.svg'],
					}),
					React.createElement(ToggleBootstrap, {
						disabled: context.globals.bootstrapTheme === 'false',
						key: 'toggle-bootstrap-decorator',
					}),
					React.createElement(
						ThemeProvider,
						{
							key: 'theme-provider-decorator',
							theme: context.globals.theme,
						},
						storyElement,
					),
				];
			},
			cmfDecorator,
		].filter(Boolean),
		parameters: {
			backgrounds: { disable: true, grid: { disable: true } },
			docs: {
				canvas: {
					withToolbar: true,
				},
			},
		},
	};

	// Decorators are executed in the defined order (SB doc).
	// But when they are executed, they decorate the result of previous decorator.
	// Example: [decorator1, decorator2] will result with
	// <decorator2>
	//		<decorator1>
	//			<Story></Story>
	//		</decorator1>
	// </decorator2>
	// We want @talend/scripts decorators to wrap users decorators, so we put user's first
	const decorators = [
		...(Array.isArray(options.decorators) ? options.decorators : []),
		...(Array.isArray(defaultPreview.decorators) ? defaultPreview.decorators : []),
	];
	const loaders = [
		...(Array.isArray(defaultPreview.loaders) ? defaultPreview.loaders : []),
		...(Array.isArray(options.loaders) ? options.loaders : []),
	];

	return {
		...defaultPreview,
		globalTypes: merge(defaultPreview.globalTypes, options.globalTypes),
		decorators,
		parameters: merge(defaultPreview.parameters, options.parameters),
		loaders,
	};
}
