// Browsers ignore ASCII tab/newline and leading C0 controls/spaces when parsing URLs.
// eslint-disable-next-line no-control-regex
const IGNORED_CHARS = /[\u0000- ]/g;
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

function isSafePath(path) {
	const value = path.replace(IGNORED_CHARS, '');
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
		return typeof route.pathname !== 'string' || isSafePath(route.pathname);
	}
	return false;
}
