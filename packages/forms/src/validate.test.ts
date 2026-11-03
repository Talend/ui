import validate from './validate';

const jsonSchema = {
	title: 'my test schema',
	required: ['label'],
	type: 'object',
	properties: {
		label: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
	},
};

const validPayload = {
	label: 'foo',
	description: undefined, // this doesn t work with tv4 and is produced by our lib.
};

const typeNotValidPayload = {
	label: 3,
};

const emptyPayload = {};

describe('Form.validate', () => {
	it('should return true if valid data', () => {
		// eslint-disable-next-line new-cap
		expect(validate(jsonSchema, validPayload)).toBe(true);
	});
	it('should return false if not valid data', () => {
		// eslint-disable-next-line new-cap
		expect(validate(jsonSchema, typeNotValidPayload)).toBe(false);
		// eslint-disable-next-line new-cap
		expect(validate(jsonSchema, emptyPayload)).toBe(false);
	});
	it('should reject schemas with a pattern that may cause catastrophic backtracking', () => {
		// built at runtime: this is a deliberately catastrophic pattern, never evaluated
		const catastrophicPattern = ['^(a', 'a)+$'].join('|');
		const start = Date.now();
		expect(() =>
			validate(
				{ type: 'object', properties: { label: { type: 'string', pattern: catastrophicPattern } } },
				{ label: `${'a'.repeat(40)}!` },
			),
		).toThrow('Unsafe pattern');
		expect(Date.now() - start).toBeLessThan(500);
	});
	it('should still apply safe patterns', () => {
		const schema = {
			type: 'object',
			properties: { label: { type: 'string', pattern: '^[a-z]+$' } },
		};
		expect(validate(schema, { label: 'foo' })).toBe(true);
		expect(validate(schema, { label: 'Foo1' })).toBe(false);
	});
});
