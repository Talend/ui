const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Check that the url is a string which resolves to an http(s) url.
 * The url is parsed the same way the browser does (leading/trailing spaces and
 * tab/newline characters are normalized by the URL parser).
 * @param {*} url
 * @returns {boolean}
 */
export function isSafeUrl(url) {
	if (typeof url !== 'string') {
		return false;
	}
	try {
		return ALLOWED_PROTOCOLS.includes(new URL(url, document.baseURI).protocol);
	} catch {
		return false;
	}
}
