import actions from '../../actions';

const cmfMiddleware = store => next => (action) => {
	const config = action.cmf;
	if (!config) {
		return next(action);
	}
	if (config.collectionId && action.response) {
		store.dispatch(
			actions.collectionsActions.addOrReplaceCollection(
				config.collectionId, action.response,
			),
		);
	}
	if (config.routerPush || config.routerReplace) {
		let route = config.routerPush || config.routerReplace;
		if (typeof route === 'function') {
			route = route(action);
		}

		const { event } = action;
		if (event && ((event.button === 0 && (event.ctrlKey || event.metaKey)) || event.button === 1)) {
			window.open([route], '_blank');
		} else {
			store.dispatch({
				type: '@@router/CALL_HISTORY_METHOD',
				payload: {
					method: config.routerPush ? 'push' : 'replace',
					args: [route],
				},
			});
		}
	}
	return next(action);
};

export default cmfMiddleware;
