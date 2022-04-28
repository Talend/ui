import { push, replace } from 'connected-react-router';

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
		if (config.routerPush) {
			store.dispatch(push(route));
		} else {
			store.dispatch(replace(route));
		}
	}
	return next(action);
};

export default cmfMiddleware;
