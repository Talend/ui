/**
 * Beware! Do not modify. Forked from react-router V4
 * Will be available as a dependency
 */

import pathToRegexp from 'path-to-regexp';

const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (pattern, options) => {
	const cacheKey = `${options.end}${options.strict}`;
	const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

	if (cache[pattern]) return cache[pattern];

	const keys = [];
	const re = pathToRegexp(pattern, keys, options);
	const compiledPattern = { re, keys };

	if (cacheCount < cacheLimit) {
		cache[pattern] = compiledPattern;
		cacheCount += 1;
	}

	return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
export default function matchPath(pathname, options = {}) {
	if (typeof options === 'string') options = { path: options }; // eslint-disable-line no-param-reassign

	const { path = '/', exact = false, strict = false } = options;
	const { re, keys } = compilePath(path, { end: exact, strict });
	const match = re.exec(pathname);

	if (!match) return null;

	const [url, ...values] = match;
	const isExact = pathname === url;

	if (exact && !isExact) return null;

	return {
		path, // the path pattern used to match
		url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
		isExact, // whether or not we matched exactly
		params: keys.reduce((memo, key, index) => {
			memo[key.name] = values[index]; // eslint-disable-line no-param-reassign
			return memo;
		}, {}),
	};
}
