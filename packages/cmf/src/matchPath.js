/**
 * Beware! Do not modify. Forked from react-router V4
 * Will be available as a dependency
 */
import { pathToRegexp } from 'path-to-regexp';

const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (pattern, options) => {
	const cacheKey = `${options.end}${options.strict}`;
	const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

	if (cache[pattern]) return cache[pattern];

	const { regexp, keys } = pathToRegexp(pattern, options);
	const compiledPattern = { re: regexp, keys };

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

	const url = match[0];
	const isExact = pathname === url;

	if (exact && !isExact) return null;

	const params = {};
	for (let i = 1; i < match.length; i++) {
		if (match[i] === undefined) continue;
		const key = keys[i - 1];
		params[key.name] = match[i];
	}

	return {
		path,
		url: path === '/' && url === '' ? '/' : url,
		isExact,
		params,
	};
}
