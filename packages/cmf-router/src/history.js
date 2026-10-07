/* eslint-disable no-param-reassign */
import { UNSAFE_createBrowserHistory as createReactRouterHistory, parsePath } from 'react-router';
import { isSafeRoute } from './safeRoute';

/**
 * react-router v7 does not depend on `history` anymore, it embeds a small history
 * implementation that only accepts ONE listener and only notifies on push/replace
 * when `v5Compat` is set. We restore the `history` v5 behavior we relied on:
 * multiple listeners and `listen(({ action, location }))`.
 */
function multicast(history) {
	const listeners = new Set();
	const singleListen = history.listen;
	let unlisten = null;
	return function listen(listener) {
		listeners.add(listener);
		if (!unlisten) {
			unlisten = singleListen(update => {
				Array.from(listeners).forEach(fn => fn(update));
			});
		}
		return () => {
			listeners.delete(listener);
			if (listeners.size === 0 && unlisten) {
				unlisten();
				unlisten = null;
			}
		};
	};
}

export function create(options) {
	const history = createReactRouterHistory({ ...options, v5Compat: true });
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

	// history v5 accepted `push({ pathname, state })`, react-router v7 overwrites the
	// location state with its second argument (null by default).
	const withState = (location, state) => [
		location,
		state === undefined && typeof location === 'object' ? location.state : state,
	];

	const oldPush = history.push;
	const push = (location, state) => {
		if (!isSafeRoute(location)) {
			console.error('CMF router: refusing to navigate to a non in-app route', location);
			return undefined;
		}
		return oldPush(...withState(prependBasename(location), state));
	};

	const oldReplace = history.replace;
	const replace = (location, state) => {
		if (!isSafeRoute(location)) {
			console.error('CMF router: refusing to navigate to a non in-app route', location);
			return undefined;
		}
		return oldReplace(...withState(prependBasename(location), state));
	};

	Object.assign(history, {
		push,
		replace,
		// history v5 API not provided by the react-router one
		back: () => history.go(-1),
		forward: () => history.go(1),
		listen: multicast(history),
	});
	return history;
}
