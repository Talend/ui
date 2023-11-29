import chai from 'chai';
import { describe, it } from 'mocha';
import { defaultForm, createDefaults } from './schema-defaults';
import { merge } from './merge';

chai.should();

// describe('merge.js', () => {
//   it('should hold functions for generating a default form schema from defaults it creates', () => {
//     defaultForm.should.be.an('function');
//     createDefaults.should.be.an('function');
//   });
//
//   describe('createDefaults', () => {
//     it('should create default rules', () => {
//       const rules = createDefaults();
//       rules.should.be.an('object');
//     });
//   });
// });

describe('merge.js', () => {
	const schema = {
		type: 'object',
		properties: {
			name: {
				title: 'Name',
				description: 'Gimme yea name lad',
				type: 'string',
			},
			shoe: {
				title: 'Shoes',
				description: 'Shoe details',
				type: 'array',
				items: {
					type: 'object',
					properties: {
						brand: { type: 'string' },
					},
				},
			},
			gender: {
				readOnly: true,
				title: 'Choose',
				type: 'string',
				enum: ['undefined', 'null', 'NaN'],
			},
		},
	};

	const stdForm = defaultForm(schema, createDefaults());

	it('should contain a function for merging schema and form definitions', () => {
		merge.should.be.an('function');
	});

	describe('merge', () => {
		it('should handle a schema lookup or schema for first argument', () => {
			merge(stdForm.lookup, ['name', 'shoe', 'gender']).should.be.deep.equal(stdForm.form);
			merge(schema, ['*']).should.be.deep.equal(stdForm.form);
		});

		it('should handle a wildcard * in the form definition', () => {
			merge(schema, ['*']).should.be.deep.equal(stdForm.form);
		});

		it('should not handle a wildcard * if the schema is a lookup and cannot be inserted', () => {
			merge(stdForm.lookup, ['*']).should.not.be.deep.equal(stdForm.form);
		});

		it('should handle a rest "..." key in the form definition', () => {
			merge(schema, ['...', 'gender']).should.be.deep.equal(stdForm.form);
		});

		it('should not handle a rest "..." key in the form definition when the schema is a lookup and cannot be inserted', () => {
			merge(stdForm.lookup, ['...', 'gender']).should.not.be.deep.equal(stdForm.form);
		});

		it('should combine a schema and form definition, regardless of order', () => {
			merge(schema, ['name', 'shoe', 'gender']).should.be.deep.equal(stdForm.form);
			merge(schema, ['gender']).should.be.deep.equal([stdForm.form[2]]);
			merge(schema, ['gender', 'name']).should.be.deep.equal([stdForm.form[2], stdForm.form[0]]);
		});

		it('should allow items that are not in the schema', () => {
			merge(schema, ['*', { type: 'fieldset' }]).should.be.deep.equal(
				stdForm.form.concat([{ type: 'fieldset' }]),
			);
		});

		it('should translate "readOnly" in schema to "readonly" on the merged form defintion', () => {
			var merged = merge(schema, ['gender']);
			merged[0].should.have.property('readonly');
			merged[0].readonly.should.eq(true);
		});

		it('should push readOnly in schema down into objects and arrays', () => {
			let subschema = {
				type: 'object',
				readOnly: true,
				properties: {
					sub: {
						type: 'object',
						properties: {
							array: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										foo: {
											type: 'string',
										},
									},
								},
							},
						},
					},
				},
			};

			var merged = merge(subschema, ['*']);

			//sub
			merged[0].should.have.property('readonly');
			merged[0].readonly.should.eq(true);

			//array
			merged[0].items[0].should.have.property('readonly');
			merged[0].items[0].readonly.should.eq(true);

			//array items
			merged[0].items[0].items[0].should.have.property('readonly');
			merged[0].items[0].items[0].readonly.should.eq(true);
		});

		it('should push readonly in form def down into objects and arrays', () => {
			let subschema = {
				type: 'object',
				properties: {
					sub: {
						type: 'object',
						properties: {
							array: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										foo: {
											type: 'string',
										},
									},
								},
							},
						},
					},
				},
			};

			var merged = merge(subschema, [{ key: 'sub', readonly: true }]);

			//sub
			merged[0].should.have.property('readonly');
			merged[0].readonly.should.eq(true);

			//array
			merged[0].items[0].should.have.property('readonly');
			merged[0].items[0].readonly.should.eq(true);

			//array items
			merged[0].items[0].items[0].should.have.property('readonly');
			merged[0].items[0].items[0].readonly.should.eq(true);
		});
	});
});
