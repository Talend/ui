import { validateValue, validateAll, isValid } from './validation';

const customError = 'This field is invalid';
function customValidationFn() {
	return customError;
}

describe('Validation utils', () => {
	describe('#validateValue', () => {
		it('should validate schema static definition', () => {
			// given
			const schema = {
				key: ['firstname'],
				customValidation: true,
				required: true,
				schema: {
					type: 'string',
				},
				type: 'text',
			};
			const value = '';
			const properties = { firstname: '' };

			// when
			const errors = validateValue(schema, value, properties, customValidationFn);

			// then
			expect(errors).toBe('Missing required property: firstname');
		});

		it('should return custom validation if static check is ok', () => {
			// given
			const schema = {
				key: ['firstname'],
				customValidation: true,
				required: true,
				schema: {
					type: 'string',
				},
				type: 'text',
			};
			const value = 'my name';
			const properties = { firstname: 'my name' };

			// when
			const errors = validateValue(schema, value, properties, customValidationFn);

			// then
			expect(errors).toBe(customError);
		});

		it('should return null when only static check is required and this one is ok', () => {
			// given
			const schema = {
				key: ['firstname'],
				customValidation: false,
				required: true,
				schema: {
					type: 'string',
				},
				type: 'text',
			};
			const value = 'my name';
			const properties = { firstname: 'my name' };

			// when
			const errors = validateValue(schema, value, properties, customValidationFn);

			// then
			expect(errors).toBe(null);
		});
	});

	describe('#validateAll', () => {
		it('should validate all fields', () => {
			// given
			const mergedSchema = [
				{
					key: ['user', 'lastname'],
					required: true,
					schema: {
						type: 'string',
					},
					type: 'text',
				},
				{
					key: ['user', 'firstname'],
					customValidation: true,
					required: true,
					schema: {
						type: 'string',
					},
					type: 'text',
				},
				{
					key: ['comment'],
					schema: {
						type: 'string',
					},
					type: 'textarea',
				},
			];
			const properties = {
				user: {
					lastname: '',
					firstname: 'my name',
				},
				comment: '',
			};

			// when
			const errors = validateAll(mergedSchema, properties, customValidationFn);

			// then
			expect(errors).toEqual({
				'user,firstname': 'This field is invalid', // custom validation
				'user,lastname': 'Missing required property: lastname',
			});
		});
	});

	describe('#isValid', () => {
		it('should return false on error', () => {
			// given
			const schema = {
				key: ['firstname'],
			};
			const errors = { firstname: 'this is not ok' };

			// when
			const valid = isValid(schema, errors);

			// then
			expect(valid).toBe(false);
		});

		it('should return false on nested property error', () => {
			// given
			const schema = {
				key: ['user'],
				items: [
					{ key: ['user', 'lastname'] },
					{ key: ['user', 'firstname'] },
				],
			};
			const errors = { 'user,firstname': 'this is not ok' };

			// when
			const valid = isValid(schema, errors);

			// then
			expect(valid).toBe(false);
		});

		it('should return true when schema has no error', () => {
			// given
			const schema = {
				key: ['user'],
				items: [
					{ key: ['user', 'lastname'] },
					{ key: ['user', 'firstname'] },
				],
			};
			const errors = {};

			// when
			const valid = isValid(schema, errors);

			// then
			expect(valid).toBe(true);
		});
	});
});
