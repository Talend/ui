const ALLOWED_PROTOCOLS = ['http:', 'https:'];

function getBaseUrl(): string {
	return typeof document !== 'undefined' ? document.baseURI : 'http://localhost/';
}

/**
 * Return the href only if it resolves to an http(s) url (relative urls and anchors included).
 * Otherwise (javascript:, data:, vbscript:, ...) return undefined so the unsafe value never
 * reaches the DOM.
 * The href is parsed the same way the browser does, so leading/trailing spaces and
 * tab/newline characters used to obfuscate the scheme are normalized.
 */
export function getSafeHref(href: string | undefined): string | undefined {
	if (typeof href !== 'string') {
		return undefined;
	}
	try {
		return ALLOWED_PROTOCOLS.includes(new URL(href, getBaseUrl()).protocol) ? href : undefined;
	} catch {
		return undefined;
	}
}
