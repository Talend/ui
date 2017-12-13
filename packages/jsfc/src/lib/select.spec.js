import chai from 'chai';
import { describe, it } from 'mocha';
import { defaultForm, createDefaults } from './schema-defaults';

chai.should();

describe('schema-defaults.js', () => {
	it('should hold functions for generating a default form schema from defaults it creates', () => {
		defaultForm.should.be.an('function');
		createDefaults.should.be.an('function');
	});

	describe('createDefaults', () => {
		it('should create default rules', () => {
			const rules = createDefaults();
			rules.should.be.an('object');
		});
	});

	describe('defaultForm', () => {
		it('should generate default form def from a schema', () => {
			const schema = {
				type: 'object',
				properties: {
					name: {
						title: 'Name',
						description: 'Gimme yea name lad',
						type: 'string',
					},
					gender: {
						title: 'Choose',
						type: 'string',
						enum: ['undefined', 'null', 'NaN'],
					},
					overEighteen: {
						title: 'Are you over 18 years old?',
						type: 'boolean',
						default: false,
					},
					attributes: {
						type: 'object',
						required: ['eyecolor'],
						properties: {
							eyecolor: { type: 'string', title: 'Eye color' },
							haircolor: { type: 'string', title: 'Hair color' },
							shoulders: {
								type: 'object',
								title: 'Shoulders',
								properties: {
									left: { type: 'string' },
									right: { type: 'string' },
								},
							},
						},
					},
				},
			};

			const form = [
				{
					title: 'Name',
					description: 'Gimme yea name lad',
					schema: {
						title: 'Name',
						description: 'Gimme yea name lad',
						type: 'string',
					},
					ngModelOptions: {},
					key: ['name'],
					type: 'text',
				},
				{
					title: 'Choose',
					schema: {
						title: 'Choose',
						type: 'string',
						enum: ['undefined', 'null', 'NaN'],
					},
					ngModelOptions: {},
					key: ['gender'],
					type: 'select',
					titleMap: [
						{
							name: 'undefined',
							value: 'undefined',
						},
						{
							name: 'null',
							value: 'null',
						},
						{
							name: 'NaN',
							value: 'NaN',
						},
					],
				},
				{
					title: 'Are you over 18 years old?',
					schema: {
						title: 'Are you over 18 years old?',
						type: 'boolean',
						default: false,
					},
					ngModelOptions: {},
					key: ['overEighteen'],
					type: 'checkbox',
				},
				{
					title: 'attributes',
					schema: {
						type: 'object',
						required: ['eyecolor'],
						properties: {
							eyecolor: {
								type: 'string',
								title: 'Eye color',
							},
							haircolor: {
								type: 'string',
								title: 'Hair color',
							},
							shoulders: {
								type: 'object',
								title: 'Shoulders',
								properties: {
									left: {
										type: 'string',
									},
									right: {
										type: 'string',
									},
								},
							},
						},
					},
					ngModelOptions: {},
					key: ['attributes'],
					type: 'fieldset',
					items: [
						{
							title: 'Eye color',
							required: true,
							schema: {
								type: 'string',
								title: 'Eye color',
							},
							ngModelOptions: {},
							key: ['attributes', 'eyecolor'],
							type: 'text',
						},
						{
							title: 'Hair color',
							schema: {
								type: 'string',
								title: 'Hair color',
							},
							ngModelOptions: {},
							key: ['attributes', 'haircolor'],
							type: 'text',
						},
						{
							title: 'Shoulders',
							schema: {
								type: 'object',
								title: 'Shoulders',
								properties: {
									left: {
										type: 'string',
									},
									right: {
										type: 'string',
									},
								},
							},
							ngModelOptions: {},
							key: ['attributes', 'shoulders'],
							type: 'fieldset',
							items: [
								{
									title: 'left',
									schema: {
										type: 'string',
									},
									ngModelOptions: {},
									key: ['attributes', 'shoulders', 'left'],
									type: 'text',
								},
								{
									title: 'right',
									schema: {
										type: 'string',
									},
									ngModelOptions: {},
									key: ['attributes', 'shoulders', 'right'],
									type: 'text',
								},
							],
						},
					],
				},
			];

			const f = defaultForm(schema, createDefaults());
			f.form.should.be.deep.equal(form);
		});
	});
});
