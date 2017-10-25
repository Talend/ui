import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import faker from 'faker';

import JSONSchemaRenderer, {
	InvalidSchemaException,
	UnkownTypeException,
} from './JSONSchemaRenderer.component';

faker.seed(42);
describe('JSONSchemaRenderer', () => {
	it('should render', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const wrapper = renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render strings and integers', () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: {
						title: faker.random.words(),
						type: 'string',
					},
					b: {
						title: faker.random.words(),
						type: 'integer',
					},
				},
			},
			properties: {
				a: faker.random.words(),
				b: faker.random.number(),
			},
		};
		const wrapper = renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render arrays', () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: {
						title: faker.random.words(),
						type: 'array',
						items: {
							enum: ['a', 'b', 'c', 'd', 'e', 'f'],
						},
					},
				},
			},
			properties: {
				a: ['b', 'd', 'f'],
			},
		};
		const wrapper = renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should handle nested objects', () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: {
						type: 'object',
						properties: {
							b: {
								type: 'string',
							},
						},
					},
				},
			},
			properties: {
				a: {
					b: faker.random.words(),
				},
			},
		};
		const wrapper = renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should handle order', () => {
		const schema = {
			jsonSchema: {
				properties: {
					d: { type: 'string' },
					b: { type: 'string' },
					c: { type: 'string' },
					a: { type: 'string' },
				},
			},
			uiSchema: {
				'ui:order': ['a', 'e', 'b', 'c'],
			},
			properties: {
				c: faker.random.words(),
				d: faker.random.words(),
				b: faker.random.words(),
				a: faker.random.words(),
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(
			wrapper
				.find('dt')
				.first()
				.text(),
		).toEqual('a');
		expect(
			wrapper
				.find('dt')
				.last()
				.text(),
		).toEqual('d');
	});

	it("shouldn't render hidden fields", () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: { type: 'string' },
					b: { type: 'string' },
					c: { type: 'string' },
					d: { type: 'string' },
				},
			},
			uiSchema: {
				a: { 'ui:widget': 'hidden' },
				c: { 'ui:widget': 'hidden' },
			},
			properties: {
				a: faker.random.words(),
				b: faker.random.words(),
				c: faker.random.words(),
				d: faker.random.words(),
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dt')).toHaveLength(2);
		expect(
			wrapper
				.find('dt')
				.first()
				.text(),
		).toEqual('b');
		expect(
			wrapper
				.find('dt')
				.last()
				.text(),
		).toEqual('d');
	});

	it("shouldn't render properties without a schema", () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: { type: 'string' },
				},
			},
			properties: {
				a: faker.random.words(),
				b: faker.random.words(),
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dt')).toHaveLength(1);
		expect(
			wrapper
				.find('dt')
				.first()
				.text(),
		).toEqual('a');
	});

	// TODO: Add $ref handling
	// Not required for a first implementation
	xit('should handle $ref', () => {});

	it('should throw an exception in case of invalid schema', () => {
		const wrapper = () => renderer.create(<JSONSchemaRenderer schema={{}} />).toJSON();
		expect(wrapper).toThrow(InvalidSchemaException);
	});

	it('should throw an exception in case of unkown type', () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: {
						type: faker.random.word(),
					},
				},
			},
			properties: {
				a: faker.random.words(),
			},
		};
		const wrapper = () => renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toThrow(UnkownTypeException);
	});
});
