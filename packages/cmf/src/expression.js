import invariant from 'invariant';
import Registry from './registry';

const EXPRESSION_PREFIX = 'expression';

function register(id, func, context) {
	Registry.addToRegistry(`${EXPRESSION_PREFIX}:${id}`, func, context);
}

function get(id, context) {
	return Registry.getFromRegistry(`${EXPRESSION_PREFIX}:${id}`, context);
}

/**
 * expressions are registred function which can be called through configuration
 */
function call(expression, context, payload) {
	let id;
	let args;

	if (typeof expression === 'object') {
		id = expression.id;
		args = expression.args;
	} else if (typeof expression === 'string') {
		id = expression;
		args = [];
	}
	if (!id) {
		invariant(
			process.env.NODE_ENV === 'production',
			'you must provide an expression id'
		);
	}
	const check = get(id, context);
	if (!check) {
		invariant(
			process.env.NODE_ENV === 'production',
			`you must register expression ${id} first`
		);
	}
	return check({ context, payload }, ...args);
}

export default {
	register,
	get,
	call,
};
