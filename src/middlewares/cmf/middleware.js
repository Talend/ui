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
	if (config.routerPush) {
		let route = config.routerPush;
		if (typeof route === 'function') {
			route = route(action);
		}
		store.dispatch({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				method: 'push',
				args: [route],
			},
		});
	}
	return next(action);
};

export default cmfMiddleware;
