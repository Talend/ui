import actions from '../../actions';
import onError from '../../onError';

const cmfMiddleware = store => next => action => {
	onError.addAction(action);
	const config = action.cmf;
	if (!config) {
		return next(action);
	}
	if (config.collectionId && action.response) {
		store.dispatch(actions.collections.addOrReplace(config.collectionId, action.response));
	}
	return next(action);
};

export default cmfMiddleware;
