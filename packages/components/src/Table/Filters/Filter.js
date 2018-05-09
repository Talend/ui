/**
 * This class represents a filter for the elements of a table.
 * A filter is identified by a unique string identifier.
 * A filter can be activated or deactivated.
 * This class is intended to be subclassed.
 */
export default class Filter {
	constructor(id, active) {
		this.id = id;
		this.active = active;
	}

	getId() {
		return this.id;
	}

	/**
	 * Set active or inactive the current filter.
	 * @param {boolean} active
	 */
	setActive(active) {
		this.active = active;
	}

	isActive() {
		return this.active;
	}

	/**
	 * This methods indicates if an element of a list is visible or not.
	 * When returns true, the element is visible (not filtered).
	 * @param {object} dataAccessor - element data getter
	 * @param {object} element - an element of the table
	 */
	select() {
		return !this.active;
	}
}
