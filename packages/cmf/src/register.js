import actions from './actions';
import actionCreator from './actionCreator';
import expression from './expression';
import expressions from './expressions';

// eslint-disable-next-line import/prefer-default-export
export function registerInternals(context) {
	actionCreator.register('cmf.saga.start', actions.saga.start, context);
	actionCreator.register('cmf.saga.stop', actions.saga.stop, context);
	expression.registerMany(expressions, context);
}
