import RegexpFilter from './RegexpFilter';
import * as TestData from '../TestData';

const elements = [
	TestData.firstname,
	TestData.lastname,
	TestData.birthday,
	TestData.address,
];

const dataAccessor = TestData.rowDataGetter;

const filterId = 'regexp-filter';

function checkFilter(dataAccessor, filter, elements, selected) {
  for (let i = 0; i < elements.length; i += 1) {
    expect(filter.select(dataAccessor, elements[i])).toBe(selected[i]);
  }
}

it('regexp-filter', () => {

  const filter = new RegexpFilter(filterId, TestData.Columns.NAME.key, false, false);

  checkFilter(dataAccessor, filter, elements, [true, true, true, true]);

  filter.setActive(true);
  expect(filter.isActive()).toBe(true);
  checkFilter(dataAccessor, filter, elements, [true, true, true, true]);

  filter.setValue('name');
  checkFilter(dataAccessor, filter, elements, [true, true, false, false]);

  filter.setValue('last');
  checkFilter(dataAccessor, filter, elements, [false, true, false, false]);

  filter.setStrict(true);
  checkFilter(dataAccessor, filter, elements, [false, false, false, false]);

  filter.setValue('Last');
  checkFilter(dataAccessor, filter, elements, [false, true, false, false]);

  filter.setStrict(false);
  checkFilter(dataAccessor, filter, elements, [false, true, false, false]);

  filter.setActive(false);
  expect(filter.isActive()).toBe(false);
  checkFilter(dataAccessor, filter, elements, [true, true, true, true]);

});
