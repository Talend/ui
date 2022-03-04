const logMiddleware = () => next => action => {
	// eslint-disable-next-line no-console
	console.log(action);
	return next(action);
};

export default [logMiddleware];
