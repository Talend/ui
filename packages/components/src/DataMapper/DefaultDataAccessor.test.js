import * as TestData from './TestData';
import DefaultDataAccessor from './DefaultDataAccessor';

const dataAccessor = new DefaultDataAccessor();

it('data-accessor-schema', () => {

  const schema = TestData.schema;

  expect(dataAccessor.getSchemaId(schema)).toBe(TestData.schema.id);
  expect(dataAccessor.getSchemaName(schema)).toBe(TestData.schema.name);
	expect(dataAccessor.getSchemaSize(schema)).toBe(TestData.schema.elements.length);

});

it('data-accessor-element', () => {

  const schema = TestData.schema;

  const element = dataAccessor.getSchemaElement(schema, 0);
  expect(dataAccessor.getElementId(element)).toBe(TestData.element1.id);
  expect(dataAccessor.getElementName(element)).toBe(TestData.element1.name);
  expect(dataAccessor.getElementType(element)).toBe(TestData.element1.type);
  expect(dataAccessor.getElementDescription(element)).toBe(TestData.element1.description);
  expect(dataAccessor.getSchemaElementIndex(schema, element)).toBe(0);

});

it('data-accessor-elements', () => {

  const schema = TestData.schema;

  const elements = dataAccessor.getSchemaElements(schema);
  expect(elements.length).toBe(TestData.schema.elements.length);
  expect(dataAccessor.getSchemaSize(schema)).toBe(elements.length);

  const size = elements.length;

  for (let i = 0; i < size; i += 1) {
    const element = dataAccessor.getSchemaElement(schema, i);
    expect(dataAccessor.areEquals(element, elements[i])).toBe(true);
  }

});
