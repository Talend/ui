import * as TestData from '../TestData';
import * as Constants from '../Constants';
import DefaultDataAccessor from './DefaultDataAccessor';
import DataAccessorWrapper, { isObjectEmpty } from './DataAccessorWrapper';
import MandatoryFieldFilter from './Schema/Filters/MandatoryFieldFilter';
import NameFilter from './Schema/Filters/NameFilter';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

it('data-accessor-wrapper-utils', () => {
	const obj1 = {
		val: 'toto',
	};

	expect(isObjectEmpty(null)).toBe(true);
	expect(isObjectEmpty({})).toBe(true);
	expect(isObjectEmpty(obj1)).toBe(false);
});

it('data-accessor-wrapper-schema', () => {
	const schema = TestData.schema1;

	expect(dataAccessor.getSchemaId(schema)).toBe(schema.id);
	expect(dataAccessor.getSchemaName(schema)).toBe(schema.name);
	expect(dataAccessor.getSchemaSize(schema)).toBe(schema.elements.length);
});

it('data-accessor-wrapper-element', () => {
	const schema = TestData.schema1;

	const element = dataAccessor.getSchemaElement(schema, 0);
	expect(dataAccessor.getElementId(element)).toBe(TestData.element1.id);
	expect(dataAccessor.getElementName(element)).toBe(TestData.element1.name);
	expect(dataAccessor.getElementType(element)).toBe(TestData.element1.type);
	expect(dataAccessor.getElementDescription(element)).toBe(TestData.element1.description);
	expect(dataAccessor.isElementMandatory(element)).toBe(false);
	expect(dataAccessor.getSchemaElementIndex(schema, element)).toBe(0);
});

it('data-accessor-wrapper-elements', () => {
	const schema = TestData.schema1;

	const elements = dataAccessor.getSchemaElements(schema);
	expect(elements.length).toBe(schema.elements.length);
	expect(dataAccessor.getSchemaSize(schema)).toBe(elements.length);

	const size = elements.length;

	for (let i = 0; i < size; i += 1) {
		const element = dataAccessor.getSchemaElement(schema, i);
		expect(dataAccessor.areElementsEqual(element, elements[i])).toBe(true);
		expect(dataAccessor.includes(elements, element)).toBe(true);
	}
});

it('data-accessor-wrapper-mapping', () => {
	let mapping = TestData.mapping;

	expect(dataAccessor.isMappingEmpty(mapping)).toBe(false);
	let mappingItems = dataAccessor.getMappingItems(mapping);
	expect(mappingItems.length).toBe(2);

	const item = mappingItems[0];
	const source = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
	const target = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
	expect(dataAccessor.areElementsEqual(source, TestData.element2)).toBe(true);
	expect(dataAccessor.areElementsEqual(target, TestData.element5)).toBe(true);

	mapping = dataAccessor.addMapping(mapping, TestData.element3, TestData.element7);
	mappingItems = dataAccessor.getMappingItems(mapping);
	expect(mappingItems.length).toBe(3);

	mapping = dataAccessor.removeMapping(mapping, TestData.element4, TestData.element8);
	mappingItems = dataAccessor.getMappingItems(mapping);
	expect(mappingItems.length).toBe(2);

	mapping = dataAccessor.removeMapping(mapping, TestData.element1, TestData.element6);
	mappingItems = dataAccessor.getMappingItems(mapping);
	expect(mappingItems.length).toBe(2);

	mapping = dataAccessor.clearMapping(mapping);
	mappingItems = dataAccessor.getMappingItems(mapping);
	expect(mappingItems.length).toBe(0);
	expect(dataAccessor.isMappingEmpty(mapping)).toBe(true);
});

it('data-accessor-wrapper-mandatory-field-filter', () => {
	const schema = TestData.schema1;
	const mandatoryFieldFilter = new MandatoryFieldFilter(false);

	expect(dataAccessor.hasFilters(schema)).toBe(false);
	expect(dataAccessor.hasFiltersActive(schema)).toBe(false);
	expect(dataAccessor.getFiltersVersion(schema)).toBe(-1);

	dataAccessor.addFilter(schema, mandatoryFieldFilter);

	expect(dataAccessor.hasFilters(schema)).toBe(true);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);
	expect(dataAccessor.getFiltersVersion(schema)).toBe(0);
	expect(dataAccessor.hasFiltersActive(schema)).toBe(false);

	mandatoryFieldFilter.setActive(true);
	dataAccessor.filterSchema(schema, mandatoryFieldFilter.getId());

	expect(dataAccessor.hasFiltersActive(schema)).toBe(true);

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);
	expect(dataAccessor.getSchemaSize(schema, false)).toBe(4);

	expect(dataAccessor.isFiltered(schema, TestData.element1)).toBe(true);
	expect(dataAccessor.isFiltered(schema, TestData.element2)).toBe(false);

	expect(dataAccessor.getFiltersVersion(schema)).toBe(1);

	mandatoryFieldFilter.setActive(false);
	dataAccessor.filterSchema(schema, mandatoryFieldFilter.getId());

	expect(dataAccessor.hasFiltersActive(schema)).toBe(false);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);
	expect(dataAccessor.isFiltered(schema, TestData.element1)).toBe(false);

	expect(dataAccessor.getFiltersVersion(schema)).toBe(2);

	dataAccessor.removeFilter(schema, mandatoryFieldFilter);

	expect(dataAccessor.hasFilters(schema)).toBe(false);
	expect(dataAccessor.getFiltersVersion(schema)).toBe(-1);
});

it('data-accessor-wrapper-name-filter', () => {
	const schema = TestData.schema1;
	const nameFilter = new NameFilter(false);

	dataAccessor.addFilter(schema, nameFilter);
	nameFilter.setActive(true);
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getFiltersVersion(schema)).toBe(1);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	nameFilter.setName('name');
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getFiltersVersion(schema)).toBe(2);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);
	expect(dataAccessor.isFiltered(schema, TestData.element1)).toBe(false);
	expect(dataAccessor.isFiltered(schema, TestData.element3)).toBe(true);

	nameFilter.setName('');
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getFiltersVersion(schema)).toBe(3);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	nameFilter.setName('DAY');
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getFiltersVersion(schema)).toBe(4);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(1);
	expect(dataAccessor.isFiltered(schema, TestData.element3)).toBe(false);

	nameFilter.setActive(false);
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getFiltersVersion(schema)).toBe(5);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	nameFilter.setActive(true);
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getFiltersVersion(schema)).toBe(6);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(1);

	dataAccessor.removeFilter(schema, nameFilter);

	expect(dataAccessor.hasFilters(schema)).toBe(false);
	expect(dataAccessor.getFiltersVersion(schema)).toBe(-1);
});

it('data-accessor-wrapper-all-filters', () => {
	const schema = TestData.schema1;
	const mandatoryFieldFilter = new MandatoryFieldFilter(false);
	const nameFilter = new NameFilter(false);

	dataAccessor.addFilter(schema, mandatoryFieldFilter);
	dataAccessor.addFilter(schema, nameFilter);

	expect(dataAccessor.getFiltersVersion(schema)).toBe(0);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	mandatoryFieldFilter.setActive(true);
	dataAccessor.filterSchema(schema, mandatoryFieldFilter.getId());

	expect(dataAccessor.hasFiltersActive(schema)).toBe(true);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(2);

	nameFilter.setActive(true);
	nameFilter.setName('name');
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.getSchemaSize(schema, true)).toBe(1);
	expect(dataAccessor.isFiltered(schema, TestData.element1)).toBe(true);
	expect(dataAccessor.isFiltered(schema, TestData.element2)).toBe(false);

	mandatoryFieldFilter.setActive(false);
	dataAccessor.filterSchema(schema, mandatoryFieldFilter.getId());
	nameFilter.setActive(false);
	dataAccessor.filterSchema(schema, nameFilter.getId());

	expect(dataAccessor.hasFiltersActive(schema)).toBe(false);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	mandatoryFieldFilter.setActive(true);
	nameFilter.setActive(true);
	dataAccessor.filterAll(schema);

	expect(dataAccessor.getFiltersVersion(schema)).toBe(5);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(1);
	expect(dataAccessor.isFiltered(schema, TestData.element2)).toBe(false);

	mandatoryFieldFilter.setActive(false);
	nameFilter.setActive(false);
	dataAccessor.filterAll(schema);

	expect(dataAccessor.getFiltersVersion(schema)).toBe(6);
	expect(dataAccessor.getSchemaSize(schema, true)).toBe(4);

	dataAccessor.removeFilter(schema, mandatoryFieldFilter);
	dataAccessor.removeFilter(schema, nameFilter);

	expect(dataAccessor.hasFilters(schema)).toBe(false);
	expect(dataAccessor.getFiltersVersion(schema)).toBe(-1);
});
