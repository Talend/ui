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
const GROWING_OPERATORS = new Set(['merge', 'cat']);

function isObject(value) {
	return value !== null && typeof value === 'object';
}

/**
 * Conditions come from (possibly remote) data and are evaluated synchronously on the main thread,
 * so their evaluation cost must stay a small function of their textual size:
 * - the number of nodes and the nesting depth are capped,
 * - iteration operators (map, filter, reduce, all, none, some) can only be nested a few times,
 *   otherwise the cost is exponential in the nesting depth,
 * - a reduce reinjects its result in the next step, so its logic cannot grow the accumulator
 *   (merge, cat, arrays built from non-literal values), otherwise it doubles at each step.
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
		if (inReduceLogic && GROWING_OPERATORS.has(operator)) {
			return false;
		}
		const nextIterations = ITERATION_OPERATORS.has(operator) ? iterations + 1 : iterations;
		if (nextIterations > MAX_ITERATION_NESTING) {
			return false;
		}
		const args = Array.isArray(node[operator]) ? node[operator] : [node[operator]];
		nodes += 1;
		return args.every((arg, index) =>
			visit(
				arg,
				depth + 1,
				nextIterations,
				inReduceLogic || (operator === 'reduce' && index === 1),
			),
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
