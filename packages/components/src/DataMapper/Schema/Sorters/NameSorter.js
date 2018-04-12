import Sorter from './Sorter';

export const ID = 'name-sorter';

/**
 * A sorter based on the name of elements. .
 */
export default class NameSorter extends Sorter {
	constructor(active, order) {
		super(ID, active, order);
	}

	getValueToCompare(dataAccessor, element) {
		return dataAccessor.getElementName(element);
	}
}
