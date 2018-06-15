import Filter from './Filter';

/**
 * This is used to filter boolean values.
 * Default behaviour is: true value is not filtered, false value is filtered.
 * You can reverse this behaviour with the 'reverse' attribute set to true.
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

	setReverse(reverse) {
		this.reverse = reverse;
	}

	selectValue(value) {
		const boolVal = Boolean(value);
		return (!this.reverse && boolVal) || (this.reverse && !boolVal);
	}
}
