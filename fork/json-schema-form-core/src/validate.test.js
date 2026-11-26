import { validate } from './validate';
import tv4 from './tv4';

describe('validate.js', () => {
	it('should hold a validation function for testing against tv4 until an option to pass in a validator is created', () => {
		expect(typeof validate).toBe('function');
	});

	describe('validate', () => {
		const form = { key: ['hero'], schema: { type: 'string' } };
		it('should return a result object {"error":null, "missing":[], "valid":true}, with valid set to true when the data is valid for the schema', () => {
			let value = 'Batman';
			let result = validate(form, value, {});
			expect(result.error).toBe(null);
			expect(result.missing).toEqual([]);
			expect(result.valid).toBe(true);
		});

		it('should return an error object with a message "Invalid type: array (expected string)" when the data is not valid', () => {
			let value = [0];
			let result = validate(form, value, {});
			expect(result.error.message).toBe('Invalid type: array (expected string)');
		});

		it('should return an error object with a message "CUSTOM_ERROR_INVALID_INPUT" when the integer value is not valid', () => {
			let value = 'stringValue';
			const testForm = { type: 'number', key: ['hero'], schema: { type: 'number' } };
			const event = { target: { validity: { badInput: true } } };
			let result = validate(testForm, value, event);
			expect(result.error.message).toBe('CUSTOM_ERROR_INVALID_INPUT');
		});

		describe('pattern', () => {
			const adversarialValue = `${'a'.repeat(5000)}!`;

			it.each(['^(a|a)+$', '^(\\w+\\s?)*$', 'a+$', 'a+a+$'])(
				'should evaluate pathological pattern %s in linear time without ReDoS',
				pattern => {
					const patternForm = { key: ['hero'], schema: { type: 'string', pattern } };
					const start = Date.now();
					const result = validate(patternForm, adversarialValue, {});
					expect(Date.now() - start).toBeLessThan(200);
					expect(result.valid).toBe(false);
					expect(result.error.code).toBe(tv4.errorCodes.STRING_PATTERN);
				},
			);

			it('should evaluate RegExp instances and /body/flags literals in linear time', () => {
				const regexForm = { key: ['hero'], schema: { type: 'string', pattern: /^(a|a)+$/i } };
				const start = Date.now();
				const result = validate(regexForm, adversarialValue, {});
				expect(Date.now() - start).toBeLessThan(200);
				expect(result.valid).toBe(false);

				const literalForm = { key: ['hero'], schema: { type: 'string', pattern: '/^[a-z]+$/i' } };
				expect(validate(literalForm, 'Batman', {}).valid).toBe(true);
				expect(validate(literalForm, 'Batman1', {}).valid).toBe(false);
			});

			it('should evaluate pathological patternProperties in linear time', () => {
				const patternForm = {
					key: ['hero'],
					schema: {
						type: 'object',
						patternProperties: { '^(a|a)+$': { type: 'string' } },
						additionalProperties: false,
					},
				};
				const start = Date.now();
				const result = validate(patternForm, { [adversarialValue]: 'ok' }, {});
				expect(Date.now() - start).toBeLessThan(200);
				expect(result.valid).toBe(false);
			});

			it('should evaluate pathological patterns nested in sub-schemas and $ref targets in linear time', () => {
				const uri = 'https://example.test/registered/unsafe.json';
				const baseUri = 'https://example.test/registered/root.json';
				tv4.addSchema(baseUri, { properties: { hero: { $ref: 'unsafe.json' } } });
				tv4.addSchema(uri, { type: 'string', pattern: '^(a|a)+$' });
				try {
					const start = Date.now();
					const result = validate(
						{ key: ['hero'], schema: { $ref: baseUri } },
						{ hero: adversarialValue },
						{},
					);
					expect(Date.now() - start).toBeLessThan(200);
					expect(result.valid).toBe(false);
					expect(result.error.code).toBe(tv4.errorCodes.STRING_PATTERN);
				} finally {
					tv4.dropSchemas();
				}
			});

			it.each([
				'^\\c+c+c+$',
				'^(\\p{1,2})+$',
				'^(\\w+)\\1$',
				`${'('.repeat(2000)}a${')'.repeat(2000)}`,
			])('should fail closed on RE2-unsupported or invalid pattern %s', pattern => {
				const patternForm = { key: ['hero'], schema: { type: 'string', pattern } };
				const result = validate(patternForm, 'aaaa', {});
				expect(result.valid).toBe(false);
				expect(result.error.code).toBe(tv4.errorCodes.STRING_PATTERN);
			});

			it('should still apply normal patterns including email patterns', () => {
				const patternForm = { key: ['hero'], schema: { type: 'string', pattern: '^[a-z]+$' } };
				expect(validate(patternForm, 'batman', {}).valid).toBe(true);
				expect(validate(patternForm, 'Batman1', {}).valid).toBe(false);

				const emailForm = { key: ['email'], schema: { type: 'string', pattern: '^\\S+@\\S+$' } };
				expect(validate(emailForm, 'user@example.com', {}).valid).toBe(true);
				expect(validate(emailForm, `${'@'.repeat(5000)} `, {}).valid).toBe(false);
			});
		});
	});
});
