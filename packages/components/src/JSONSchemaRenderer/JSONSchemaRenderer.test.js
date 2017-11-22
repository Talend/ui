import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import JSONSchemaRenderer, { InvalidSchemaException, UnkownTypeException } from './JSONSchemaRenderer.component';

describe('JSONSchemaRenderer', () => {
	it('should render', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const wrapper = renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should support custom className', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const wrapper = shallow(<JSONSchemaRenderer schema={schema} className="custom-test" />);
		expect(wrapper.props().className).toContain('custom-test');
	});

	it('should support custom props', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const wrapper = shallow(<JSONSchemaRenderer schema={schema} extra="foo" />);
		expect(wrapper.props().extra).toBe('foo');
	});

	it('should render strings and integers', () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: {
						title: 'test string',
						type: 'string',
					},
					b: {
						title: 'test integer',
						type: 'integer',
					},
				},
			},
			properties: {
				a: 'A big a',
				b: 42,
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
						title: 'test string',
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
					b: 'test',
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
				c: 'test c',
				d: 'test d',
				b: 'test b',
				a: 'test a',
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dt').first().text()).toEqual('a');
		expect(wrapper.find('dt').last().text()).toEqual('d');
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
				a: 'test a',
				b: 'test b',
				c: 'test c',
				d: 'test d',
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dt')).toHaveLength(2);
		expect(wrapper.find('dt').first().text()).toEqual('b');
		expect(wrapper.find('dt').last().text()).toEqual('d');
	});

	it("shouldn't render properties without a schema", () 	=> {
		const schema = 	{
			jsonSchema: {
				properties: {
					a: { type: 'string' },
				},
			},
			properties: {
				a: 'test a',
				b: 'test b',
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dt')).toHaveLength(1);
		expect(wrapper.find('dt').first().text()).toEqual('a');
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
						type: 'test',
					},
				},
			},
			properties: {
				a: 'test',
			},
		};
		const wrapper = () => renderer.create(<JSONSchemaRenderer schema={schema} />).toJSON();
		expect(wrapper).toThrow(UnkownTypeException);
	});
});
