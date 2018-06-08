/**
 * This defines the sorting direction.
 * NONE is used a default value, it has no effect on elements order.
 */
export const Order = {
	NONE: 'none',
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
};

const coefs = {
	none: 0,
	ascending: 1,
	descending: -1,
};

/**
 * This class represents a sorter for the elements of a table.
 * A sorter is identified by a unique string identifier.
 */
export default class Sorter {
	/**
	 * @param {string} id - the orter identifier, must be unique.
	 * @param {string} label - an optional label associated to the sorter
	 * @param {string} key - identify the column of data which will be sorted by this sorter
	 * @param {object} icons - a map [Order, icon] providing icon for each order.
	 */
	constructor(id, label, key, icons) {
		this.id = id;
		this.label = label;
		this.order = Order.NONE;
		this.key = key;
		this.icons = icons;
	}

	getId() {
		return this.id;
	}

	getLabel() {
		return this.label;
	}

	getOrder() {
		return this.order;
	}

	getKey() {
		return this.key;
	}

	getIcon() {
		return this.icons && this.icons[this.order];
	}

	setOrder(order) {
		this.order = order;
	}

	compareStrings(val1, val2) {
		const coef = coefs[this.order];
		if (val1 < val2) {
			return -1 * coef;
		} else if (val1 > val2) {
			return coef;
		}
		return 0;
	}

	getValueToCompare(dataAccessor, element) {
		return dataAccessor.getRowData(element, this.key);
	}

	/**
	 * Compares the two elements for order.
	 * Returns a negative integer, zero, or a positive integer as the
	 * first element is less than, equal to, or greater than the second.
	 */
	compare(dataAccessor, element1, element2) {
		return this.compareStrings(
			this.getValueToCompare(dataAccessor, element1),
			this.getValueToCompare(dataAccessor, element2),
		);
	}
}
