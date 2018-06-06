import Filter from './Filter';

/**
 * A filter based on a boolean.
 */
export default class BooleanFilter extends Filter {
	/**
	 * @param {string} id - the filter identifier
	 * @param {string} key - the key used to get boolean values from data accessor.
	 * @param {boolean} active - Initial state of the filter
	 * @param {boolean} reverse - allow to reverse the filter behaviour	 
	 */
	constructor(id, key, active, reverse) {
		super(id, key, active);
		this.reverse = reverse;
	}

	selectValue(value) {
		return !this.isActive() || (!this.reverse && value) || (this.reverse && !value);
	}
}
