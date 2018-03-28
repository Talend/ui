/**
 * This class represents a filter for the elements of a schema.
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

	setActive(active) {
		this.active = active;
	}

	isActive() {
		return this.active;
	}

	/**
	 * This methods indicates if an element of a schema is visible or not.
	 * When returns true, the element is visible (not filtered).
	 */
	select(dataAccessor, schema, element) {
		return true;
	}
}
