import Filter from './Filter';

function isString(regexp) {
	return typeof regexp === 'string';
}

function lowerCaseMatch(value, regexp) {
	return value.toLowerCase().match(regexp);
}

/**
 * This is used to filter string values based on regular expression.
 * Default behaviour is: if a string value matches the regexp, then it is not filtered.
 */
export default class RegexpFilter extends Filter {
	/**
	 * @param {string} id - filter identifier, must be unique
	 * @param {string} key - identify the column of data which will be filtered by this filter
	 * @param {boolean} active - state of the filter
	 * @param {boolean} strict - used to specify the matching behaviour.
	 *
	 * When 'strict' is true, the pattern matching is done with the strict string values.
	 * When 'strict' is false, the pattern matching is done with lower case string values.
	 */
	constructor(id, key, active, strict) {
		super(id, key, active);
		this.strict = strict;
	}

	setStrict(strict) {
		this.strict = strict;
	}

	setRegexp(regexp) {
		this.regexp = regexp;
	}

	setValue(value) {
		this.setRegexp(value);
	}

	getRegexp() {
		return this.regexp;
	}

	getValue() {
		return this.getRegexp();
	}

	selectValue(value) {
		return Boolean(
			value.match(this.regexp) ||
			(!this.strict && isString(this.regexp) && lowerCaseMatch(value, this.regexp))
		);
	}
}
