import * as TestData from '../TestData';
import Constants from '../Constants';
import DataAccessorWrapper from './DataAccessorWrapper';

const schema = TestData.schema1;
const dataAccessor = new DataAccessorWrapper();
dataAccessor.registerSchema(schema, Constants.MappingSide.INPUT);

it('data-accessor-wrapper-schema', () => {
	expect(dataAccessor.getSchemaSize(schema)).toBe(schema.elements.length);
});

it('data-accessor-wrapper-element', () => {
	const element = dataAccessor.getSchemaElement(schema, 0);
	expect(element.id).toBe(TestData.element1.id);
	expect(dataAccessor.getSchemaElementIndex(schema, element)).toBe(0);
});

it('data-accessor-wrapper-elements', () => {
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

	expect(mapping.length).toBe(2);

	const item = mapping[0];
	const source = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
	const target = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
	expect(dataAccessor.areElementsEqual(source, TestData.element2)).toBe(true);
	expect(dataAccessor.areElementsEqual(target, TestData.element5)).toBe(true);

	mapping = dataAccessor.addMapping(mapping, TestData.element3, TestData.element7);
	expect(mapping.length).toBe(3);

	mapping = dataAccessor.removeMapping(mapping, TestData.element4, TestData.element8);
	expect(mapping.length).toBe(2);

	mapping = dataAccessor.removeMapping(mapping, TestData.element1, TestData.element6);
	expect(mapping.length).toBe(2);

	mapping = dataAccessor.clearMapping(mapping);
	expect(mapping.length).toBe(0);
});
