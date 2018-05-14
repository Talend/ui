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
		super(id, active);
		this.key = key;
		this.strict = strict;
	}

	setRegexp(regexp) {
		this.regexp = regexp;
	}

	getRegexp() {
		return this.regexp;
	}

	select(dataAccessor, element) {
		const value = dataAccessor.getRowData(element, key);
		return (
			value.match(this.regexp) ||
			(!this.strict && isString(this.regexp) && lowerCaseMatch(value, this.regexp))
		);
	}
}
