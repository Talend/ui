import { TalendRequest, TalendRequestInit } from './http.types';

/**
 * Storage point for the doc setup using `setDefaultConfig`
 */
export const HTTP: { defaultConfig?: TalendRequestInit | null } = {
	defaultConfig: null,
};

export type Interceptor = (request: TalendRequest, response: Response) => Promise<Response>;

export const HTTP_RESPONSE_INTERCEPTORS: Record<string, Interceptor> = {};

export function addHttpResponseInterceptor(name: string, interceptor: Interceptor) {
	if (HTTP_RESPONSE_INTERCEPTORS[name]) {
		throw new Error(`Interceptor ${name} already exists`);
	}
	HTTP_RESPONSE_INTERCEPTORS[name] = interceptor;
}

export function removeHttpResponseInterceptor(name: string) {
	if (!HTTP_RESPONSE_INTERCEPTORS[name]) {
		throw new Error(`Interceptor ${name} does not exist`);
	}
	delete HTTP_RESPONSE_INTERCEPTORS[name];
}

export function applyInterceptors(request: TalendRequest, response: Response): Promise<Response> {
	return Object.values(HTTP_RESPONSE_INTERCEPTORS).reduce(
		(promise, interceptor) => promise.then(resp => interceptor(request, resp)),
		Promise.resolve(response),
	);
}

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
