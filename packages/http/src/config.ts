import { TalendRequestInit } from './http.types';

/**
 * Storage point for the doc setup using `setDefaultConfig`
 */
export const HTTP: { defaultConfig?: TalendRequestInit | null } = {
	defaultConfig: null,
};

/**
 * setDefaultHeader - define a default config to use with the saga http
 * this default config is stored in this module for the whole application
 *
 * @param  {object} config key/value of header to apply
 * @example
 * import { setDefaultConfig } from '@talend/react-cmf/sagas/http';
 * setDefaultConfig({headers: {
 *  'Accept-Language': preferredLanguage,
 * }});
 */
export function setDefaultConfig(config: TalendRequestInit) {
	if (HTTP.defaultConfig) {
		throw new Error(
			'ERROR: setDefaultConfig should not be called twice, if you wish to change the language use setDefaultLanguage api.',
		);
	}

	HTTP.defaultConfig = config;
}

/**
 * getDefaultConfig - return the defaultConfig
 *
 * @return {object}  the defaultConfig used by cmf
 */
export function getDefaultConfig(): TalendRequestInit | null {
	// @ts-ignore should not be undefined
	return HTTP.defaultConfig;
}

/**
 * To change only the Accept-Language default headers
 * on the global http defaultConfig
 * @param {String} language
 */
export function setDefaultLanguage(language: string): void {
	if (HTTP.defaultConfig?.headers) {
		// @ts-ignore
		HTTP.defaultConfig.headers['Accept-Language'] = language;
	} else {
		// eslint-disable-next-line no-console
		throw new Error('ERROR: you should call setDefaultConfig.');
	}
}
