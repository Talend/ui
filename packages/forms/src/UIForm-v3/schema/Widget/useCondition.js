/* eslint-disable no-use-before-define */
import { useMemo, useState, useEffect } from 'react';
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
	if (typeof condition !== 'object') {
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
function evalCondition(condition, properties, key) {
	if (condition === undefined) {
		return true;
	}
	const runtimeCondition = resolveArrayNotation(condition, key);
	return jsonLogic.apply(runtimeCondition, properties);
}

function getConditionVars(condition) {
	if (!condition) {
		return [];
	}

	if (Array.isArray(condition)) {
		return condition.reduce((accu, item) => accu.concat(getConditionVars(item)), []);
	} else if (typeof condition === 'object') {
		return Object.entries(condition).reduce((accu, [key, value]) => {
			if (key === 'var') {
				return accu.concat(value);
			}
			return accu.concat(getConditionVars(value));
		}, []);
	}
	return [];
}
export default function useCondition({ condition, rhf, schema }) {
	const [shouldRender, setShouldRender] = useState(true);
	const conditionVars = useMemo(() => getConditionVars(condition), [condition]);
	conditionVars.forEach(conditionVar => rhf.watch(conditionVar));

	useEffect(() => {
		const values = rhf.getValues({ nest: true });
		setShouldRender(evalCondition(condition, values, schema));
	}, [condition, rhf]);

	return shouldRender;
}
