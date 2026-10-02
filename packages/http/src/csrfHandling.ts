/**
 * @module csrfHandling
 * This module target to extract csrf token from a cookie,
 * and then merge it if available into a http config.
 */
import { TalendRequestInit, TalendRequestInitSecurity } from './http.types';

/**
 * @typedef {Object} HTTPConfig
 * @property {string} body
 * @property {string} credentials
 * @property {Headers} headers
 * @property {string} method - See ./constants.js for a list of suitable method
 * @property {onError | string} onError
 * @property {onResponse | string} onResponse
 * @property {string} onSend - a redux action type
 */

/**
 * regexp to extract key value elements from a cookie
 * be carefull when touching this regexp shape could break
 * regexp matching on test unexpectedly
 */
const cookieElementRegexp = new RegExp(/(.*)=(.*)/);

/**
 * retrieve the cookie from the document
 */
export function getCookie(): string {
	if (document.cookie) {
		return document.cookie;
	}
	return '';
}

/**
 * parse the content of the cookie to key value map
 * @param {string} cookie
 * @returns {Map.<string, string>}
 */
function parseCookie(cookie: string): Map<string, string> {
	const cookieValue = cookie.split(';').reduce((map, line) => {
		const match = cookieElementRegexp.exec(line.trim());
		if (match && match[1] && match[2]) {
			return map.set(match[1], match[2]);
		}
		return map;
	}, new Map());
	return cookieValue;
}

/**
 * retrieve the csrf token from the cookie content
 * @param {Object.CSRFTokenCookieKey} CSRFTokenCookieKey - default `csrfToken`
 * @param {Map.<string, string>} cookieValues
 */
function findCSRFToken({ CSRFTokenCookieKey = 'csrfToken' }: TalendRequestInitSecurity) {
	return (cookieValues: Map<string, string>): string | undefined => {
		return cookieValues.get(CSRFTokenCookieKey);
	};
}

/**
 * effectively merge the csrf token into the http configuration
 * @param {Object.CSRFTokenHeaderKey} CSRFTokenCookieKey - default `X-CSRF-Token`
 * @param {Object} config
 * @param {string} csrfToken
 * @return {function}
 */
function mergeCSRFTokenConfig(
	{ CSRFTokenHeaderKey = 'X-CSRF-Token' }: TalendRequestInitSecurity,
	httpConfig: TalendRequestInit,
) {
	return (csrfToken: string | undefined): TalendRequestInit => {
		if (csrfToken) {
			return {
				...httpConfig,
				headers: {
					...httpConfig.headers,
					[CSRFTokenHeaderKey]: csrfToken,
				},
			};
		}
		return httpConfig;
	};
}

/**
 * Tell if the CSRF token may be sent to the given url:
 * the url, resolved against document.baseURI, must be same-origin with the document
 * or its origin must be listed in `security.CSRFTokenAllowedOrigins`.
 * @param {string} url
 * @param {Object.security} security
 * @return {boolean}
 */
export function isCSRFTokenAllowedForUrl(
	url: string | URL | undefined,
	security: TalendRequestInitSecurity = {},
): boolean {
	if (url === undefined || url === null) {
		return false;
	}
	try {
		const base = document.baseURI || window.location.href;
		const { origin } = new URL(String(url), base);
		if (origin === 'null') {
			return false;
		}
		if (origin === new URL(base).origin) {
			return true;
		}
		return (security.CSRFTokenAllowedOrigins || []).some(allowed => {
			try {
				return new URL(allowed).origin === origin;
			} catch {
				return false;
			}
		});
	} catch {
		return false;
	}
}

/**
 * if a CSRF token is found in csrfToken cookie, merge it in the headers
 * under key X-CSRF-Token.
 * The token is only merged if the request url is same-origin with the document
 * or allowed by `security.CSRFTokenAllowedOrigins`.
 * @param {Object.security} security
 * @param {string} url - the request url
 * @param {HTTPConfig} config
 * @return {HTTPConfig}
 */
export function mergeCSRFToken({ security = {} }: TalendRequestInit, url?: string | URL) {
	return (httpConfig: TalendRequestInit): TalendRequestInit => {
		if (!isCSRFTokenAllowedForUrl(url, security)) {
			return httpConfig;
		}
		const cookie = getCookie();
		const cookieValues = parseCookie(cookie);
		const csrfToken = findCSRFToken(security)(cookieValues);
		return mergeCSRFTokenConfig(security, httpConfig)(csrfToken);
	};
}
