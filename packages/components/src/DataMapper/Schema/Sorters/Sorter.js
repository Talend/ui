
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
 * This class represents a sorter for the elements of a schema.
 * A sorter is identified by a unique string identifier.
 * A sorter can be activated or deactivated.
 * This class is intended to be subclassed.
 */
export default class Sorter {

  constructor(id, active, order) {
		this.id = id;
		this.active = active;
    this.order = order;
    this.coef = getCoef(order);
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

  getOrder() {
    return this.order;
  }

  setOrder(order) {
    this.order = order;
    this.coef = getCoef(order);
  }

  compareStrings(val1, val2) {
    return (
      val1 < val2 ? -1 * this.coef : ( val1 > val2 ? this.coef : 0 )
    );
  }

  getValueToCompare(dataAccessor, element) {
    return element.toString();
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
