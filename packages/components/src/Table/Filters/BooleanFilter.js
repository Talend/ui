import Filter from './Filter';

/**
 * A filter based on a boolean.
 */
export default class BooleanFilter extends Filter {
	constructor(id, key, active, reverse) {
		super(id, key, active);
		this.reverse = reverse;
	}

	selectValue(value) {
		return !this.isActive() || (!this.reverse && value) || (this.reverse && !value);
	}
}
