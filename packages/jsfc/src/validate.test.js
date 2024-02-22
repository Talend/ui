import { validate } from './validate';

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
	});
});
