import DataAccessorWithSorterAndFilter from './DataAccessorWithSorterAndFilter';
import TableConfiguration from '../TableConfiguration';

const NAME = 'name';
const TYPE = 'type';
const DESC = 'description';
const MAND = 'mandatory';

const element1 = {
	id: 'elem_1',
	name: 'Firstname',
	type: 'string',
	description: 'The firstname of the customer (optional)',
	mandatory: false,
};

const element2 = {
	id: 'elem_2',
	name: 'Lastname',
	type: 'string',
	description: 'The lastname of the customer (mandatory)',
	mandatory: true,
};

const element3 = {
	id: 'elem_3',
	name: 'Birthday',
	type: 'date',
	description: 'The birthday of the customer (optional)',
	mandatory: false,
};

const element4 = {
	id: 'elem_4',
	name: 'Address',
	type: 'address',
	description: 'The address of the customer (mandatory)',
	mandatory: true,
};

const elements = [element1, element2, element3, element4];

it('data-accessor', () => {

  const dataAccessor = new DataAccessorWithSorterAndFilter(elements, TableConfiguration.rowDataGetter);

  expect(dataAccessor.getSize()).toBe(4);

  const element = dataAccessor.getElement(0);
  expect(dataAccessor.getElementId(element)).toBe(element1.id);
  expect(dataAccessor.getElementIndex(element)).toBe(0);


/*
	const element = dataAccessor.getSchemaElement(schema, 0);
	expect(dataAccessor.getElementId(element)).toBe(TestData.element1.id);
	expect(dataAccessor.getElementName(element)).toBe(TestData.element1.name);
	expect(dataAccessor.getElementType(element)).toBe(TestData.element1.type);
	expect(dataAccessor.getElementDescription(element)).toBe(TestData.element1.description);
	expect(dataAccessor.isElementMandatory(element)).toBe(false);
	expect(dataAccessor.getSchemaElementIndex(schema, element)).toBe(0);
*/
});
