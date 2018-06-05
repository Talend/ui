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
	constructor(id, label, key, icons) {
		this.id = id;
		this.label = label;
		this.order = Order.NONE;
		this.key = key;
		this.icons = icons ? icons : {};
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
		return this.icons[this.order];
	}

	setOrder(order) {
		this.order = order;
	}

	compareStrings(val1, val2) {
		const coef = coefs[this.order];
		return val1 < val2 ? -1 * coef : val1 > val2 ? coef : 0;
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
