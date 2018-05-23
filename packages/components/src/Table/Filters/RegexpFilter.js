import Filter from './Filter';

function isString(regexp) {
	return typeof regexp === 'string';
}

function lowerCaseMatch(value, regexp) {
	return value.toLowerCase().match(regexp.toLowerCase());
}

/**
 * A filter based on a regular expression.
 */
export default class RegexpFilter extends Filter {
	constructor(id, key, active, strict) {
		super(id, key, active);
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
		return (
			value.match(this.regexp) ||
			(!this.strict && isString(this.regexp) && lowerCaseMatch(value, this.regexp))
		);
	}
}
