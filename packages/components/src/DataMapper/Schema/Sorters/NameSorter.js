import Sorter from './Sorter';

export const ID = 'name-sorter';

/**
 * A sorter based on the name of elements. .
 */
export default class NameSorter extends Sorter {
	constructor(order) {
		super(ID, 'Sort by name', 'talend-sort-az', order);
	}

	getValueToCompare(dataAccessor, element) {
		return dataAccessor.getElementName(element);
	}
}
