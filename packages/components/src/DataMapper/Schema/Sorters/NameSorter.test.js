import { Order } from './Sorter';
import NameSorter from './NameSorter';
import NameFilter from '../Filters/NameFilter';
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

it('name-sorter', () => {
	const schema = TestData.schema;

	expect(dataAccessor.hasSorter(schema)).toBe(false);

	const sorter = new NameSorter(false, Order.ASCENDING);
	dataAccessor.setSorter(schema, sorter);

	expect(dataAccessor.hasSorter(schema)).toBe(true);

	expect(dataAccessor.isSorterActiveOnSchema(schema)).toBe(false);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

	sorter.setActive(true);
	dataAccessor.sort(schema);

	expect(dataAccessor.isSorterActiveOnSchema(schema)).toBe(true);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	checkNames(dataAccessor, schema, ['Address', 'Birthday', 'Firstname', 'Lastname']);

	sorter.setOrder(Order.DESCENDING);
	dataAccessor.sort(schema);

	expect(dataAccessor.isSorterActiveOnSchema(schema)).toBe(true);
	checkNames(dataAccessor, schema, ['Lastname', 'Firstname', 'Birthday', 'Address']);

	sorter.setActive(false);
	dataAccessor.sort(schema);

	expect(dataAccessor.isSorterActiveOnSchema(schema)).toBe(false);
	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

	dataAccessor.clearSorter(schema);

	expect(dataAccessor.hasSorter(schema)).toBe(false);
	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);
});

it('name-sorter-and-filter', () => {
	const schema = TestData.schema;

	const sorter = new NameSorter(false, Order.ASCENDING);
	dataAccessor.setSorter(schema, sorter);

	const filter = new NameFilter(false);
	dataAccessor.addFilter(schema, filter);

	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

	sorter.setActive(true);
	dataAccessor.sort(schema);

	checkNames(dataAccessor, schema, ['Address', 'Birthday', 'Firstname', 'Lastname']);

	sorter.setActive(false);
	dataAccessor.sort(schema);

	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

	filter.setActive(true);
	filter.setName('name');
	dataAccessor.filterSchema(schema, filter.getId());

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);
	checkNames(dataAccessor, schema, ['Firstname', 'Lastname']);

	sorter.setActive(true);
	sorter.setOrder(Order.DESCENDING);
	dataAccessor.sort(schema);

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);
	checkNames(dataAccessor, schema, ['Lastname', 'Firstname']);

	filter.setName('d');
	dataAccessor.filterSchema(schema, filter.getId());

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);
	checkNames(dataAccessor, schema, ['Birthday', 'Address']);

	sorter.setOrder(Order.ASCENDING);
	dataAccessor.sort(schema);

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);
	checkNames(dataAccessor, schema, ['Address', 'Birthday']);

	filter.setActive(false);
	dataAccessor.filterSchema(schema, filter.getId());

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);
	checkNames(dataAccessor, schema, ['Address', 'Birthday', 'Firstname', 'Lastname']);

	sorter.setActive(false);
	dataAccessor.sort(schema);

	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);

	dataAccessor.removeFilter(schema, filter);

	expect(dataAccessor.hasSorter(schema)).toBe(true);

	sorter.setActive(true);
	dataAccessor.sort(schema);

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);
	checkNames(dataAccessor, schema, ['Address', 'Birthday', 'Firstname', 'Lastname']);

	dataAccessor.clearSorter(schema);

	expect(dataAccessor.hasSorter(schema)).toBe(false);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);
	checkNames(dataAccessor, schema, ['Firstname', 'Lastname', 'Birthday', 'Address']);
});
