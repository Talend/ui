import Sorter, { Order } from './Sorter';
import * as TestData from '../TestData';

const elements = [
	TestData.firstname,
	TestData.lastname,
	TestData.birthday,
	TestData.address,
];

const dataAccessor = TestData.rowDataGetter;

const sorterId = 'name-sorter';

const LT = -1;
const EQ = 0;
const GT = 1;

it('name-sorter', () => {

  const sorter = new Sorter(sorterId, 'name', TestData.Columns.NAME.key);
  sorter.setOrder(Order.ASCENDING);

  // Firstname < Lastname
  expect(sorter.compare(dataAccessor, elements[0], elements[1])).toBe(LT);
  // Lastname > Birthday
  expect(sorter.compare(dataAccessor, elements[1], elements[2])).toBe(GT);
  // Birthday > Address
  expect(sorter.compare(dataAccessor, elements[2], elements[3])).toBe(GT);
  // Address < Firstname
  expect(sorter.compare(dataAccessor, elements[3], elements[0])).toBe(LT);
  // Firstname = Firstname
  expect(sorter.compare(dataAccessor, elements[0], elements[0])).toBe(EQ);

  sorter.setOrder(Order.DESCENDING);

  // Firstname > Lastname
  expect(sorter.compare(dataAccessor, elements[0], elements[1])).toBe(GT);
  // Lastname < Birthday
  expect(sorter.compare(dataAccessor, elements[1], elements[2])).toBe(LT);
  // Birthday < Address
  expect(sorter.compare(dataAccessor, elements[2], elements[3])).toBe(LT);
  // Address > Firstname
  expect(sorter.compare(dataAccessor, elements[3], elements[0])).toBe(GT);
  // Firstname = Firstname
  expect(sorter.compare(dataAccessor, elements[0], elements[0])).toBe(EQ);

  sorter.setOrder(Order.NONE);

  expect(sorter.compare(dataAccessor, elements[0], elements[1])).toBe(EQ);
  expect(sorter.compare(dataAccessor, elements[1], elements[2])).toBe(EQ);
  expect(sorter.compare(dataAccessor, elements[2], elements[3])).toBe(EQ);
  expect(sorter.compare(dataAccessor, elements[3], elements[0])).toBe(EQ);

});
