import DataAccessorWithSorterAndFilter from './DataAccessorWithSorterAndFilter';
import FilterFactory from '../Filters/FilterFactory';
import RegexpFilter from '../Filters/RegexpFilter';
import BooleanFilter from '../Filters/BooleanFilter';
import Sorter, { Order } from '../Sorters/Sorter';
import * as TestData from '../TestData';

const elements = [
	TestData.firstname,
	TestData.lastname,
	TestData.birthday,
	TestData.address,
];

const unknownElement = {
	id: 'elem_unknown',
	name: 'Unknown',
	type: 'unknown',
	desc: 'An unknown element',
}

const nameFilterId = 'name-filter';
const mandatoryFieldFilterId = 'mandatory-field-filter';

const nameSorterId = 'name-sorter';

function createDataAccessor() {
	return new DataAccessorWithSorterAndFilter(elements, TestData.rowDataGetter);
}

describe('Test basic methods of data accessor', () => {
	it('data-accessor', () => {

	  const dataAccessor = createDataAccessor();

	  expect(dataAccessor.getSize()).toBe(4);

	  const element1 = dataAccessor.getElement(0);
		const element1Id = dataAccessor.getElementId(element1);
	  expect(element1Id).toBe(TestData.firstname.id);
	  expect(dataAccessor.getElementIndex(element1)).toBe(0);
		expect(dataAccessor.getElementFromId(element1Id).id).toBe(element1Id);

		expect(dataAccessor.getRowData(element1, TestData.Columns.NAME.key)).toBe(TestData.firstname.name);
		expect(dataAccessor.getRowData(element1, TestData.Columns.TYPE.key)).toBe(TestData.firstname.type);
		expect(dataAccessor.getRowData(element1, TestData.Columns.DESC.key)).toBe(TestData.firstname.desc);
		expect(dataAccessor.getRowData(element1, TestData.Columns.MANDATORY.key)).toBe('');

		const elems = dataAccessor.getElements();
		expect(Array.isArray(elems)).toBe(true);
		expect(elems.length).toBe(4);

		const elem1 = elems[0];
		expect(elem1.id).toBe(TestData.firstname.id);

		expect(dataAccessor.areElementsEqual(element1, elem1)).toBe(true);

		expect(dataAccessor.includes(elems, elem1)).toBe(true);
		expect(dataAccessor.includes(elems, unknownElement)).toBe(false);
	});
});

describe('Test data accessor with a regexp filter', () => {
	it('data-accessor-name-filter', () => {

		const dataAccessor = createDataAccessor();

		expect(dataAccessor.hasFilters()).toBe(false);
		expect(dataAccessor.hasFiltersActive()).toBe(false);

		const nameFilter = new RegexpFilter(nameFilterId, TestData.Columns.NAME.key, false, false);

		dataAccessor.addFilter(nameFilter);
		expect(dataAccessor.hasFilters()).toBe(true);
		expect(dataAccessor.hasFiltersActive()).toBe(false);

		nameFilter.setActive(true);
		dataAccessor.filter(nameFilterId);
		expect(dataAccessor.hasFiltersActive()).toBe(true);

		expect(dataAccessor.getFilterVersion(nameFilterId)).toBe(1);
		expect(dataAccessor.getFiltersVersion()).toBe(1);
		expect(dataAccessor.getSize(true)).toBe(4);

		nameFilter.setValue('name');
		dataAccessor.filter(nameFilterId);

		expect(dataAccessor.getFilterVersion(nameFilterId)).toBe(2);
		expect(dataAccessor.getFiltersVersion()).toBe(2);
		expect(dataAccessor.getSize(true)).toBe(2);
		expect(dataAccessor.getSize(false)).toBe(4);
		expect(dataAccessor.isFiltered(TestData.firstname)).toBe(false);
		expect(dataAccessor.isFiltered(TestData.birthday)).toBe(true);

		nameFilter.setValue('');
		dataAccessor.filter(nameFilterId);

		expect(dataAccessor.getFilterVersion(nameFilterId)).toBe(3);
		expect(dataAccessor.getFiltersVersion()).toBe(3);
		expect(dataAccessor.getSize(true)).toBe(4);

		nameFilter.setValue('DAY');
		dataAccessor.filter(nameFilterId);

		expect(dataAccessor.getFilterVersion(nameFilterId)).toBe(4);
		expect(dataAccessor.getFiltersVersion()).toBe(4);
		expect(dataAccessor.getSize(true)).toBe(1);
		expect(dataAccessor.isFiltered(TestData.birthday)).toBe(false);

		nameFilter.setActive(false);
		dataAccessor.filter(nameFilterId);
		expect(dataAccessor.hasFiltersActive()).toBe(false);

		expect(dataAccessor.getFiltersVersion()).toBe(5);
		expect(dataAccessor.getSize(true)).toBe(4);

		nameFilter.setActive(true);
		dataAccessor.filter(nameFilterId);
		expect(dataAccessor.hasFiltersActive()).toBe(true);

		expect(dataAccessor.getFiltersVersion()).toBe(6);
		expect(dataAccessor.getSize(true)).toBe(1);

		dataAccessor.removeFilter(nameFilter);

		expect(dataAccessor.hasFiltersActive()).toBe(false);
		expect(dataAccessor.hasFilters()).toBe(false);
		expect(dataAccessor.getFilterVersion(nameFilterId)).toBe(-1);
		expect(dataAccessor.getFiltersVersion()).toBe(7);
	});
});

describe('Test data accessor with a boolean filter', () => {
	it('data-accessor-mandatory-field-filter', () => {

		const dataAccessor = createDataAccessor();

		const mandatoryFieldFilter = new BooleanFilter(mandatoryFieldFilterId, TestData.Columns.MANDATORY.key, false, false);

		dataAccessor.addFilter(mandatoryFieldFilter);

		expect(dataAccessor.hasFilters()).toBe(true);
		expect(dataAccessor.hasFiltersActive()).toBe(false);
		expect(dataAccessor.getFilterVersion(mandatoryFieldFilterId)).toBe(0);
		expect(dataAccessor.getFiltersVersion()).toBe(0);

		mandatoryFieldFilter.setActive(true);
		dataAccessor.filter(mandatoryFieldFilterId);

		expect(dataAccessor.hasFiltersActive()).toBe(true);

		expect(dataAccessor.getSize(true)).toBe(2);
		expect(dataAccessor.getSize(false)).toBe(4);

		expect(dataAccessor.isFiltered(TestData.firstname)).toBe(true);
		expect(dataAccessor.isFiltered(TestData.lastname)).toBe(false);

		expect(dataAccessor.getFiltersVersion()).toBe(1);

		mandatoryFieldFilter.setActive(false);
		dataAccessor.filter(mandatoryFieldFilterId);

		expect(dataAccessor.hasFiltersActive()).toBe(false);
		expect(dataAccessor.getSize(true)).toBe(4);
		expect(dataAccessor.isFiltered(TestData.firstname)).toBe(false);

		expect(dataAccessor.getFiltersVersion()).toBe(2);

		dataAccessor.removeFilter(mandatoryFieldFilter);

		expect(dataAccessor.hasFilters()).toBe(false);
		expect(dataAccessor.getFiltersVersion()).toBe(3);
	});
});

describe('Test data accessor with two filters', () => {
	it('data-accessor-two-filters', () => {

		const dataAccessor = createDataAccessor();

		const nameFilter = new RegexpFilter(nameFilterId, TestData.Columns.NAME.key, false, false);
		const mandatoryFieldFilter = new BooleanFilter(mandatoryFieldFilterId, TestData.Columns.MANDATORY.key, false, false);

		dataAccessor.addFilter(nameFilter);
		dataAccessor.addFilter(mandatoryFieldFilter);

		const filters = dataAccessor.getFilters();
		expect(Array.isArray(filters)).toBe(true);
		expect(filters.length).toBe(2);
		expect(filters[0].getId()).toBe(nameFilterId);
		expect(filters[1].getId()).toBe(mandatoryFieldFilterId);

		expect(dataAccessor.getFiltersVersion()).toBe(0);
		expect(dataAccessor.getSize(true)).toBe(4);

		mandatoryFieldFilter.setActive(true);
		dataAccessor.filter(mandatoryFieldFilterId);

		expect(dataAccessor.hasFiltersActive()).toBe(true);
		expect(dataAccessor.getSize(true)).toBe(2);

		nameFilter.setActive(true);
		nameFilter.setValue('name');
		dataAccessor.filter(nameFilterId);

		expect(dataAccessor.getSize(true)).toBe(1);
		expect(dataAccessor.getSize(false)).toBe(4);
		expect(dataAccessor.isFiltered(TestData.firstname)).toBe(true);
		expect(dataAccessor.isFiltered(TestData.lastname)).toBe(false);

		mandatoryFieldFilter.setActive(false);
		dataAccessor.filter(mandatoryFieldFilterId);
		expect(dataAccessor.getSize(true)).toBe(2);
		expect(dataAccessor.hasFiltersActive()).toBe(true);

		nameFilter.setActive(false);
		dataAccessor.filter(nameFilterId);
		expect(dataAccessor.getSize(true)).toBe(4);
		expect(dataAccessor.hasFiltersActive()).toBe(false);

		mandatoryFieldFilter.setActive(true);
		nameFilter.setActive(true);
		dataAccessor.filterAll();

		expect(dataAccessor.getFiltersVersion()).toBe(5);
		expect(dataAccessor.getSize(true)).toBe(1);
		expect(dataAccessor.isFiltered(TestData.lastname)).toBe(false);

		mandatoryFieldFilter.setActive(false);
		nameFilter.setActive(false);
		dataAccessor.filterAll();

		expect(dataAccessor.getFiltersVersion()).toBe(6);
		expect(dataAccessor.getSize(true)).toBe(4);

		dataAccessor.removeFilter(mandatoryFieldFilter);
		dataAccessor.removeFilter(nameFilter);

		expect(dataAccessor.hasFilters()).toBe(false);
		expect(dataAccessor.getFiltersVersion()).toBe(8);
	});
});

function checkOrder(dataAccessor, elements, indices, withFiltersAndSorter) {
	for (let i = 0; i < elements.length; i += 1) {
		expect(dataAccessor.getElementIndex(elements[i], withFiltersAndSorter)).toBe(indices[i]);
	}
}

describe('Test data accessor with sorter on name data', () => {
	it('data-accessor-name-sorter', () => {

		const dataAccessor = createDataAccessor();

		expect(dataAccessor.hasSorter()).toBe(false);
		checkOrder(dataAccessor, elements, [0, 1, 2, 3], false);
		checkOrder(dataAccessor, elements, [0, 1, 2, 3], true);

		const nameSorter = new Sorter(nameSorterId, '', TestData.Columns.NAME.key);

		dataAccessor.setSorter(nameSorter);
		expect(dataAccessor.hasSorter()).toBe(true);
		expect(dataAccessor.isActiveSorter(nameSorter)).toBe(true);

		const activeSorter = dataAccessor.getSorter();
		expect(activeSorter.getId()).toBe(nameSorterId);

		expect(dataAccessor.getSize(true)).toBe(4);

		checkOrder(dataAccessor, elements, [0, 1, 2, 3], true);

		nameSorter.setOrder(Order.ASCENDING);
		dataAccessor.sort();
		checkOrder(dataAccessor, elements, [2, 3, 1, 0], true);
		checkOrder(dataAccessor, elements, [0, 1, 2, 3], false);

		nameSorter.setOrder(Order.DESCENDING);
		dataAccessor.sort();
		checkOrder(dataAccessor, elements, [1, 0, 2, 3], true);

		expect(dataAccessor.getElement(1, true).id).toBe(TestData.firstname.id);
		expect(dataAccessor.getElement(1, false).id).toBe(TestData.lastname.id);

		const sortedElements = dataAccessor.getElements(true);
		expect(Array.isArray(sortedElements)).toBe(true);
		expect(sortedElements.length).toBe(4);
		expect(sortedElements[1].id).toBe(TestData.firstname.id);
		expect(sortedElements[3].id).toBe(TestData.address.id);

		dataAccessor.clearSorter();
		expect(dataAccessor.hasSorter()).toBe(false);
		expect(dataAccessor.getSorter()).toBe(null);
		checkOrder(dataAccessor, elements, [0, 1, 2, 3], false);
		checkOrder(dataAccessor, elements, [0, 1, 2, 3], true);
	});
});

describe('Test data accessor with sorter and filter', () => {
	it('data-accessor-name-sorter-and-filter', () => {

		const dataAccessor = createDataAccessor();
		expect(dataAccessor.hasSorter()).toBe(false);
		expect(dataAccessor.hasFilters()).toBe(false);

		const nameSorter = new Sorter(nameSorterId, '', TestData.Columns.NAME.key);
		const nameFilter = new RegexpFilter(nameFilterId, TestData.Columns.NAME.key, false, false);

		nameSorter.setOrder(Order.ASCENDING);
		dataAccessor.setSorter(nameSorter);
		expect(dataAccessor.hasSorter()).toBe(true);
		checkOrder(dataAccessor, elements, [2, 3, 1, 0], true);
		expect(dataAccessor.getSize(true)).toBe(4);

		nameFilter.setActive(true);
		nameFilter.setValue('name');
		dataAccessor.addFilter(nameFilter);
		expect(dataAccessor.getSize(true)).toBe(2);
		expect(dataAccessor.isFiltered(TestData.firstname)).toBe(false);
		expect(dataAccessor.isFiltered(TestData.birthday)).toBe(true);
		checkOrder(dataAccessor, elements, [0, 1, -1, -1], true);

		nameSorter.setOrder(Order.DESCENDING);
		dataAccessor.sort();
		checkOrder(dataAccessor, elements, [1, 0, -1, -1], true);

		nameFilter.setValue('d');
		dataAccessor.filter(nameFilterId);
		expect(dataAccessor.getSize(true)).toBe(2);
		expect(dataAccessor.isFiltered(TestData.firstname)).toBe(true);
		expect(dataAccessor.isFiltered(TestData.birthday)).toBe(false);
		checkOrder(dataAccessor, elements, [-1, -1, 0, 1], true);

		nameSorter.setOrder(Order.ASCENDING);
		dataAccessor.sort();
		checkOrder(dataAccessor, elements, [-1, -1, 1, 0], true);

		nameFilter.setActive(false);
		dataAccessor.filter(nameFilterId);
		expect(dataAccessor.getSize(true)).toBe(4);
		checkOrder(dataAccessor, elements, [2, 3, 1, 0], true);

		dataAccessor.clearSorter();
		checkOrder(dataAccessor, elements, [0, 1, 2, 3], true);
	});
});
