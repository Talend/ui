import get from 'lodash/get';
import findIndex from 'lodash/findIndex';

/**
 * Tries to ensure the returned value is a number.
 * It supports string and number for now.
 */
function stringOrNumberToNumber(value) {
	if (typeof value === 'number') {
		return value;
	}
	if (typeof value === 'string') {
		return Number(value);
	}
	const error = { error: 'the passed value is not a string or a number', value };
	throw error;
}

/**
 * Tries to make the returned value a string.
 * It supports number and string as input.
 * In case of an error it will call onError. By default it throws an exception.
 */
function stringOrNumberToString(
	value,
	onError = val => {
		const error = { error: 'the passed value is not a string or a number', value: val };
		throw error;
	},
) {
	if (!value) {
		return value;
	}
	if (typeof value === 'number') {
		return JSON.stringify(value);
	}
	if (typeof value === 'string') {
		return value.toString();
	}
	return onError(value);
}

/**
 * "foo=bar;dummy=1" will return [{foo:"bar",dummy:"1"}]
 */
function parseParameters(parameterString) {
	return parameterString
		.split(';')
		.map(it => it.trim())
		.filter(it => it.length > 0)
		.map(it => {
			const sep = it.indexOf('=');
			if (sep > 0) {
				return {
					[it.substring(0, sep).trim()]: it.substring(sep + 1, it.length).trim(),
				};
			}
			return {
				value: it.trim(),
			};
		})
		.reduce(
			(a, v) => ({
				...a,
				...v,
			}),
			{},
		);
}

/**
 * parses a strategy based on this pattern "name(parameters)" and returns
 * an object containing { name, params }.
 */
function parseStrategy(strategy) {
	if (!strategy) {
		return strategy;
	}

	const start = strategy.indexOf('(');
	if (start > 0) {
		const end = strategy.indexOf(')', start);
		if (end > 0) {
			return {
				name: strategy.substring(0, start).toLowerCase(),
				params: parseParameters(strategy.substring(start + 1, end)),
			};
		}
	}
	return {
		name: strategy.toLowerCase(),
		params: {},
	};
}

function areEqualsAsNumbers(expected, actualStringOrNumber) {
	return expected === stringOrNumberToNumber(actualStringOrNumber);
}

function containsString(expected, actualStringOrNumber, valueProcessor = v => v) {
	return (
		actualStringOrNumber &&
		valueProcessor(stringOrNumberToString(actualStringOrNumber)).includes(expected)
	);
}

// this will not fail in case actualStringOrNumber is not a string or number
// but will return false sinc eit is used as a fallback comparison using coercing
function areEqualsAsString(expected, actualStringOrNumber) {
	return actualStringOrNumber && stringOrNumberToString(actualStringOrNumber, v => v) === expected;
}

/**
 * For an array or a string if compares the expected value to its length.
 */
function toLengthEvaluator(value) {
	if (value && value.length) {
		const length = value.length;
		return expected => areEqualsAsNumbers(length, expected);
	}
	return expected => areEqualsAsNumbers(0, expected);
}

/**
 * If an array it checks if the expected element is present in the array.
 * If a string it checks the expected token is present in the string.
 *
 * It accepts the <code>lowercase</code> option to do a test using the
 * lowercased value of the actual value.
 */
function toContainsEvaluator(actual, options) {
	if (!actual) {
		return () => false;
	}
	if (Array.isArray(actual)) {
		if (options.lowercase === 'true') {
			return expected => actual.map(it => it.toLowerCase()).indexOf(expected) >= 0;
		}
		return expected => actual.indexOf(expected) >= 0;
	}
	if (options.lowercase === 'true') {
		// allows case insensitve comparison
		return expected => containsString(expected, actual, v => v.toLowerCase());
	}
	return expected => containsString(expected, actual);
}

/**
 * compare actual value to the expected one thanks to === operator
 * or tries a string comparison if possible.
 */
function toDefaultEvaluator(value) {
	return expected => value === expected || areEqualsAsString(expected, value);
}

const evaluatorRegistry = {
	length: value => toLengthEvaluator(value),
	contains: (value, config) => toContainsEvaluator(value, config),
	default: value => toDefaultEvaluator(value),
};

function evaluateInlineCondition(properties, condition) {
	if (!condition.path || !condition.values) {
		return true;
	}

	const strategyConfig = parseStrategy(condition.strategy) || { name: 'default' };
	const value = get(properties, condition.path);
	const evaluator = evaluatorRegistry[strategyConfig.name](value, strategyConfig.params);
	return (condition.shouldBe !== false) === findIndex(condition.values, evaluator) >= 0;
}

function evaluateChildrenCondition(properties, condition) {
	if (!condition.children || condition.children.length === 0) {
		return true;
	}
	const evaluator =
		(condition.childrenOperator || 'AND').toUpperCase() === 'AND'
			? Array.prototype.every
			: Array.prototype.some;
	return evaluator.call(
		condition.children,
		cond =>
			evaluateInlineCondition(properties, cond) && evaluateChildrenCondition(properties, cond),
	);
}

/**
 * Evaluate a list (array) of conditions against a contextual set of values (properties).
 * Condition specification is done through objects with the following attributes:
 * <ul>
 *   <li><em>values</em> (required): list of values compared to the evaluated value</li>
 *   <li><em>path</em> (required): the path used to extract the value from properties
 *   to use to compare to values</li>
 *   <li><em>shouldBe</em> (optional): should the evaluation activate this widget when
 *   true (default) or false (when shouldBe = true).</li>
 *   <li><em>strategy</em> (optional): by default the property value extraction
 *   just uses the path, but for some cases like array you can want some more advanced strategy
 *   like extracting the length. For such cases, there are some <code>evaluationStrategy</code>.
 *   Currently you can set this property to <code>length</code> to evaluate the length of an array
 *   when the extracted instance is an array, otherwise it will set the value to zero. Other
 *   strategy values will just return false.</li>
 *   <li><em>children</em>: an array of nested conditions</li>
 *   <li><em>childrenOperator</em>: how to combine children (OR/AND)</li>
 * </ul>
 *
 * @example {
 *   values:["A", "B"],
 *   path: "someProp.someArray",
 *   shouldBe: true,
 *   evaluationStrategy: "length",
 *   children: [],
 *   childrenOperator: "OR",
 * }
 *
 * The combination of the conditions is done through an <code>AND</code>
 * whereas, for a single condition, the test against <code>values</code>
 * is an <code>includes</code> (<code>OR</code>).
 *
 * @param properties source of the value provider to evaluate conditions.
 * @param conditions array of conditions to evaluate.
 * @returns true if the conditions are met, false otherwise.
 */
function shouldRender(condition, properties) {
	if (!condition) {
		return true;
	}

	// quit fast condition (don't evaluate the whole graph)
	if (!evaluateInlineCondition(properties, condition)) {
		return false;
	}

	// navigate the nested graph
	return evaluateChildrenCondition(properties, condition);
}

export const $internals = {
	parseParameters,
	parseStrategy,
};

export default shouldRender;
