export const Order = {
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
};

function getCoef(order) {
	if (order === Order.DESCENDING) {
		return -1;
	}
	return 1;
}

/**
 * This class represents a sorter for the elements of a table.
 * A sorter is identified by a unique string identifier.
 * This class is intended to be subclassed.
 */
export default class Sorter {

	constructor(id, label, icon, order, key) {
		this.id = id;
		this.label = label;
		this.icon = icon;
		this.order = order;
		this.key = key;
		this.coef = getCoef(order);
	}

	getId() {
		return this.id;
	}

	getLabel() {
		return this.label;
	}

	getIcon() {
		return this.icon;
	}

	getOrder() {
		return this.order;
	}

	setOrder(order) {
		this.order = order;
		this.coef = getCoef(order);
	}

	compareStrings(val1, val2) {
		return val1 < val2 ? -1 * this.coef : val1 > val2 ? this.coef : 0;
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
