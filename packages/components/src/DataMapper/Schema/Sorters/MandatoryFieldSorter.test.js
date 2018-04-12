import { Order } from './Sorter';
import MandatoryFieldSorter from './MandatoryFieldSorter';
import * as TestData from './TestData';
import DefaultDataAccessor from '../../DefaultDataAccessor';
import DataAccessorWrapper from '../../DataAccessorWrapper';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

function checkNames(dataAccessor, schema, names) {
  for (let i = 0; i < names.length; i += 1) {
    let element = dataAccessor.getSchemaElement(schema, i, true);
    expect(dataAccessor.getElementName(element)).toBe(names[i]);
  }
}

it('mandatory-field-sorter', () => {

  const schema = TestData.schema;

  expect(dataAccessor.hasSorter(schema)).toBe(false);

	const sorter = new MandatoryFieldSorter(false, Order.ASCENDING);
	dataAccessor.setSorter(schema, sorter);

  expect(dataAccessor.hasSorter(schema)).toBe(true);

  expect(dataAccessor.isSorterActiveOnSchema(schema)).toBe(false);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

  checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

  sorter.setActive(true);
  dataAccessor.sort(schema);

  checkNames(dataAccessor, schema, ['Lastname', 'Address', 'Firstname', 'Birthday']);

  sorter.setActive(false);
  dataAccessor.sort(schema);

  expect(dataAccessor.hasSorter(schema)).toBe(true);
  checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

  dataAccessor.clearSorter(schema);

  expect(dataAccessor.hasSorter(schema)).toBe(false);
  checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

});
