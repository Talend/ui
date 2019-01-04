import {
	adaptAdditionalRules,
	isValid,
	validateAll,
	validateArray,
	validateSimple,
	validateSingle,
	validateValue,
} from './validation';

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

	describe('#validateArray', () => {
		const schema = {
			key: ['comments'],
			items: [
				{
					key: ['comments', '', 'name'],
					title: 'Name',
					required: true,
					schema: { title: 'Name', type: 'string' },
					type: 'text',
				},
				{
					key: ['comments', '', 'email'],
					title: 'Email',
					description: 'Email will be used for evil.',
					schema: {
						title: 'Email',
						type: 'string',
						pattern: '^\\S+@\\S+$',
						description: 'Email will be used for evil.',
					},
					type: 'text',
				},
				{
					key: ['comments', '', 'comment'],
					type: 'textarea',
					rows: 3,
					title: 'Comment',
					maxlength: 20,
					validationMessage: "Don't be greedy!",
					schema: {
						title: 'Comment',
						type: 'string',
						maxLength: 20,
						validationMessage: "Don't be greedy!",
					},
				},
			],
			title: 'comments',
			required: true,
			schema: {
				type: 'array',
				maxItems: 2,
				items: {
					type: 'object',
					properties: {
						name: { title: 'Name', type: 'string' },
						email: {
							title: 'Email',
							type: 'string',
							pattern: '^\\S+@\\S+$',
							description: 'Email will be used for evil.',
						},
						comment: {
							title: 'Comment',
							type: 'string',
							maxLength: 20,
							validationMessage: "Don't be greedy!",
						},
					},
					required: ['name', 'comment'],
				},
			},
			type: 'array',
		};

		it('should validate array (not deep)', () => {
			// given
			const value = [{}, {}, {}];
			const properties = { comments: value };

			// when
			const errors = validateArray(schema, value, properties, null, false);

			// then
			expect(errors).toEqual({ comments: 'Array is too long (3), maximum 2' });
		});

		it('should validate array (deep validation)', () => {
			// given
			const value = [{}, {}, {}];
			const properties = { comments: value };

			// when
			const errors = validateArray(schema, value, properties, null, true);

			// then
			expect(errors).toEqual({
				comments: 'Array is too long (3), maximum 2',
				'comments,0,comment': null,
				'comments,0,email': null,
				'comments,0,name': 'Missing required property: name',
				'comments,1,comment': null,
				'comments,1,email': null,
				'comments,1,name': 'Missing required property: name',
				'comments,2,comment': null,
				'comments,2,email': null,
				'comments,2,name': 'Missing required property: name',
			});
		});
	});

	describe('#validateSimple', () => {
		it('should validate simple value', () => {
			// given
			const schema = {
				key: ['user', 'firstname'],
				customValidation: true,
				required: true,
				schema: {
					type: 'string',
				},
				type: 'text',
			};
			const value = '';
			const properties = { use: { firstname: value } };

			// when
			const errors = validateSimple(schema, value, properties);

			// then
			expect(errors).toEqual({ [schema.key]: 'Missing required property: firstname' });
		});
	});

	describe('#validateSingle', () => {
		const arraySchema = {
			key: ['comments'],
			items: [
				{
					key: ['comments', '', 'name'],
					title: 'Name',
					required: true,
					schema: { title: 'Name', type: 'string' },
					type: 'text',
				},
				{
					key: ['comments', '', 'email'],
					title: 'Email',
					description: 'Email will be used for evil.',
					schema: {
						title: 'Email',
						type: 'string',
						pattern: '^\\S+@\\S+$',
						description: 'Email will be used for evil.',
					},
					type: 'text',
				},
				{
					key: ['comments', '', 'comment'],
					type: 'textarea',
					rows: 3,
					title: 'Comment',
					maxlength: 20,
					validationMessage: "Don't be greedy!",
					schema: {
						title: 'Comment',
						type: 'string',
						maxLength: 20,
						validationMessage: "Don't be greedy!",
					},
				},
			],
			title: 'comments',
			required: true,
			schema: {
				type: 'array',
				maxItems: 2,
				items: {
					type: 'object',
					properties: {
						name: { title: 'Name', type: 'string' },
						email: {
							title: 'Email',
							type: 'string',
							pattern: '^\\S+@\\S+$',
							description: 'Email will be used for evil.',
						},
						comment: {
							title: 'Comment',
							type: 'string',
							maxLength: 20,
							validationMessage: "Don't be greedy!",
						},
					},
					required: ['name', 'comment'],
				},
			},
			type: 'array',
		};

		it('should validate array', () => {
			// given
			const value = [{}, {}, {}];
			const properties = { comments: value };

			// when
			const errors = validateSingle(arraySchema, value, properties, null, true);

			// then
			expect(errors).toEqual({
				comments: 'Array is too long (3), maximum 2',
				'comments,0,comment': null,
				'comments,0,email': null,
				'comments,0,name': 'Missing required property: name',
				'comments,1,comment': null,
				'comments,1,email': null,
				'comments,1,name': 'Missing required property: name',
				'comments,2,comment': null,
				'comments,2,email': null,
				'comments,2,name': 'Missing required property: name',
			});
		});

		it('should validate simple value', () => {
			// given
			const schema = {
				key: ['user', 'firstname'],
				customValidation: true,
				required: true,
				schema: {
					type: 'string',
				},
				type: 'text',
			};
			const value = '';
			const properties = { use: { firstname: value } };

			// when
			const errors = validateSingle(schema, value, properties);

			// then
			expect(errors).toEqual({ [schema.key]: 'Missing required property: firstname' });
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
				comment: null,
				'user,firstname': 'This field is invalid', // custom validation
				'user,lastname': 'Missing required property: lastname',
			});
		});

		it('should validate all fields with condition not respected', () => {
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
					required: true,
					schema: {
						type: 'string',
					},
					type: 'text',
					condition: { '==': [{ var: 'user.lastname' }, 'myName'] },
				},
				{
					key: ['comment'],
					customValidation: true,
					schema: {
						type: 'string',
					},
					type: 'textarea',
				},
			];
			const properties = {
				user: {
					lastname: 'badName',
					firstname: '',
				},
				comment: '',
			};

			// when
			const errors = validateAll(mergedSchema, properties, customValidationFn);

			// then
			expect(errors).toEqual({
				comment: 'This field is invalid', // custom validation
				'user,lastname': null,
			});
		});

		it('should validate all fields with condition respected', () => {
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
					required: true,
					schema: {
						type: 'string',
					},
					type: 'text',
					condition: { '==': [{ var: 'user.lastname' }, 'myName'] },
				},
				{
					key: ['comment'],
					customValidation: true,
					schema: {
						type: 'string',
					},
					type: 'textarea',
				},
			];
			const properties = {
				user: {
					lastname: 'myName',
					firstname: '',
				},
				comment: '',
			};

			// when
			const errors = validateAll(mergedSchema, properties, customValidationFn);

			// then
			expect(errors).toEqual({
				comment: 'This field is invalid', // custom validation
				'user,firstname': 'Missing required property: firstname',
				'user,lastname': null,
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
				items: [{ key: ['user', 'lastname'] }, { key: ['user', 'firstname'] }],
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
				items: [{ key: ['user', 'lastname'] }, { key: ['user', 'firstname'] }],
			};
			const errors = {};

			// when
			const valid = isValid(schema, errors);

			// then
			expect(valid).toBe(true);
		});
	});

	describe('#adaptAdditionalRules', () => {
		it('should adapt mergedSchema to avoid enum validation', () => {
			// given
			const schema = {
				key: ['gender'],
				restricted: false,
				schema: {
					key: ['gender'],
					type: 'string',
					enum: ['M', 'F'],
				},
				type: 'text',
				widget: 'datalist',
			};

			// when
			const adaptedSchema = adaptAdditionalRules(schema);

			// then
			expect(adaptedSchema).toEqual({
				key: ['gender'],
				restricted: false,
				schema: {
					key: ['gender'],
					type: 'string',
					enum: undefined, // no enum anymore
				},
				type: 'text',
				widget: 'datalist',
			});
		});

		it('should adapt mergedSchema to avoid enum validation on array', () => {
			// given
			const schema = {
				key: ['gender'],
				restricted: false,
				schema: {
					key: ['genders'],
					type: 'array',
					items: {
						type: 'string',
						enum: ['M', 'F'],
					},
				},
				type: 'text',
				widget: 'multiSelectTag',
			};

			// when
			const adaptedSchema = adaptAdditionalRules(schema);

			// then
			expect(adaptedSchema).toEqual({
				key: ['gender'],
				restricted: false,
				schema: {
					key: ['genders'],
					type: 'array',
					items: {
						type: 'string',
						enum: undefined,
					},
				},
				type: 'text',
				widget: 'multiSelectTag',
			});
		});
	});
});
