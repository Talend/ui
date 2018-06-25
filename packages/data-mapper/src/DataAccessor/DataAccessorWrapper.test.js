import * as TestData from '../TestData';
import { Constants } from '../index';

const dataAccessor = new DataAccessorWrapper();

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
