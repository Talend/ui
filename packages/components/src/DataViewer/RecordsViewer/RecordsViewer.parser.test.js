import {
	findSchemaUnion,
	getChilds,
	getItemType,
	getItemValue,
	getJSONPath,
	getNextSchemaItems,
	getObjectBranchDatakey,
	getSchemaUnion,
	transformArrayBranch,
	transformObjectBranch,
} from './RecordsViewer.parser';

describe('#getNextSchemaItems', () => {
	describe('it should return the next schema', () => {
		it('when schema.type.items', () => {
			const nextItems = {
				type: 'record',
				name: 'devices',
				fields: [
					{
						name: 'name',
						type: {
							type: 'string',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 24,
								'-1': 0,
								total: 24,
							},
						},
					},
				],
				'@talend-quality@': {
					0: 0,
					1: 24,
					'-1': 0,
					total: 24,
				},
			};
			const schema = {
				name: 'devices',
				type: {
					type: 'array',
					items: nextItems,
					'@talend-quality@': {
						0: 0,
						1: 12,
						'-1': 0,
						total: 12,
					},
				},
			};
			expect(getNextSchemaItems(schema)).toEqual(nextItems);
		});
		it('when schema.type.values', () => {
			const nextItems = {
				'@talend-quality@': {
					0: 0,
					1: 24,
					'-1': 0,
					total: 24,
				},
				fields: [
					{
						type: {
							type: 'string',
						},
						name: 'device',
					},
				],
				type: 'object',
			};
			const schema = {
				name: 'devices',
				type: {
					type: 'map',
					name: 'device1',
					values: {
						'@talend-quality@': {
							0: 0,
							1: 24,
							'-1': 0,
							total: 24,
						},
						fields: [
							{
								type: {
									type: 'string',
								},
								name: 'device',
							},
						],
						type: 'object',
					},
					'@talend-quality@': {
						0: 0,
						1: 12,
						'-1': 0,
						total: 12,
					},
				},
			};
			expect(getNextSchemaItems(schema)).toEqual(nextItems);
		});
		it('when schema.type.fields', () => {
			const nextItems = [
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
					name: 'city',
					type: {
						type: 'string',
						dqType: '',
						dqTypeKey: '',
						'@talend-quality@': {
							0: 0,
							1: 599,
							'-1': 0,
							total: 599,
						},
					},
				},
			];
			const schema = {
				name: 'address',
				type: {
					type: 'record',
					name: 'Address',
					fields: nextItems,
					'@talend-quality@': {
						0: 0,
						1: 525,
						'-1': 74,
						total: 599,
					},
				},
			};
			expect(getNextSchemaItems(schema)).toEqual(nextItems);
		});
	});
	it('when schema.fields', () => {
		const nextSchemaItems = [
			{
				name: 'field0',
				type: {
					type: 'string',
					dqType: 'FR Commune',
					dqTypeKey: 'FR_COMMUNE',
					'@talend-quality@': {
						0: 0,
						1: 1421,
						'-1': 1617,
						total: 3038,
					},
				},
			},
			{
				name: 'field1',
				type: {
					type: 'string',
					dqType: '',
					dqTypeKey: '',
					'@talend-quality@': {
						0: 0,
						1: 3038,
						'-1': 0,
						total: 3038,
					},
				},
			},
		];
		const schema = {
			type: 'record',
			name: 'StringArrayRecord',
			fields: nextSchemaItems,
			'@talend-quality@': {
				0: 0,
				1: 1336,
				'-1': 1702,
				total: 3038,
			},
			'@talend-global-quality@': {
				0: 9278,
				1: 19278,
				'-1': 1824,
				total: 30380,
			},
		};
		expect(getNextSchemaItems(schema)).toEqual(nextSchemaItems);
	});
	it('when schema.type', () => {
		const nextItems = {
			type: 'string',
			dqType: '',
			dqTypeKey: '',
			'@talend-quality@': {
				0: 595,
				1: 603,
				'-1': 0,
				total: 1198,
			},
		};
		const schema = {
			name: 'lines',
			type: {
				type: 'array',
				items: nextItems,
				'@talend-quality@': {
					0: 0,
					1: 599,
					'-1': 0,
					total: 599,
				},
			},
		};
		expect(getNextSchemaItems(schema)).toEqual(nextItems);
	});
	it('when schema.items', () => {
		const nextItems = {
			type: 'record',
			name: 'something',
			fields: [
				{
					name: 'anotherThing',
					type: [
						{
							type: 'string',
						},
						{
							type: 'null',
						},
					],
				},
			],
		};

		const schema = {
			name: 'something',
			type: 'array',
			items: nextItems,
		};
		expect(getNextSchemaItems(schema)).toEqual(nextItems);
	});
	it('when there is no direct fields or type', () => {
		const schema = 'string';
		expect(getNextSchemaItems(schema)).toEqual(schema);
	});
});

describe('#transformObjectBranch', () => {
	it('should return an array when there values attr in schema', () => {
		const schema = {
			name: 'addresses',
			type: {
				type: 'map',
				values: {
					type: 'record',
					name: 'Address',
					fields: [
						{
							name: 'line',
							type: {
								type: 'string',
							},
						},
						{
							name: 'postalCode',
							type: {
								type: 'string',
							},
						},
						{
							name: 'city',
							type: {
								type: 'string',
							},
						},
					],
				},
			},
		};
		const itemChilds = {
			home: {
				value: {
					line: {
						value: 'Grande Rue, 101',
						quality: 1,
						unionKey: 'string',
					},
					postalCode: {
						value: '78588',
						quality: 1,
						unionKey: 'string',
					},
					city: {
						value: 'Alès',
						quality: 1,
						unionKey: 'string',
					},
				},
				quality: 1,
				unionKey: 'Address',
			},
		};
		const result = [
			{
				dataKey: 'home',
				value: {
					data: {
						quality: 1,
						unionKey: 'Address',
						value: {
							city: { quality: 1, unionKey: 'string', value: 'Alès' },
							line: { quality: 1, unionKey: 'string', value: 'Grande Rue, 101' },
							postalCode: { quality: 1, unionKey: 'string', value: '78588' },
						},
					},
					schema: {
						fields: [
							{
								name: 'line',
								type: {
									type: 'string',
								},
							},
							{
								name: 'postalCode',
								type: {
									type: 'string',
								},
							},
							{
								name: 'city',
								type: {
									type: 'string',
								},
							},
						],
						name: 'Address',
						type: 'record',
					},
				},
			},
		];
		expect(transformObjectBranch(itemChilds, schema)).toEqual(result);
	});
	it('should return an array that contains the next branch items', () => {
		const itemChilds = {
			name: {
				value: 'Super Mario',
				quality: 1,
			},
			rating: {
				value: 19,
				quality: 1,
			},
			comments: {
				value: [
					{
						value: 'quis eu ea dolore et',
						quality: 1,
					},
					{
						value: 'pariatur cupidatat ea labore amet',
						quality: 1,
					},
				],
				quality: 1,
			},
		};
		const schema = {
			name: 'someObjectValue',
			type: {
				name: 'record',
				fields: [
					{
						name: 'name',
						type: {
							type: 'string',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 48,
								'-1': 0,
								total: 48,
							},
						},
					},
					{
						name: 'rating',
						type: {
							type: 'long',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 48,
								'-1': 0,
								total: 48,
							},
						},
					},
					{
						name: 'comments',
						type: {
							type: 'array',
							items: {
								type: 'string',
								dqType: '',
								dqTypeKey: '',
								'@talend-quality@': {
									0: 0,
									1: 96,
									'-1': 0,
									total: 96,
								},
							},
							'@talend-quality@': {
								0: 0,
								1: 48,
								'-1': 0,
								total: 48,
							},
						},
					},
				],
			},
		};
		const result = [
			{
				dataKey: 'name',
				value: {
					schema: {
						name: 'name',
						type: {
							type: 'string',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 48,
								'-1': 0,
								total: 48,
							},
						},
					},
					data: {
						value: 'Super Mario',
						quality: 1,
					},
				},
			},
			{
				dataKey: 'rating',
				value: {
					schema: {
						name: 'rating',
						type: {
							type: 'long',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 48,
								'-1': 0,
								total: 48,
							},
						},
					},
					data: {
						value: 19,
						quality: 1,
					},
				},
			},
			{
				dataKey: 'comments',
				value: {
					schema: {
						name: 'comments',
						type: {
							type: 'array',
							items: {
								type: 'string',
								dqType: '',
								dqTypeKey: '',
								'@talend-quality@': {
									0: 0,
									1: 96,
									'-1': 0,
									total: 96,
								},
							},
							'@talend-quality@': {
								0: 0,
								1: 48,
								'-1': 0,
								total: 48,
							},
						},
					},
					data: {
						value: [
							{
								value: 'quis eu ea dolore et',
								quality: 1,
							},
							{
								value: 'pariatur cupidatat ea labore amet',
								quality: 1,
							},
						],
						quality: 1,
					},
				},
			},
		];
		expect(transformObjectBranch(itemChilds, schema)).toEqual(result);
	});
});

describe('#transformArrayBranch', () => {
	it('should return an array that contains the next branch items', () => {
		const itemChilds = [
			{
				value: 'quis eu ea dolore et',
				quality: 1,
			},
			{
				value: 'pariatur cupidatat ea labore amet',
				quality: 1,
			},
		];
		const schema = {
			name: 'comments',
			type: {
				type: 'array',
				items: {
					type: 'string',
					dqType: '',
					dqTypeKey: '',
					'@talend-quality@': {
						0: 0,
						1: 96,
						'-1': 0,
						total: 96,
					},
				},
				'@talend-quality@': {
					0: 0,
					1: 48,
					'-1': 0,
					total: 48,
				},
			},
		};

		const result = [
			{
				dataKey: 0,
				value: {
					schema: {
						type: 'string',
						dqType: '',
						dqTypeKey: '',
						'@talend-quality@': {
							0: 0,
							1: 96,
							'-1': 0,
							total: 96,
						},
					},
					data: {
						value: 'quis eu ea dolore et',
						quality: 1,
					},
				},
			},
			{
				dataKey: 1,
				value: {
					schema: {
						type: 'string',
						dqType: '',
						dqTypeKey: '',
						'@talend-quality@': {
							0: 0,
							1: 96,
							'-1': 0,
							total: 96,
						},
					},
					data: {
						value: 'pariatur cupidatat ea labore amet',
						quality: 1,
					},
				},
			},
		];
		expect(transformArrayBranch(itemChilds, schema)).toEqual(result);
	});
});

describe('#getItemValue', () => {
	describe('should return the value from the item', () => {
		it('when item.value', () => {
			const item = {
				value: {
					field0: {
						value: 'Avignon TGV',
						quality: -1,
					},
				},
				quality: -1,
			};
			expect(getItemValue(item)).toEqual({
				field0: {
					value: 'Avignon TGV',
					quality: -1,
				},
			});
		});
		it('when item.data.value', () => {
			const item = {
				data: {
					value: [
						{
							value: 'deserunt enim est anim ea',
							quality: 1,
						},
						{
							value: 'eiusmod laboris consequat exercitation labore',
							quality: 1,
						},
						{
							value: 'aute voluptate exercitation elit consequat',
							quality: 1,
						},
					],
					quality: 1,
				},
			};
			expect(getItemValue(item)).toEqual([
				{
					value: 'deserunt enim est anim ea',
					quality: 1,
				},
				{
					value: 'eiusmod laboris consequat exercitation labore',
					quality: 1,
				},
				{
					value: 'aute voluptate exercitation elit consequat',
					quality: 1,
				},
			]);
		});
		it('when item is byte', () => {
			const item = {
				data: {
					value: {
						bytes: '\u0093fj5¼u\u0011\u0012\u008C\u009D\u008B',
					},
				},
			};
			expect(getItemValue(item)).toBe(item.data.value.bytes);
		});
	});
});

describe('#getChilds', () => {
	describe('return an array of the next branch of items', () => {
		it('when type is an object', () => {
			const item = {
				schema: {
					name: 'subRecord',
					type: {
						type: 'record',
						fields: [
							{
								name: 'name',
								type: {
									type: 'string',
									dqType: '',
									dqTypeKey: '',
									'@talend-quality@': {
										0: 0,
										1: 48,
										'-1': 0,
										total: 48,
									},
								},
							},
						],
					},
				},
				data: {
					value: {
						name: {
							value: 'The Legend of Zelda',
							quality: 1,
						},
					},
					quality: 1,
				},
			};
			const schema = {
				name: 'subRecord',
				type: {
					type: 'record',
					fields: [
						{
							name: 'name',
							type: {
								type: 'string',
								dqType: '',
								dqTypeKey: '',
								'@talend-quality@': {
									0: 0,
									1: 48,
									'-1': 0,
									total: 48,
								},
							},
						},
					],
				},
			};
			expect(getChilds(item, schema, 'object')).toEqual([
				{
					dataKey: 'name',
					value: {
						data: { quality: 1, value: 'The Legend of Zelda' },
						schema: {
							name: 'name',
							type: {
								'@talend-quality@': { '-1': 0, 0: 0, 1: 48, total: 48 },
								dqType: '',
								dqTypeKey: '',
								type: 'string',
							},
						},
					},
				},
			]);
		});
		it('when type is an array', () => {
			const item = {
				schema: {
					name: 'comments',
					type: {
						type: 'array',
						items: {
							type: 'string',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 96,
								'-1': 0,
								total: 96,
							},
						},
						'@talend-quality@': {
							0: 0,
							1: 48,
							'-1': 0,
							total: 48,
						},
					},
				},
				data: {
					value: [
						{
							value: 'deserunt enim est anim ea',
							quality: 1,
						},
						{
							value: 'eiusmod laboris consequat exercitation labore',
							quality: 1,
						},
						{
							value: 'aute voluptate exercitation elit consequat',
							quality: 1,
						},
					],
					quality: 1,
				},
			};
			const schema = {
				name: 'comments',
				type: {
					type: 'array',
					items: {
						type: 'string',
						dqType: '',
						dqTypeKey: '',
						'@talend-quality@': {
							0: 0,
							1: 96,
							'-1': 0,
							total: 96,
						},
					},
					'@talend-quality@': {
						0: 0,
						1: 48,
						'-1': 0,
						total: 48,
					},
				},
			};
			expect(getChilds(item, schema, 'array')).toEqual([
				{
					dataKey: 0,
					value: {
						data: { quality: 1, value: 'deserunt enim est anim ea' },
						schema: {
							'@talend-quality@': { '-1': 0, 0: 0, 1: 96, total: 96 },
							dqType: '',
							dqTypeKey: '',
							type: 'string',
						},
					},
				},
				{
					dataKey: 1,
					value: {
						data: {
							quality: 1,
							value: 'eiusmod laboris consequat exercitation labore',
						},
						schema: {
							'@talend-quality@': { '-1': 0, 0: 0, 1: 96, total: 96 },
							dqType: '',
							dqTypeKey: '',
							type: 'string',
						},
					},
				},
				{
					dataKey: 2,
					value: {
						data: { quality: 1, value: 'aute voluptate exercitation elit consequat' },
						schema: {
							'@talend-quality@': { '-1': 0, 0: 0, 1: 96, total: 96 },
							dqType: '',
							dqTypeKey: '',
							type: 'string',
						},
					},
				},
			]);
		});
	});
});

describe('#defaultGetValueType', () => {
	describe('should return the type of the item', () => {
		it('when array', () => {
			const item = {
				data: {
					value: [
						{
							value: 'deserunt enim est anim ea',
							quality: 1,
						},
						{
							value: 'eiusmod laboris consequat exercitation labore',
							quality: 1,
						},
						{
							value: 'aute voluptate exercitation elit consequat',
							quality: 1,
						},
					],
					quality: 1,
				},
			};
			expect(getItemType(item)).toEqual('array');
		});
		it('when null', () => {
			const item = {
				data: {
					value: null,
					quality: 0,
				},
			};
			expect(getItemType(item)).toEqual('string');
		});
		it('when value is string', () => {
			const item = {
				data: {
					value: 'Japan',
					quality: 1,
				},
			};
			expect(getItemType(item)).toEqual('string');
		});
		it('when bytes', () => {
			const item = {
				data: {
					value: { bytes: '\u0093fj5¼u\u0011\u0012\u008C\u009D\u008B' },
				},
			};
			expect(getItemType(item)).toEqual('string');
		});
	});
});

describe('#getSchemaUnion', () => {
	it('should return the schema from the type', () => {
		const schema = {
			name: 'attributes',
			type: [
				{
					type: 'record',
					name: 'attributes',
					fields: [
						{
							name: 'good_for',
						},
					],
					'@talend-quality@': {
						0: 0,
						1: 1000,
						'-1': 0,
						total: 1000,
					},
				},
				'null',
			],
		};
		const data = {
			data: {
				value: {
					good_for: {
						quality: 1,
						unionKey: 'good_for',
					},
				},
				quality: 1,
				unionKey: 'attributes',
			},
		};
		expect(getSchemaUnion(data, schema)).toEqual({
			'@talend-quality@': { '-1': 0, 0: 0, 1: 1000, total: 1000 },
			fields: [{ name: 'good_for' }],
			name: 'attributes',
			type: 'record',
		});
	});
});

describe('#findSchemaUnion', () => {
	it('should return false', () => {
		const schema = { type: 'anObject' };
		const unionKey = 'myKey';
		expect(findSchemaUnion(schema, unionKey)).toBe(false);
	});
	it('should return undefined', () => {
		const schema = { type: [{ name: 'anotherKey' }] };
		const unionKey = 'myKey';
		expect(findSchemaUnion(schema, unionKey)).toBe(undefined);
	});
	it('should return an object', () => {
		const schema = { type: [{ name: 'myKey', data: {} }] };
		const unionKey = 'myKey';
		expect(findSchemaUnion(schema, unionKey)).toBe(schema.type[0]);
	});
	it('should return an object', () => {
		const schema = { type: [{ type: 'myKey', data: {} }] };
		const unionKey = 'myKey';
		expect(findSchemaUnion(schema, unionKey)).toBe(schema.type[0]);
	});
});

describe('#defaultGetJSONPath', () => {
	it('should return a jsonpath', () => {
		// given
		const dataKey = 'lastName';
		const parent = {
			jsonpath: '$',
			type: 'object',
			value: {
				dataKey: 'lastName',
				value: {
					schema: {
						name: 'lastName',
						type: {
							type: 'string',
							dqType: 'Last Name',
							'@talend-quality@': {
								0: 0,
								1: 6,
								'-1': 0,
								total: 6,
							},
						},
					},
					data: {
						value: 'Dupuis',
						quality: 1,
						unionKey: 'string',
					},
				},
			},
		};
		// when
		const result = getJSONPath(dataKey, parent);
		// then
		expect(result).toEqual("$['lastName']");
	});
	/*
		Commented test check the getJSonpath func in parser,
		for more info.
	it('should return a jsonpath with union', () => {
		// given
		const dataKey = 'address';
		const parent = {
			jsonpath: '$',
			type: 'object',
			value: {
				dataKey: 'address',
				value: {
					schema: {
						name: 'address',
						type: [
							{
								type: 'record',
								name: 'Coordinates',
								dqType: 'Address Line',
								'@talend-quality@': {
									0: 0,
									1: 1,
									'-1': 0,
									total: 1,
								},
							},
							{
								type: 'null',
								dqType: 'Address Line',
								'@talend-quality@': {
									0: 3,
									1: 0,
									'-1': 0,
									total: 3,
								},
							},
						],
					},
					data: {
						value: {
							latitude: {
								value: 1289.3,
								quality: 1,
								unionKey: 'double',
							},
							longitude: {
								value: 0.8,
								quality: 1,
								unionKey: 'double',
							},
						},
						quality: 1,
						unionKey: 'Coordinates',
					},
				},
			},
		};
		// when
		const result = getJSONPath(dataKey, parent);
		// then
		expect(result).toEqual("$['address']['Coordinates']");
	});
	*/
});
describe('#getObjectBranchDatakey', () => {
	it('should return the union key', () => {
		// given
		const dataKey = 'address';
		const value = {
			schema: {
				name: 'address',
				type: [
					{
						type: 'record',
						name: 'Coordinates',
					},
					{
						type: 'record',
						name: 'Postal',
					},
					{
						type: 'null',
					},
				],
			},
			data: {
				value: {},
				quality: 1,
				unionKey: 'Coordinates',
			},
		};
		// when
		const result = getObjectBranchDatakey(dataKey, value);
		// then
		expect(result).toEqual('Coordinates');
	});
	it('should return the union key', () => {
		// given
		const dataKey = 'address';
		const value = {
			schema: {
				name: 'address',
				type: [
					{
						type: 'array',
						name: 'Coordinates',
						items: {
							name: 'SomeCoordinates',
							type: 'string',
						},
					},
					{
						type: 'null',
					},
				],
			},
			data: {
				value: {},
				quality: 1,
				unionKey: 'Coordinates',
			},
		};
		// when
		const result = getObjectBranchDatakey(dataKey, value);
		// then
		expect(result).toEqual('SomeCoordinates');
	});
	it('should return the datakey', () => {
		// given
		const dataKey = 0;
		const value = {
			value: {},
		};
		// when
		const result = getObjectBranchDatakey(dataKey, value);
		// then
		expect(result).toEqual(dataKey);
	});
});
