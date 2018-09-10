import get from 'lodash/get';
import findIndex from 'lodash/findIndex';

const STRATEGY_PATTERN = /^([a-zA-Z]{1}\w*)(?:\((.+)?\))?$/;
const DEFAULT_STRATEGY = { name: 'default' };

/**
 * @param value the value that is not correct
 * @param message Error param
 * @param filename Error param
 * @param linenum Error param
 * @return instance of ValueError
 */
function ValueError(value, message, filename, linenum) {
	const instance = new Error(message, filename, linenum);
	instance.value = value;
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if (Error.captureStackTrace) {
		Error.captureStackTrace(instance, ValueError);
	}
	return instance;
}

ValueError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: Error,
		enumerable: false,
		writable: true,
		configurable: true,
	},
});
Object.setPrototypeOf(ValueError, Error);

/**
 * Tries to ensure the returned value is a number.
 * It supports string and number for now.
 */
function stringOrNumberToNumber(value) {
	let number;
	if (typeof value === 'number') {
		number = value;
	} else if (typeof value === 'string') {
		number = parseInt(value, 10); // 0xF
	}
	if (number === undefined || isNaN(number)) {
		throw new ValueError(value, 'Value is not a string or a number');
	}
	return number;
}

/**
 * Tries to make the returned value a string.
 * It supports number and string as input.
 * In case of an error it will call onError. By default it throws an exception.
 */
function stringOrNumberToString(
	value,
	onError = val => {
		throw new ValueError(val, 'Value is not a string or a number');
	},
) {
	if (!value) {
		return value;
	}
	if (typeof value === 'number') {
		return JSON.stringify(value);
	}
	if (typeof value === 'string') {
		return value;
	}
	return onError(value);
}

/**
 * @param {string} parameterString 'foo=bar;dummy=1'
 * @return {Object} parameters
 * @example
 parseParameters('foo=bar;dummy=1') == { foo: 'bar', dummy: '1' }
 */
function parseParameters(parameterString = '') {
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
			return { value: it.trim() };
		})
		.reduce((a, v) => ({ ...a, ...v }), {});
}

/**
 * parses a strategy based on this pattern "name(parameters)" and returns
 * an object containing { name, params }.
 * @param {string} strategy "contains(lowercase=true)"
 * @return {Object} { name: 'contains', params: { lowercase: 'true' }}
 */
function parseStrategy(strategy) {
	if (!strategy) {
		return DEFAULT_STRATEGY;
	}

	const matches = strategy.match(STRATEGY_PATTERN);
	const isMatching = matches !== undefined;

	const name = isMatching ? matches[1] : strategy;
	const parameters = isMatching ? matches[2] : undefined;

	const hasParameters = parameters !== undefined;
	return {
		name: name.toLowerCase(),
		params: hasParameters ? parseParameters(parameters) : {},
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
	if (actualStringOrNumber === expected) {
		return true;
	}
	return actualStringOrNumber && stringOrNumberToString(actualStringOrNumber, v => v) === expected;
}

/**
 * For an array or a string it compares the expected value to its length.
 */
function toLengthEvaluator(value) {
	const length = get(value, 'length', 0);
	return expected => areEqualsAsNumbers(length, expected);
}

const LOWER_CASE_TRUE = 'true';

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
		if (options.lowercase === LOWER_CASE_TRUE) {
			return expected => actual.map(it => it.toLowerCase()).indexOf(expected) >= 0;
		}
		return expected => actual.indexOf(expected) >= 0;
	}
	if (options.lowercase === LOWER_CASE_TRUE) {
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
	return expected => areEqualsAsString(expected, value);
}

const evaluatorRegistry = {
	length: value => toLengthEvaluator(value),
	contains: (value, config) => toContainsEvaluator(value, config),
	default: value => toDefaultEvaluator(value),
};

function evaluateInlineCondition(condition, properties) {
	if (!condition.path || !condition.values) {
		return true;
	}

	const strategyConfig = parseStrategy(condition.strategy);
	const value = get(properties, condition.path);
	const evaluator = evaluatorRegistry[strategyConfig.name](value, strategyConfig.params);
	return (condition.shouldBe !== false) === findIndex(condition.values, evaluator) >= 0;
}

function evaluateChildrenCondition(condition, properties) {
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
			evaluateInlineCondition(cond, properties) && evaluateChildrenCondition(cond, properties),
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
	if (!evaluateInlineCondition(condition, properties)) {
		return false;
	}

	// navigate the nested graph
	return evaluateChildrenCondition(condition, properties);
}

export const $internals = {
	parseParameters,
	parseStrategy,
	DEFAULT_STRATEGY,
};

export default shouldRender;
