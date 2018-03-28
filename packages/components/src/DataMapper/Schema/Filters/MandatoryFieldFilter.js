import Filter from './Filter';

export const ID = 'mandatory-field-filter';

export default class MandatoryFieldFilter extends Filter {

  constructor(active) {
    super(ID, active);
  }

  select(dataAccessor, schema, element) {
    if (this.active) {
      return dataAccessor.isElementMandatory(element);
    }
    return true;
  }

}
