import { push, replace } from '@talend/connected-react-router';
import { isSafeRoute } from './safeRoute';

const cmfMiddleware = store => next => action => {
	const config = action.cmf;
	if (!config) {
		return next(action);
	}
	if (config.routerPush || config.routerReplace) {
		let route = config.routerPush || config.routerReplace;
		if (typeof route === 'function') {
			route = route(action);
		}
		if (!isSafeRoute(route)) {
			console.error('CMF router: refusing to navigate to a non in-app route', route);
			return next(action);
		}
		if (config.routerPush) {
			store.dispatch(push(route));
		} else {
			store.dispatch(replace(route));
		}
	}
	return next(action);
};

export default cmfMiddleware;
