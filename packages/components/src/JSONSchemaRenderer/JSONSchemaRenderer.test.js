import { render, screen } from '@testing-library/react';

import JSONSchemaRenderer from './JSONSchemaRenderer.component';

describe('JSONSchemaRenderer', () => {
	it('should render the empty properties list', () => {
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
		const { container } = render(<JSONSchemaRenderer schema={schema} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should support custom className', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const { container } = render(<JSONSchemaRenderer schema={schema} className="custom-test" />);
		expect(container.firstChild).toHaveClass('custom-test');
	});

	it('should support custom props', () => {
		const schema = { jsonSchema: {}, properties: {} };
		const { container } = render(<JSONSchemaRenderer schema={schema} data-extra="foo" />);
		expect(container.firstChild.dataset.extra).toBe('foo');
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
		render(<JSONSchemaRenderer schema={schema} />);
		expect(screen.getByText('credentials')).toBeVisible();
		expect(screen.getByText('credentials').nextElementSibling).toHaveTextContent(hiddenPassword);
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
		render(<JSONSchemaRenderer schema={schema} />);
		expect(screen.getByText('b')).toBeVisible();
		expect(screen.getByText('d')).toBeVisible();
		expect(screen.queryByText('a')).not.toBeInTheDocument();
		expect(screen.queryByText('c')).not.toBeInTheDocument();
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
		render(<JSONSchemaRenderer schema={schema} />);
		expect(screen.getByText('b')).toBeVisible();
		expect(screen.getByText('b')).toHaveClass('theme-array-value');
		expect(screen.getByText('d')).toBeVisible();
		expect(screen.getByText('d')).toHaveClass('theme-array-value');
		expect(screen.getByText('f')).toBeVisible();
		expect(screen.getByText('f')).toHaveClass('theme-array-value');
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
		render(<JSONSchemaRenderer schema={schema} />);
		expect(screen.getByText('a')).toBeVisible();
		expect(screen.getByText('a')).toBe(screen.getByRole('heading', { level: 2 }));
		expect(screen.getByText('b')).toBeVisible();
		expect(screen.getByText('c')).toBeVisible();
		expect(screen.getByText('test')).toBeVisible();
		expect(screen.getByText('test 2')).toBeVisible();
		expect(screen.getByText('test')).toBe(screen.getByText('b').nextElementSibling);
		expect(screen.getByText('test 2')).toBe(screen.getByText('c').nextElementSibling);
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
		render(<JSONSchemaRenderer schema={schema} />);
		expect(screen.getByText('a')).toBeVisible();
		expect(screen.getByText('a').nextElementSibling).toHaveTextContent('test a');
		expect(screen.getByText('a').nextElementSibling.nextElementSibling).toHaveTextContent('d');

		expect(screen.getByText('d').nextElementSibling.nextElementSibling).toHaveTextContent('b');
		expect(screen.getByText('b').nextElementSibling.nextElementSibling).toHaveTextContent('c');
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
		render(<JSONSchemaRenderer schema={schema} />);
		// check a is after d
		expect(screen.getByText('a').closest('dd').previousSibling.previousSibling).toBe(
			screen.getByText('test d'),
		);
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
		render(<JSONSchemaRenderer schema={schema} />);
		expect(screen.queryByText('b')).not.toBeInTheDocument();
	});

	it('should throw an exception in case of invalid schema', () => {
		const wrapper = () => render(<JSONSchemaRenderer schema={{}} />);
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
		const wrapper = () => render(<JSONSchemaRenderer schema={schema} />);
		expect(wrapper).toThrow('Unknown type: unknown');
	});
});
