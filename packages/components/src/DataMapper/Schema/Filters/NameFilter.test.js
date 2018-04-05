import NameFilter from './NameFilter';
import * as TestData from './TestData';
import DefaultDataAccessor from '../../DefaultDataAccessor';
import DataAccessorWrapper from '../../DataAccessorWrapper';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

it('name-filter', () => {

  const schema = TestData.schema;
  const filter = new NameFilter(false);
  dataAccessor.addFilter(schema, filter);

  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITH)).toBe(4);
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITHOUT)).toBe(4);

  filter.setActive(true);
  filter.setName('name');
  dataAccessor.filterSchema(schema, filter.getId());
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITH)).toBe(2);
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITHOUT)).toBe(4);

  filter.setName('day');
  dataAccessor.filterSchema(schema, filter.getId());
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITH)).toBe(1);
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITHOUT)).toBe(4);

  filter.setActive(false);
  dataAccessor.filterSchema(schema, filter.getId());
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITH)).toBe(4);
  expect(dataAccessor.getSchemaSize(schema, TestData.Filters.WITHOUT)).toBe(4);

});
