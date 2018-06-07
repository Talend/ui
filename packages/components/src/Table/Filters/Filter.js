/**
 * This class represents a filter for the elements of a table.
 * A filter is identified by a unique string identifier.
 * A filter can be activated or deactivated.
 */
export default class Filter {
	/**
	 * @param {string} id - filter unique identifier
	 * @param {string} key - the key used to get values from data accessor
	 * @param {boolean} active - Initial state of the filter
	 */
	constructor(id, key, active) {
		this.id = id;
		this.key = key;
		this.active = active;
	}

	getId() {
		return this.id;
	}

	getKey() {
		return this.key;
	}

	/**
	 * Set the filter active or inactive.
	 * @param {boolean} active
	 */
	setActive(active) {
		this.active = active;
	}

	/**
	 * Indicates if the filter is active or not.
	 */
	isActive() {
		return this.active;
	}

	/**
	 * This methods indicates if an element of a list is visible or not.
	 * When returns true, the element is visible (not filtered).
	 * @param {object} dataAccessor - element data getter
	 * @param {object} element - an element of the table
	 */
	select(dataAccessor, element) {
		if (this.isActive()) {
			const value = dataAccessor.getRowData(element, this.key);
			return this.selectValue(value);
		}
		return true;
	}

	selectValue(value) {
		return Boolean(value);
	}
}
