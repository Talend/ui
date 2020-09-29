import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import JSONSchemaRenderer from './JSONSchemaRenderer.component';

describe('JSONSchemaRenderer', () => {
	it('should render the empty properties list', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(toJson(wrapper)).toMatchSnapshot();
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
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render passwords', () => {
		const password = 'some_very_secure_password';
		const hiddenPassword = '\u2022'.repeat(5);
		const schema = {
			jsonSchema: {
				properties: {
					credentials: 'string',
				},
			},
			uiSchema: {
				credentials: { 'ui:widget': 'password' },
			},
			properties: {
				credentials: password,
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dd').first().text()).toEqual(hiddenPassword);
	});

	it('should not render hidden fields', () => {
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
		expect(wrapper.find('dt').map(item => item.text())).toEqual(['b', 'd']);
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
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(toJson(wrapper)).toMatchSnapshot();
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
							c: {
								type: 'string',
							},
						},
					},
				},
			},
			properties: {
				a: {
					b: 'test',
					c: 'test 2',
				},
			},
			uiSchema: {},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(toJson(wrapper)).toMatchSnapshot();
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
				'ui:order': ['a', 'd', 'b', 'c'],
			},
			properties: {
				c: 'test c',
				d: 'test d',
				b: 'test b',
				a: 'test a',
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dt').map(item => item.text())).toEqual(['a', 'd', 'b', 'c']);
	});

	it('should handle object level order', () => {
		const schema = {
			jsonSchema: {
				properties: {
					d: { type: 'string' },
					obj: {
						type: 'object',
						properties: {
							b: { type: 'string' },
							c: { type: 'string' },
							a: { type: 'string' },
						},
					},
				},
			},
			uiSchema: {
				obj: { 'ui:order': ['a', 'c', 'b'] },
			},
			properties: {
				d: 'test d',
				obj: {
					c: 'test c',
					a: 'test a',
					b: 'test b',
				},
			},
		};
		const wrapper = mount(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper.find('dl.theme-nested dt').map(item => item.text())).toEqual(['a', 'c', 'b']);
	});

	it('should not render properties without a schema', () => {
		const schema = {
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
		expect(wrapper.find('dt').first().text()).toBe('a');
	});

	it('should throw an exception in case of invalid schema', () => {
		const wrapper = () => shallow(<JSONSchemaRenderer schema={{}} />);
		expect(wrapper).toThrow('Invalid Schema');
	});

	it('should throw an exception in case of unkown type', () => {
		const schema = {
			jsonSchema: {
				properties: {
					a: {
						type: 'unknown',
					},
				},
			},
			properties: {
				a: 'test',
			},
		};
		const wrapper = () => shallow(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper).toThrow('Unknown type: unknown');
	});
});
