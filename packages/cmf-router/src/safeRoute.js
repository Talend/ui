// Browsers strip ASCII tab/newline anywhere, and trim leading/trailing C0 controls/spaces,
// when parsing URLs. Interior spaces are preserved (percent-encoded), so they must not be
// stripped or they can make an unsafe path look safe (e.g. "/ /reports" -> "//reports").
// eslint-disable-next-line no-control-regex
const TAB_NEWLINE = /[\t\n\r]/g;
// eslint-disable-next-line no-control-regex
const EDGE_C0_SPACE = /^[\u0000- ]+|[\u0000- ]+$/g;
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

function isSafePath(path) {
	const value = path.replace(TAB_NEWLINE, '').replace(EDGE_C0_SPACE, '');
	if (SCHEME.test(value)) {
		return false;
	}
	// "//host" and "/\host" are protocol-relative for browsers
	return !/^[/\\]{2}/.test(value) && !value.startsWith('\\');
}

/**
 * Check a router target is an in-app path (string or history location object):
 * no scheme and not protocol-relative.
 */
export function isSafeRoute(route) {
	if (typeof route === 'string') {
		return isSafePath(route);
	}
	if (route && typeof route === 'object') {
		if (route.pathname === undefined) {
			return true;
		}
		return typeof route.pathname === 'string' && isSafePath(route.pathname);
	}
	return false;
}
