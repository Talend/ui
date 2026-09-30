import { matchPath as matchPathV7 } from 'react-router';

/**
 * Keep the react-router v5 `matchPath(pathname, options)` contract
 * (`{ path, url, isExact, params }`) on top of the react-router v7 one
 * (`matchPath({ path, end, caseSensitive }, pathname)`).
 * `options` is a path or `{ path, exact, sensitive }`. `strict` and path arrays are not supported anymore.
 */
const matchPath = (pathname, options) => {
	const {
		path,
		exact = false,
		sensitive = false,
	} = typeof options === 'string' ? { path: options } : options;
	const match = matchPathV7({ path, end: exact, caseSensitive: sensitive }, pathname);
	if (!match) {
		return null;
	}
	return {
		path,
		url: match.pathname,
		isExact: pathname === match.pathname,
		params: match.params,
	};
};

const createSelectors = structure => {
	const { getIn, toJS } = structure;

	const isRouter = value =>
		value != null &&
		typeof value === 'object' &&
		getIn(value, ['location']) &&
		getIn(value, ['action']);

	const getRouter = state => {
		const router = toJS(getIn(state, ['router']));
		if (!isRouter(router)) {
			throw 'Could not find router reducer in state tree, it must be mounted under "router"';
		}
		return router;
	};
	const getLocation = state => toJS(getIn(getRouter(state), ['location']));
	const getAction = state => toJS(getIn(getRouter(state), ['action']));
	const getSearch = state => toJS(getIn(getRouter(state), ['location', 'search']));
	const getHash = state => toJS(getIn(getRouter(state), ['location', 'hash']));

	// It only makes sense to recalculate the `matchPath` whenever the pathname
	// of the location changes. That's why `createMatchSelector` memoizes
	// the latest result based on the location's pathname.
	const createMatchSelector = path => {
		let lastPathname = null;
		let lastMatch = null;

		return state => {
			const { pathname } = getLocation(state) || {};
			if (pathname === lastPathname) {
				return lastMatch;
			}
			lastPathname = pathname;
			const match = matchPath(pathname, path);
			if (
				!match ||
				!lastMatch ||
				match.url !== lastMatch.url ||
				// When URL matched for nested routes, URL is the same but isExact is not.
				match.isExact !== lastMatch.isExact
			) {
				lastMatch = match;
			}

			return lastMatch;
		};
	};

	return {
		getLocation,
		getAction,
		getRouter,
		getSearch,
		getHash,
		createMatchSelector,
	};
};

export default createSelectors;
