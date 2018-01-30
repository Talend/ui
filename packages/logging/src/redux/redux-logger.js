import { TraceKit } from '../api/errorTransformer';

export default () => next => action => {
	try {
		return next(action);
	} catch (e) {
		TraceKit.report(e);
		throw e;
	}
};
