/* eslint-disable @typescript-eslint/no-use-before-define */
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
	throw new TypeError(`${a.toString()} is not a number`);
}

jsonLogic.add_operation('lowercase', lowercase);
jsonLogic.add_operation('toNumber', toNumber);

/**
 * If in the path [] appears it will be populated
 * with current key indices value.
 */
function replaceArrayNotationByIndexes(path, key) {
	if (!path || !path.includes('[]')) {
		return path;
	}
	return path
		.split(/\.|\[/)
		.map((part, index) => {
			if (part === ']') {
				return key[index];
			}
			return part;
		})
		.join('.');
}

/**
 * For all "var" condition, populate generic indices ([]) from key indices.
 */
function resolveConditionVar(item, key) {
	if (!item || typeof item !== 'object') {
		return item;
	} else if (item.var) {
		if (item.var.includes('[]')) {
			return {
				...item,
				var: replaceArrayNotationByIndexes(item.var, key),
			};
		}
		return item;
	} else if (Array.isArray(item)) {
		return item.map(it => resolveArrayNotation(it, key));
	}
	return resolveArrayNotation(item, key);
}

/**
 * Ensure generic indices ([]) are populated from the key.
 * It is a recursive implementation to support any kind of condition.
 */
function resolveArrayNotation(condition, key) {
	if (!condition || typeof condition !== 'object') {
		return condition;
	}

	const acc = {};
	Object.keys(condition).forEach(attribute => {
		const value = condition[attribute];
		if (Array.isArray(value)) {
			acc[attribute] = value.map(it => resolveConditionVar(it, key));
		} else {
			acc[attribute] = resolveConditionVar(value, key);
		}
		return acc;
	});
	return acc;
}

const ALLOWED_OPERATORS = new Set([
	'var',
	'missing',
	'missing_some',
	'if',
	'?:',
	'==',
	'===',
	'!=',
	'!==',
	'!',
	'!!',
	'or',
	'and',
	'>',
	'>=',
	'<',
	'<=',
	'max',
	'min',
	'+',
	'-',
	'*',
	'/',
	'%',
	'map',
	'filter',
	'reduce',
	'all',
	'none',
	'some',
	'merge',
	'in',
	'cat',
	'substr',
	'lowercase',
	'toNumber',
]);

const FORBIDDEN_PATH_PARTS = new Set(['__proto__', 'constructor', 'prototype']);

function isUnsafePath(path) {
	if (typeof path !== 'string') {
		return false;
	}
	return path.split(/[.[\]]/).some(part => FORBIDDEN_PATH_PARTS.has(part));
}

/**
 * Conditions come from (possibly remote) data: only allow-listed operators
 * and safe variable paths can be evaluated.
 */
function isSafeCondition(condition) {
	if (Array.isArray(condition)) {
		return condition.every(isSafeCondition);
	}
	if (!condition || typeof condition !== 'object') {
		return true;
	}
	const keys = Object.keys(condition);
	if (keys.length !== 1) {
		return keys.length === 0;
	}
	const [operator] = keys;
	if (!ALLOWED_OPERATORS.has(operator)) {
		return false;
	}
	const args = condition[operator];
	if (['var', 'missing', 'missing_some'].includes(operator)) {
		const paths = Array.isArray(args) ? args : [args];
		const toCheck = operator === 'missing_some' ? [].concat(paths[1] || []) : paths;
		if (toCheck.some(isUnsafePath)) {
			return false;
		}
	}
	return isSafeCondition(args);
}

const MAX_CONDITION_NODES = 500;
const MAX_CONDITION_DEPTH = 20;
const MAX_ITERATION_NESTING = 2;
const ITERATION_OPERATORS = new Set(['map', 'filter', 'reduce', 'all', 'none', 'some']);
const GROWING_OPERATORS = new Set(['merge', 'cat', 'missing', 'missing_some']);
const SCANNING_OPERATORS = new Set(['in']);
// operators that coerce their operands (String(array), parseFloat, toLowerCase...): O(size) per call
const COERCING_OPERATORS = new Set([
	'==',
	'!=',
	'>',
	'>=',
	'<',
	'<=',
	'+',
	'-',
	'*',
	'/',
	'%',
	'max',
	'min',
	'substr',
	'lowercase',
	'toNumber',
]);
// operators whose result is always a boolean or a number, whatever their operands
const SCALAR_RESULT_OPERATORS = new Set([
	'==',
	'===',
	'!=',
	'!==',
	'!',
	'!!',
	'>',
	'>=',
	'<',
	'<=',
	'max',
	'min',
	'+',
	'-',
	'*',
	'/',
	'%',
	'toNumber',
]);

function isObject(value) {
	return value !== null && typeof value === 'object';
}

function getOperator(node) {
	const keys = isObject(node) && !Array.isArray(node) ? Object.keys(node) : [];
	return keys.length === 1 ? keys[0] : undefined;
}

function toArgs(args) {
	return Array.isArray(args) ? args : [args];
}

/**
 * Whether the node applies an operator that coerces its operands, which costs the size of the
 * operands (a var path computed from the data is stringified too).
 */
function hasCoercingOperator(node) {
	if (Array.isArray(node)) {
		return node.some(hasCoercingOperator);
	}
	const operator = getOperator(node);
	if (operator === undefined) {
		return false;
	}
	if (COERCING_OPERATORS.has(operator) || (operator === 'var' && isObject(node.var))) {
		return true;
	}
	return toArgs(node[operator]).some(hasCoercingOperator);
}

/**
 * Whether the node can only evaluate to a scalar (boolean, number or literal) whatever the data.
 * A non literal value (var) or a string produced by a coercion could be as big as the data.
 */
function hasScalarResult(node) {
	if (Array.isArray(node)) {
		return !node.some(isObject);
	}
	if (!isObject(node)) {
		return true;
	}
	const operator = getOperator(node);
	if (operator === undefined) {
		return Object.keys(node).length === 0;
	}
	if (SCALAR_RESULT_OPERATORS.has(operator)) {
		return true;
	}
	const args = toArgs(node[operator]);
	if (operator === 'or' || operator === 'and') {
		return args.every(hasScalarResult);
	}
	if (operator === 'if' || operator === '?:') {
		// even positions but the last one are the conditions, they are not part of the result
		return args.every(
			(arg, index) => (index % 2 === 0 && index < args.length - 1) || hasScalarResult(arg),
		);
	}
	return false;
}

/**
 * A reduce logic coercing its operands costs the size of the accumulator at each step.
 * It is only affordable when the accumulator is a scalar after the first step,
 * so the result of the logic must be a scalar.
 */
function isBoundedReduceLogic(logic) {
	return !hasCoercingOperator(logic) || hasScalarResult(logic);
}

/**
 * Conditions come from (possibly remote) data and are evaluated synchronously on the main thread,
 * so their evaluation cost must stay a small function of their textual size:
 * - the number of nodes and the nesting depth are capped,
 * - iteration operators (map, filter, reduce, all, none, some) can only be nested a few times,
 *   otherwise the cost is exponential in the nesting depth,
 * - a reduce reinjects its result in the next step, so its logic cannot grow the accumulator
 *   (merge, cat, missing, missing_some, arrays built from non-literal values), otherwise it
 *   doubles at each step,
 * - a reduce logic cannot iterate (map, filter, reduce, all, none, some) nor scan (in), otherwise
 *   it copies or walks the whole accumulator at each step, which is quadratic in the size of the
 *   data,
 * - a reduce logic that coerces its operands (==, <, +, substr...) must return a scalar, otherwise
 *   it coerces the whole accumulator at each step (e.g. String(array)) while keeping it unchanged.
 */
function isBoundedCondition(condition) {
	let nodes = 0;

	function visit(node, depth, iterations, inReduceLogic) {
		nodes += 1;
		if (nodes > MAX_CONDITION_NODES || depth > MAX_CONDITION_DEPTH) {
			return false;
		}
		if (Array.isArray(node)) {
			if (inReduceLogic && node.some(isObject)) {
				return false;
			}
			return node.every(item => visit(item, depth + 1, iterations, inReduceLogic));
		}
		if (!isObject(node)) {
			return true;
		}
		const keys = Object.keys(node);
		if (keys.length !== 1) {
			return keys.length === 0;
		}
		const [operator] = keys;
		if (
			inReduceLogic &&
			(GROWING_OPERATORS.has(operator) ||
				ITERATION_OPERATORS.has(operator) ||
				SCANNING_OPERATORS.has(operator))
		) {
			return false;
		}
		const nextIterations = ITERATION_OPERATORS.has(operator) ? iterations + 1 : iterations;
		if (nextIterations > MAX_ITERATION_NESTING) {
			return false;
		}
		const args = toArgs(node[operator]);
		nodes += 1;
		return (
			args.every((arg, index) =>
				visit(
					arg,
					depth + 1,
					nextIterations,
					inReduceLogic || (operator === 'reduce' && index === 1),
				),
			) &&
			(operator !== 'reduce' || isBoundedReduceLogic(args[1]))
		);
	}

	return visit(condition, 0, 0, false);
}

/**
 *
 * @example {
 *		'===': [{ var: 'my.path.title' }, 'Hello world'],
 * }
 *
 * @param properties source of the value provider to evaluate conditions.
 * @param condition array of conditions to evaluate.
 * @param key the widget schema key.
 * @returns true if the conditions are met, false otherwise.
 */
function shouldRender(condition, properties, key) {
	if (condition === undefined) {
		return true;
	}
	if (!isBoundedCondition(condition)) {
		return false;
	}
	const runtimeCondition = resolveArrayNotation(condition, key);
	if (!isSafeCondition(runtimeCondition)) {
		return false;
	}
	return jsonLogic.apply(runtimeCondition, properties);
}

export default shouldRender;
