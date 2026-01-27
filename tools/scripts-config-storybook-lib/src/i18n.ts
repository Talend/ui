import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

/**
 * i18next initialization options
 */
export interface I18nextOptions {
	/**
	 * List of namespaces to use
	 */
	namespaces?: string[];

	/**
	 * Locale resources organized by language and namespace
	 * @example
	 * ```typescript
	 * {
	 *   en: {
	 *     'my-app': { hello: 'Hello' }
	 *   },
	 *   fr: {
	 *     'my-app': { hello: 'Bonjour' }
	 *   }
	 * }
	 * ```
	 */
	locales?: Record<string, Record<string, any>>;

	/**
	 * Map of namespace to remote URL for loading translations
	 * @example
	 * ```typescript
	 * {
	 *   'my-app': 'https://example.com/locales/my-app.json'
	 * }
	 * ```
	 */
	remoteLocalesMap?: Record<string, string>;
}

/**
 * Initialize i18next for Storybook
 *
 * @param options - i18next configuration options
 * @returns Initialized i18next instance
 *
 * @example
 * ```typescript
 * import { initI18n } from '@talend/scripts-config-storybook-lib';
 *
 * const i18n = initI18n({
 *   namespaces: ['my-app'],
 *   locales: {
 *     en: { 'my-app': { hello: 'Hello' } },
 *     fr: { 'my-app': { hello: 'Bonjour' } }
 *   }
 * });
 * ```
 */
export function initI18n(options: I18nextOptions = {}) {
	const { namespaces = [], locales, remoteLocalesMap } = options;

	const i18nextOptions: any = {
		debug: true,
		defaultNS: namespaces[0],
		fallbackLng: 'en',
		fallbackNS: namespaces,
		interpolation: {
			escapeValue: false,
		},
		ns: namespaces,
		wait: true,
	};

	if (locales) {
		i18nextOptions.resources = locales;
	} else if (remoteLocalesMap) {
		i18nextOptions.backend = {
			loadPath: (_: any, namespaces: string[]) => remoteLocalesMap[namespaces[0]],
		};
		i18n.use(HttpApi);
	}

	i18n.use(initReactI18next).init(i18nextOptions);

	// Expose i18n globally for debugging
	if (typeof window !== 'undefined') {
		(window as any).i18n = i18n;
	}

	return i18n;
}
