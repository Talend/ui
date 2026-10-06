const ALLOWED_PROTOCOLS = ['http:', 'https:'];

function getBaseUrl(): string {
	return typeof document !== 'undefined' ? document.baseURI : 'http://localhost/';
}

/**
 * Check that the url is a string which resolves to an http(s) url.
 * The url is parsed the same way the browser does (leading/trailing spaces and
 * tab/newline characters are normalized by the URL parser).
 * Safe to call during SSR (falls back to a dummy base url when `document` is unavailable).
 * @param url
 * @returns {boolean}
 */
export function isSafeUrl(url: unknown): boolean {
	if (typeof url !== 'string') {
		return false;
	}
	try {
		return ALLOWED_PROTOCOLS.includes(new URL(url, getBaseUrl()).protocol);
	} catch {
		return false;
	}
}
