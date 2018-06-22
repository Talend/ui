import Immutable, { fromJS } from 'immutable';

import { QUALITY_KEY } from '../../constants/';
import {
	convertSample,
	getCellValue,
	getColumnDefs,
	getFieldQuality,
	getPinnedColumnDefs,
	getQuality,
	getRowData,
	getType,
	sanitizeAvro,
} from './datasetSerializer';

const sample = {
	schema: {
		type: 'record',
		name: 'StringArrayRecord',
		fields: [
			{
				name: 'field0',
				doc: 'Nom de la gare',
				type: {
					type: 'string',
					dqType: 'FR Commune',
					dqTypeKey: 'FR_COMMUNE',
				},
				'@talend-quality@': {
					0: 0,
					1: 38,
					'-1': 62,
					total: 100,
				},
			},
			{
				name: 'field1',
				doc: 'Code UIC',
				type: {
					type: 'int',
					dqType: '',
					dqTypeKey: '',
				},
				'@talend-quality@': {
					0: 0,
					1: 100,
					'-1': 0,
					total: 100,
				},
			},
		],
	},
	data: [
		{
			value: {
				field2: {
					value: '95716',
					quality: 1,
				},
				field8: {
					value: '10771660',
					quality: 0,
				},
				field5: {
					value: '33929307',
					quality: -1,
				},
				field4: {
					value: '10748798',
					quality: 1,
				},
				field7: {
					value: '11030795',
					quality: 1,
				},
				field3: {
					value: '',
					quality: 1,
				},
				field1: {
					value: '271494',
					quality: 1,
				},
				field0: {
					value: 'Aéroport Charles de Gaulle 2 TGV',
					quality: 1,
				},
				field9: {
					value: '10880464',
					quality: 1,
				},
				field6: {
					value: '10920487',
					quality: 1,
				},
			},
			quality: 1,
		},
		{
			value: {
				field4: {
					value: '9560',
					quality: 1,
				},
				field2: {
					value: '2190',
					quality: 1,
				},
				field1: {
					value: '171702',
					quality: 0,
				},
				field3: {
					value: 'c',
					quality: -1,
				},
				field0: {
					value: 'Aguilcourt-Variscourt',
					quality: 1,
				},
				field9: {
					value: '',
					quality: -1,
				},
				field7: {
					value: '',
					quality: 0,
				},
				field5: {
					value: '',
					quality: 0,
				},
				field6: {
					value: '9812',
					quality: 1,
				},
				field8: {
					value: '8919',
					quality: 1,
				},
			},
			quality: 1,
		},
	],
	encoding: 'JSON',
	'@talend-quality@': {
		0: 30,
		1: 62,
		'-1': 7,
	},
};

describe('#getColumnDefs', () => {
	it('should returns the columns definitions', () => {
		const columnDefs = getColumnDefs(sample);

		expect(columnDefs).toMatchSnapshot();
	});

	it('should returns the columns definitions from immutable', () => {
		const columnDefs = getColumnDefs(fromJS(sample));

		expect(columnDefs).toMatchSnapshot();
	});

	it('should returns an empty columns definitions', () => {
		const columnDefs = getColumnDefs();

		expect(columnDefs).toEqual([]);
	});

	it('should returns the columns definitions with optional', () => {
		const schemaWithOptionalType = {
			schema: {
				type: 'record',
				name: 'StringArrayRecord',
				fields: [
					{
						name: 'field0',
						doc: 'Nom de la gare',
						type: [
							'null',
							{
								type: 'string',
								dqType: 'FR Commune',
								dqTypeKey: 'FR_COMMUNE',
							},
						],
						'@talend-quality@': {
							0: 0,
							1: 38,
							'-1': 62,
						},
					},
				],
			},
		};
		const columnDefs = getColumnDefs(schemaWithOptionalType);

		expect(columnDefs).toMatchSnapshot();
	});
});

describe('#getRowData', () => {
	it('should returns the row data', () => {
		const rowData = getRowData(sample);

		expect(rowData).toMatchSnapshot();
	});

	it('should returns the row data', () => {
		const rowData = getRowData(fromJS(sample));

		expect(rowData).toMatchSnapshot();
	});

	it('should returns the row data with startIndex', () => {
		const rowData = getRowData(sample, 10);

		expect(rowData).toMatchSnapshot();
	});

	it('should returns an empty row data', () => {
		const rowData = getRowData();

		expect(rowData).toEqual([]);
	});
});

describe('#getPinnedColumnDefs', () => {
	it('should returns the pinned columns defintions', () => {
		const pinnedColumnsDefs = getPinnedColumnDefs(sample);

		expect(pinnedColumnsDefs).toMatchSnapshot();
	});

	it('should returns an empty row data', () => {
		const pinnedColumnsDefs = getPinnedColumnDefs();

		expect(pinnedColumnsDefs).toEqual([]);
	});
});

describe('#getCellValue', () => {
	it('should returns the pinned columns defintions', () => {
		const value = getCellValue({
			colDef: {
				field: 'colId',
			},
			data: {
				colId: 'myData',
			},
		});

		expect(value).toBe('myData');
	});
});

describe('#getType', () => {
	it('should return the optional type', () => {
		const type = getType([{ type: 'string', dqType: '', dqTypeKey: '' }, 'null']);

		expect(type).toBe('string');
	});

	it('should return the mandatory dqType', () => {
		const type = getType({
			type: 'string',
			dqType: 'FR Commune',
			dqTypeKey: 'FR_COMMUNE',
		});

		expect(type).toBe('FR Commune*');
	});

	it('should return the type', () => {
		const type = getType({
			type: 'string',
			dqType: '',
			dqTypeKey: '',
		});

		expect(type).toBe('string*');
	});

	it('should return the forced type to optional', () => {
		const type = getType({
			type: 'string',
			dqType: '',
			dqTypeKey: '',
		});

		expect(type).toBe('string*');
	});
});

describe('getQuality', () => {
	it('should get the calculated quality', () => {
		expect(getQuality(7, 13)).toEqual({
			percentage: 54,
			total: 7,
		});
	});

	it('should prevent zero division', () => {
		expect(getQuality(0, 0)).toEqual({
			percentage: 0,
			total: 0,
		});
	});
});

describe('getFieldQuality', () => {
	it('should enrich the quality', () => {
		expect(getFieldQuality(sample.schema.fields[0][QUALITY_KEY])).toMatchSnapshot();
	});
});

describe('convertSample', () => {
	it('should return a plain sample from immutable', () => {
		const sampleData = {
			id: 42,
		};
		expect(convertSample(Immutable.Map(sampleData))).toEqual(sampleData);
	});

	it('should return the sample', () => {
		const sampleData = {
			id: 42,
		};
		expect(convertSample(sampleData)).toBe(sampleData);
	});

	describe('sanitizeAvro', () => {
		it('should sanitize the optional avro type', () => {
			const avro = sanitizeAvro({
				name: 'field0',
				doc: 'Nom de la gare',
				type: [
					'null',
					{
						type: 'string',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
				],
				'@talend-quality@': {
					0: 0,
					1: 38,
					'-1': 62,
					total: 100,
				},
			});
			expect(avro).toEqual({
				'@talend-quality@': { '-1': 62, 0: 0, 1: 38, total: 100 },
				doc: 'Nom de la gare',
				name: 'field0',
				type: { dqType: 'FR Commune', dqTypeKey: 'FR_COMMUNE', type: 'string' },
			});
		});

		it('should not sanitize', () => {
			const avro = {
				'@talend-quality@': { '-1': 62, 0: 0, 1: 38, total: 100 },
				doc: 'Nom de la gare',
				name: 'field0',
				type: { dqType: 'FR Commune', dqTypeKey: 'FR_COMMUNE', type: 'string' },
			};
			expect(sanitizeAvro(avro)).toBe(avro);
		});
	});
});
