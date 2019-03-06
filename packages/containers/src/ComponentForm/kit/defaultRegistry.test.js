import service from './defaultRegistry';

const schema = { key: 'foo' };
const errorMsg = 'Sth went wrong';
const errors = { foo: errorMsg };

describe('defaultRegistry', () => {
	describe('schema', () => {
		it('return new properties from body.entries', () => {
			// given
			const properties = {
				attr: 'value',
				obj: {},
			};
			const body = {
				entries: [{ name: 'entry1', type: 'string' }, { name: 'entry2', type: 'string' }],
			};
			const trigger = {
				options: [{ path: 'obj.attr', type: 'object' }],
			};
			// when
			const results = service.schema({ schema, body, properties, trigger, errors });

			// then
			expect(results).toEqual({
				errors: {},
				properties: {
					attr: 'value',
					obj: {
						attr: {
							entry1: 'string',
							entry2: 'string',
						},
					},
				},
			});
		});
		it('return new properties from body.entries with type array', () => {
			// given
			const properties = {
				attr: 'value',
				obj: {},
			};
			const body = {
				entries: [{ name: 'entry1' }, { name: 'entry2' }],
			};
			const trigger = {
				options: [{ path: 'obj.attr', type: 'array' }],
			};
			// when
			const results = service.schema({ schema, body, properties, trigger, errors });

			// then
			expect(results).toEqual({
				errors: {},
				properties: {
					attr: 'value',
					obj: {
						attr: ['entry1', 'entry2'],
					},
				},
			});
		});
		it('should add errors from body', () => {
			expect(
				service.schema({
					schema,
					body: { error: errorMsg },
					trigger: {},
					errors: {},
				}),
			).toEqual({ errors });
		});
	});
	describe('suggestions', () => {
		it('should return a titleMap from body.items', () => {
			const body = {
				items: [{ label: 'item 1', id: 1 }, { label: 'item 2', id: 2 }],
			};
			expect(service.suggestions({ body })).toEqual({
				titleMap: [{ name: 'item 1', value: 1 }, { name: 'item 2', value: 2 }],
			});
		});
	});
	describe('error', () => {
		it('should return errors map from error.message', () => {
			const error = { message: errorMsg, name: 'TypeError' };
			expect(
				service.error({
					errors: {},
					schema,
					error,
				}),
			).toEqual({
				errors: { foo: errorMsg },
			});
		});
		it('should return errors map from error.code and description', () => {
			const error = {
				code: 'PLUGIN_MISSING',
				description: errorMsg,
			};
			expect(
				service.error({
					errors: {},
					schema,
					error,
				}),
			).toEqual({
				errors: { foo: '[PLUGIN_MISSING] Sth went wrong' },
			});
		});
		it('should return description if error.description and no error.code', () => {
			const error = {
				description: errorMsg,
			};
			expect(
				service.error({
					errors: {},
					schema,
					error,
				}),
			).toEqual({
				errors: { foo: 'Sth went wrong' },
			});
		});
		it('should return errors map from error', () => {
			const error = { foo: 'foo' };
			expect(
				service.error({
					errors: {},
					schema,
					error,
				}),
			).toEqual({
				errors: { foo: JSON.stringify(error) },
			});
		});
	});
	describe('update', () => {
		it('should return a new properties with type object', () => {
			const body = { bar: 'bar' };
			const trigger = {
				options: [{ path: 'root.foo', type: 'object' }],
			};
			const properties = {
				root: { name: 'my object' },
			};
			const result = service.update({ body, trigger, properties });
			expect(result).toEqual({
				properties: {
					root: {
						name: 'my object',
						foo: { bar: 'bar' },
					},
				},
			});
		});
		it('should return a new properties with type string', () => {
			const body = { data: 'foo' };
			const trigger = {
				options: [{ path: 'root.foo', type: 'string' }],
			};
			const properties = {
				root: { name: 'my object' },
			};
			const result = service.update({ body, trigger, properties });
			expect(result).toEqual({
				properties: {
					root: {
						name: 'my object',
						foo: 'foo',
					},
				},
			});
		});
		it('should create missing sub objects', () => {
			const body = { bar: 'bar' };
			const trigger = {
				options: [{ path: 'root.foo', type: 'object' }],
			};
			const properties = {};
			const result = service.update({ body, trigger, properties });
			expect(result).toEqual({
				properties: {
					root: {
						foo: { bar: 'bar' },
					},
				},
			});
		});
	});
	describe('healthcheck', () => {
		it('should be === validation', () => {
			// this is the case today but may change in the futur
			expect(service.healthcheck).toBe(service.validation);
		});
		it('should return empty errors if body.status === OK', () => {
			expect(
				service.healthcheck({
					schema,
					body: { status: 'OK' },
					errors: {},
				}),
			).toEqual({
				errors: {},
			});
		});
		it('should return empty errors if body.status === KK', () => {
			expect(
				service.healthcheck({
					schema,
					body: { status: 'KO', comment: errorMsg },
					errors: {},
				}),
			).toEqual({ errors });
		});
		it('should remove errors if they do not exist anymore', () => {
			expect(
				service.healthcheck({
					schema,
					body: { status: 'OK' },
					errors: { foo: errorMsg },
				}),
			).toEqual({ errors: {} });
		});
	});
});
