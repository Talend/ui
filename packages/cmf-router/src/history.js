/* eslint-disable no-param-reassign */
import { createBrowserHistory, parsePath } from 'history';
import { isSafeRoute } from './safeRoute';

export function create(options) {
	const history = createBrowserHistory(options);
	const { basename } = options;

	const prependBasename = location => {
		if (!basename) return location;

		const object = typeof location === 'string' ? parsePath(location) : location;
		const pname = object.pathname;
		const normalizedBasename = basename.slice(-1) === '/' ? basename : `${basename}/`;
		const normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
		const pathname = normalizedBasename + normalizedPathname;

		return {
			...object,
			pathname,
		};
	};

	// Override all read methods with basename-aware versions.

	const oldPush = history.push;
	const push = location => {
		if (!isSafeRoute(location)) {
			console.error('CMF router: refusing to navigate to a non in-app route', location);
			return undefined;
		}
		return oldPush(prependBasename(location));
	};

	const oldReplace = history.replace;
	const replace = location => {
		if (!isSafeRoute(location)) {
			console.error('CMF router: refusing to navigate to a non in-app route', location);
			return undefined;
		}
		return oldReplace(prependBasename(location));
	};

	Object.assign(history, {
		push,
		replace,
	});
	return history;
}
