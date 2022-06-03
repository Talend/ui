/* eslint-disable no-param-reassign */
import { createBrowserHistory, parsePath } from 'history';

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
	const push = location => oldPush(prependBasename(location));

	const oldReplace = history.replace;
	const replace = location => oldReplace(prependBasename(location));

	Object.assign(history, {
		push,
		replace,
	});
	return history;
}
