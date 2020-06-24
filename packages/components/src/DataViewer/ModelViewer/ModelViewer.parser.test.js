import {
	defaultGetDisplayKey,
	defaultGetDisplayValue,
	defaultTransformChilds,
	filterNullUnion,
	getChilds,
	getDqType,
	getItemType,
	getJSONPath,
} from './ModelViewer.container';

describe('#defaultGetDisplayValue', () => {
	describe('should return the display value from the item', () => {
		it('the doc attr', () => {
			const item = {
				doc: 'myDocValue',
				type: {
					type: 'string',
					dqType: 'First Name',
					dqTypeKey: 'FIRST_NAME',
					'@talend-quality@': {
						'-1': 0,
						1: 1000,
						0: 0,
						total: 1000,
					},
				},
			};
			expect(defaultGetDisplayValue(item)).toEqual('myDocValue');
		});
		it('the name attr', () => {
			const item = {
				name: 'myNameValue',
				type: {
					type: 'string',
					dqType: 'First Name',
					dqTypeKey: 'FIRST_NAME',
					'@talend-quality@': {
						'-1': 0,
						1: 1000,
						0: 0,
						total: 1000,
					},
				},
			};
			expect(defaultGetDisplayValue(item)).toEqual('myNameValue');
		});
	});
});

describe('#getDqType', () => {
	describe('should return the proper value from the item', () => {
		it('dqType', () => {
			const item = {
				type: 'string',
				dqType: 'myDqType',
				dqTypeKey: '',
				'@talend-quality@': {
					'-1': 0,
					1: 1000,
					0: 0,
					total: 1000,
				},
			};
			expect(getDqType(item)).toEqual('myDqType');
		});
		it('type', () => {
			const item = {
				type: 'myType',
				dqType: '',
				dqTypeKey: '',
				'@talend-quality@': {
					'-1': 0,
					1: 1000,
					0: 0,
					total: 1000,
				},
			};
			expect(getDqType(item)).toEqual('myType');
		});
	});
});

describe('#defaultGetDisplayKey', () => {
	it('should return the type when type is object', () => {
		const item = {
			name: 'myValue',
			type: {
				type: 'string',
				dqType: 'myType',
			},
		};
		expect(defaultGetDisplayKey(item)).toEqual('(myType)');
	});
	it('should return the type', () => {
		const item = {
			name: 'myValue',
			type: 'string',
			dqType: 'myType',
		};
		expect(defaultGetDisplayKey(item)).toEqual('(myType)');
	});
	it('should return nothing', () => {
		const item = {
			name: 'myValue',
		};
		expect(defaultGetDisplayKey(item)).toEqual('');
	});
});

describe('#filterOptionalUnion', () => {
	it('should return one type without null value and parent name / path', () => {
		const union = {
			name: 'name',
			type: [{ type: 'Toto' }, { type: 'null' }],
			path: 'name',
			'talend.component.label': 'readable label',
		};
		expect(filterNullUnion(union)).toEqual({
			name: union.name,
			optional: true,
			type: { type: 'Toto', name: union.name, path: union.path },
			path: union.path,
			'talend.component.label': 'readable label',
		});
	});
	it('should return one type without null value', () => {
		const union = {
			name: 'name',
			type: [{ name: 'customTypeToto', type: 'Toto' }, { type: 'null' }],
			path: 'name',
			'talend.component.label': 'readable label',
		};
		expect(filterNullUnion(union)).toEqual({
			name: union.name,
			optional: true,
			type: { type: 'Toto', name: 'customTypeToto' },
			path: union.path,
			'talend.component.label': 'readable label',
		});
	});
	it('should return an array of type without null value and parent name / path ', () => {
		const union = {
			name: 'name',
			path: 'name',
			type: [{ type: 'Toto' }, { type: 'Tata' }, { type: 'null' }],
			'talend.component.label': 'readable label',
		};
		expect(filterNullUnion(union)).toEqual({
			name: union.name,
			path: union.path,
			optional: true,
			type: [
				{ type: 'Toto', name: union.name, path: union.path },
				{ type: 'Tata', name: union.name, path: union.path },
			],
			'talend.component.label': 'readable label',
		});
	});
});

describe('#getChilds', () => {
	describe('should return an array', () => {
		it('when childs is type.items.fields', () => {
			const childs = [
				{
					name: 'id',
					type: {
						type: 'long',
					},
				},
				{
					name: 'name',
					type: {
						type: 'string',
					},
				},
			];
			const item = {
				name: 'friends',
				type: {
					type: 'array',
					items: {
						type: 'record',
						name: 'friends',
						fields: childs,
					},
				},
			};
			expect(getChilds(item)).toEqual(childs);
		});
		it('when childs is type.fields', () => {
			const childs = [
				{
					name: 'postalCode',
					type: {
						type: 'string',
					},
				},
				{
					name: 'country',
					type: {
						type: 'string',
					},
				},
			];
			const item = {
				name: 'address',
				type: {
					type: 'record',
					name: 'Address',
					fields: childs,
				},
			};
			expect(getChilds(item)).toEqual(childs);
		});
		it('when childs is item.fields', () => {
			const childs = [
				{
					name: 'firstName',
					type: {
						type: 'string',
					},
				},
				{
					name: 'lastName',
					type: {
						type: 'string',
					},
				},
			];
			const item = {
				type: 'record',
				name: 'Person',
				fields: childs,
			};
			expect(getChilds(item)).toEqual(childs);
		});
		it('when childs in item.type', () => {
			const childs = [
				{
					type: 'record',
					name: 'Day',
				},
				{
					type: 'long',
				},
			];
			const item = {
				name: 'birthday',
				type: childs,
			};
			expect(getChilds(item)).toEqual(childs);
		});
		it('when childs in item.type.symbols', () => {
			const childs = ['One', 'Two', 'Three', 'For'];
			const item = {
				name: 'enum',
				type: { symbols: childs },
			};
			expect(getChilds(item)).toEqual(childs);
		});
	});
});

describe('#defaultTransformChilds', () => {
	it('should return the childs transformed', () => {
		const item = {
			type: 'record',
			name: 'Person',
			fields: [
				{
					name: 'firstName',
					path: 'Person.firstname',
					type: {
						type: 'string',
						dqType: 'First Name',
						dqTypeKey: 'FIRST_NAME',
						'@talend-quality@': {
							0: 0,
							1: 1000,
							'-1': 0,
							total: 1000,
						},
					},
				},
				{
					name: 'midleName',
					path: 'Person.midlename',
					type: [
						{
							type: 'string',
							dqType: 'First Name',
							dqTypeKey: 'FIRST_NAME',
							'@talend-quality@': {
								0: 250,
								1: 251,
								'-1': 0,
								total: 501,
							},
						},
						{
							type: 'null',
							dqType: 'First Name',
							dqTypeKey: 'FIRST_NAME',
							'@talend-quality@': {
								0: 499,
								1: 0,
								'-1': 0,
								total: 499,
							},
						},
					],
				},
			],
			'@talend-quality@': {
				0: 0,
				1: 994,
				'-1': 6,
				total: 1000,
			},
		};
		expect(defaultTransformChilds(item)).toEqual([
			{
				dataKey: 'firstName',
				value: {
					name: 'firstName',
					path: 'Person.firstname',
					type: {
						'@talend-quality@': { '-1': 0, 0: 0, 1: 1000, total: 1000 },
						dqType: 'First Name',
						dqTypeKey: 'FIRST_NAME',
						type: 'string',
					},
				},
			},
			{
				dataKey: 'midleName',
				value: {
					name: 'midleName',
					optional: true,
					path: 'Person.midlename',
					type: {
						'@talend-quality@': { '-1': 0, 0: 250, 1: 251, total: 501 },
						name: 'midleName',
						path: 'Person.midlename',
						dqType: 'First Name',
						dqTypeKey: 'FIRST_NAME',
						type: 'string',
					},
				},
			},
		]);
	});
});

describe('#defaultGetJsonPath', () => {
	describe('it should return a jsonpath', () => {
		it('when parent type is an array', () => {
			const parent = {
				jsonpath: '$',
				type: 'array',
				value: {
					dataKey: 'friends',
					value: {
						name: 'friends',
						type: {
							type: 'array',
							item: { name: 'firends', type: 'records' },
						},
					},
				},
			};
			expect(getJSONPath('friends', parent)).toEqual("$['friends'][]");
		});
		it('when parent type is a record', () => {
			const parent = {
				jsonpath: '$',
				type: 'array',
				value: {
					dataKey: 'friends',
					value: {
						name: 'friends',
						type: {
							type: 'record',
							item: { name: 'firends', type: 'records' },
						},
					},
				},
			};
			expect(getJSONPath('friends', parent)).toEqual("$['friends']");
		});
		it('when parent type is not an array', () => {
			const parent = {
				jsonpath: '$',
				type: 'array',
				value: {
					dataKey: '_id',
					value: {
						name: '_id',
						type: {
							type: 'string',
							dqType: '',
							dqTypeKey: '',
						},
					},
				},
			};
			expect(getJSONPath('_id', parent)).toEqual("$['_id']");
		});
	});
});

describe('#defaultGetValueType', () => {
	describe('should return the value object', () => {
		it('when item.type is an union (array)', () => {
			const item = {
				name: 'address',
				type: [
					{
						type: 'record',
						name: 'AddressV1',
						'@talend-quality@': {
							0: 0,
							1: 308,
							'-1': 4,
							total: 312,
						},
					},
					{
						type: 'record',
						name: 'AddressV2',
						'@talend-quality@': {
							0: 0,
							1: 680,
							'-1': 8,
							total: 688,
						},
					},
				],
				optional: true,
			};
			expect(getItemType(item)).toEqual('object');
		});
		it('when item.fields (array)', () => {
			const item = {
				type: 'record',
				name: 'AddressV1',
				fields: [
					{
						name: 'line',
						type: {
							type: 'string',
							dqType: 'Address Line',
							dqTypeKey: 'ADDRESS_LINE',
							'@talend-quality@': {
								0: 0,
								1: 312,
								'-1': 0,
								total: 312,
							},
						},
					},
					{
						name: 'postalCode',
						type: {
							type: 'string',
							dqType: 'FR Postal Code',
							dqTypeKey: 'FR_POSTAL_CODE',
							'@talend-quality@': {
								0: 0,
								1: 308,
								'-1': 4,
								total: 312,
							},
						},
					},
				],
				'@talend-quality@': {
					0: 0,
					1: 308,
					'-1': 4,
					total: 312,
				},
			};
			expect(getItemType(item)).toEqual('object');
		});
		it('when item.type.items.fields (array)', () => {
			const item = {
				name: 'friends',
				type: {
					type: 'array',
					items: {
						type: 'record',
						name: 'friends',
						fields: [
							{
								name: 'id',
								type: {
									type: 'long',
									dqType: '',
									dqTypeKey: '',
									'@talend-quality@': {
										0: 0,
										1: 12,
										'-1': 0,
										total: 12,
									},
								},
							},
							{
								name: 'name',
								type: {
									type: 'string',
									dqType: '',
									dqTypeKey: '',
									'@talend-quality@': {
										0: 0,
										1: 12,
										'-1': 0,
										total: 12,
									},
								},
							},
						],
						'@talend-quality@': {
							0: 0,
							1: 12,
							'-1': 0,
							total: 12,
						},
					},
					'@talend-quality@': {
						0: 0,
						1: 7,
						'-1': 0,
						total: 7,
					},
				},
			};
			expect(getItemType(item)).toEqual('object');
		});
		it('when item.type.fields (array)', () => {
			const item = {
				name: 'address',
				type: {
					type: 'record',
					name: 'Address',
					fields: [
						{
							name: 'postalCode',
							type: {
								type: 'string',
								dqType: 'FR Postal Code',
								dqTypeKey: 'FR_POSTAL_CODE',
								'@talend-quality@': {
									0: 0,
									1: 534,
									'-1': 65,
									total: 599,
								},
							},
						},
						{
							name: 'country',
							type: {
								type: 'string',
								dqType: 'Country',
								dqTypeKey: 'COUNTRY',
								'@talend-quality@': {
									0: 0,
									1: 590,
									'-1': 9,
									total: 599,
								},
							},
						},
					],
					'@talend-quality@': {
						0: 0,
						1: 525,
						'-1': 74,
						total: 599,
					},
				},
			};
			expect(getItemType(item)).toEqual('object');
		});
	});
	it('should return null', () => {
		const item = {
			name: 'field0',
			type: {
				type: 'string',
				dqType: '',
				dqTypeKey: '',
				'@talend-quality@': {
					0: 2990,
					1: 48,
					'-1': 0,
					total: 3038,
				},
			},
		};
		expect(getItemType(item)).toEqual(null);
	});
});
