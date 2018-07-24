import service from './service';

const schema = { key: 'foo' };
const errorMsg = 'Sth went wrong';
const errors = { foo: errorMsg };

describe('service', () => {
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
