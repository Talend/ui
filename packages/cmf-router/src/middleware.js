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
		store.dispatch({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				method: config.routerPush ? 'push' : 'replace',
				args: [route],
			},
		});
	}
	return next(action);
};

export default cmfMiddleware;
