import jsonLogic from 'json-logic-js';

function lowercase(a) {
	return a.toLowerCase();
}

function toNumber(a) {
	if (typeof a === 'number') {
		return a;
	} else if (typeof a === 'string') {
		return parseInt(a, 10);
	}
	throw new Error(`${a.toString()} is not a number`);
}

jsonLogic.add_operation('lowercase', lowercase);
jsonLogic.add_operation('toNumber', toNumber);

/**
 *
 * @example {
 *		'===': [{ var: 'my.path.title' }, 'Hello world'],
 * }
 *
 * @param properties source of the value provider to evaluate conditions.
 * @param conditions array of conditions to evaluate.
 * @returns true if the conditions are met, false otherwise.
 */
function shouldRender(condition = true, properties) {
	return jsonLogic.apply(condition, properties);
}

export default shouldRender;
