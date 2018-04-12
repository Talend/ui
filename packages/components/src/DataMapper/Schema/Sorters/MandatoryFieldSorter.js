import Sorter from './Sorter';

export const ID = 'mandatory-field-sorter';

/**
 * A sorter which .
 */
export default class MandatoryFieldSorter extends Sorter {
	constructor(active, order) {
		super(ID, active, order);
	}

  compare(dataAccessor, element1, element2) {
		const mandatory1 = dataAccessor.isElementMandatory(element1);
    const mandatory2 = dataAccessor.isElementMandatory(element2);
    if (mandatory1 && !mandatory2) {
      return -1 * this.coef;
    } else if (!mandatory1 && mandatory2) {
      return this.coef;
    }
    return 0;
	}

}
