import get from 'lodash/get';
import routerMatchPath from '../sagaRouter/matchPath';
import CONSTANTS from '../constant';
import selectors from '../selectors';

export function matchPath({ context }, options, getPath, defaultValue) {
	const state = context.store.getState();
	const currentPath = selectors.router.getPath(state);
	const match = routerMatchPath(currentPath, options);
	if (getPath) {
		if (getPath === 'params') {
			throw new Error(CONSTANTS.ERROR_ROUTER_DONT_GET_PARAMS);
		}
		return get(match, getPath, defaultValue);
	}
	return match !== null;
}

export function location({ context }, getPath) {
	const state = context.store.getState();
	const loc = selectors.router.getLocation(state);
	if (getPath) {
		return get(loc, getPath);
	}
	return loc;
}
