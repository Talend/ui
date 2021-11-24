/**
 * @module csrfHandling
 * This module target to extract csrf token from a cookie,
 * and then merge it if available into a http config.
 */

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
export function getCookie() {
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
function parseCookie(cookie) {
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
const findCSRFToken = ({ CSRFTokenCookieKey = 'csrfToken' }) => cookieValues => {
	if (cookieValues instanceof Map) {
		return cookieValues.get(CSRFTokenCookieKey);
	}
	return undefined;
};

/**
 * effectively merge the csrf token into the http configuration
 * @param {Object.CSRFTokenHeaderKey} CSRFTokenCookieKey - default `X-CSRF-Token`
 * @param {Object} config
 * @param {string} csrfToken
 * @return {function}
 */
const mergeCSRFTokenConfig = ({ CSRFTokenHeaderKey = 'X-CSRF-Token' }, httpConfig) => csrfToken => {
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

/**
 * if a CSRF token is found in csrfToken cookie, merge it in the headers
 * under key X-CSRF-Token
 * @param {Object.security} security
 * @param {HTTPConfig} config
 * @return {HTTPConfig}
 */
export function mergeCSRFToken({ security = {} }) {
	return httpConfig =>
		[
			getCookie,
			parseCookie,
			findCSRFToken(security),
			mergeCSRFTokenConfig(security, httpConfig),
		].reduce((prev, fct) => fct(prev), null);
}
