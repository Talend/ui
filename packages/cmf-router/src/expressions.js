import get from 'lodash/get';
import cmf from '@talend/react-cmf';
import CONSTANTS from './constant';
import { getPath, getLocation } from './selectors';

export function matchPath({ context }, options, getPathArg, defaultValue) {
	const state = context.store.getState();
	const currentPath = getPath(state);
	const match = cmf.router.matchPath(currentPath, options);
	if (getPathArg) {
		if (getPathArg === 'params') {
			throw new Error(CONSTANTS.ERROR_ROUTER_DONT_GET_PARAMS);
		}
		return get(match, getPathArg, defaultValue);
	}
	return match !== null;
}

export function location({ context }, getPathArg) {
	const state = context.store.getState();
	const loc = getLocation(state);
	if (getPathArg) {
		return get(loc, getPathArg);
	}
	return loc;
}

export default {
	'cmf.router.matchPath': matchPath,
	'cmf.router.location': location,
};
