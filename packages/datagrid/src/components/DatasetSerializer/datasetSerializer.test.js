import Immutable, { fromJS } from 'immutable';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';

import { QUALITY_KEY } from '../../constants';
import {
	convertSample,
	getCellValue,
	getColumnDefs,
	getFieldQuality,
	getPinnedColumnDefs,
	getQuality,
	getQualityValue,
	getRowData,
	getType,
	getTypeValue,
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
				type: [
					{
						'@talend-quality@': {
							0: 0,
							1: 38,
							'-1': 62,
							total: 100,
						},
						type: 'string',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
					{
						type: 'null',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
				],
			},
			{
				name: 'field1',
				type: {
					'@talend-quality@': {
						0: 0,
						1: 100,
						'-1': 0,
						total: 100,
					},
					type: 'int',
					dqType: '',
					dqTypeKey: '',
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

const sampleArrayStringType = {
	schema: {
		type: 'record',
		name: 'StringArrayRecord',
		fields: [
			{
				name: 'field1',
				doc: 'Nom de la gare',
				type: ['null', 'int'],
			},
		],
	},
	data: [
		{
			value: {
				field1: {
					value: '9560',
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

	it('should remove the sub type', () => {
		const columnDefs = getColumnDefs(sample, { hideSubType: true });

		expect(columnDefs[0].type).toBe('');
		expect(columnDefs[1].type).toBe('');
	});

	it('should returns the columns definitions with optional', () => {
		const columnDefs = getColumnDefs(sample);

		expect(columnDefs).toMatchSnapshot();
	});

	it('should returns the columns definitions with array string', () => {
		const columnDefs = getColumnDefs(sampleArrayStringType);

		expect(columnDefs).toEqual([
			{
				avro: { doc: 'Nom de la gare', name: 'field1', type: { type: 'int' } },
				field: 'data.field1',
				headerName: 'Nom de la gare',
				type: 'int',
			},
		]);
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

	it('should return the loaded state', () => {
		const clonedSample = cloneDeep(sample);
		clonedSample.data[0].loaded = false;
		const rowData = getRowData(clonedSample);

		expect(rowData[0].loaded).toBe(false);
	});

	it('should return the loaded state', () => {
		const clonedSample = cloneDeep(sample);
		clonedSample.data[0].loaded = true;
		const rowData = getRowData(clonedSample);

		expect(rowData[0].loaded).toBe(true);
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

describe('#getTypeValue', () => {
	it('should return the type with a star', () => {
		expect(getTypeValue({ type: 'hello', dqType: '' })).toEqual('hello*');
	});
	it('should return the dqType', () => {
		expect(getTypeValue({ type: 'hello', dqType: 'world' }, true)).toEqual('world');
	});

	it('should return the type with a star (type is string)', () => {
		expect(getTypeValue('string')).toEqual('string*');
	});
	it('should return the optional type (type is string)', () => {
		expect(getTypeValue('string', true)).toEqual('string');
	});
});

describe('#getType', () => {
	it('should return the optional type', () => {
		const type = getType([
			{
				'@talend-quality@': {
					0: 0,
					1: 38,
					'-1': 62,
					total: 100,
				},
				type: 'string',
				dqType: '',
				dqTypeKey: '',
			},
			{
				dqType: '',
				dqTypeKey: '',
				type: 'null',
			},
		]);

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

describe('#getQualityValue', () => {
	it('should return the quality from an array', () => {
		const type = [
			{
				'@talend-quality@': {
					0: 0,
					1: 38,
					'-1': 62,
					total: 100,
				},
				type: 'string',
				dqType: 'FR Commune',
				dqTypeKey: 'FR_COMMUNE',
			},
			{
				type: 'null',
				dqType: 'FR Commune',
				dqTypeKey: 'FR_COMMUNE',
			},
		];
		expect(getQualityValue(type)).toEqual({
			0: 0,
			1: 38,
			'-1': 62,
			total: 100,
		});
	});
	it('should return the quality from an object', () => {
		const type = {
			'@talend-quality@': {
				0: 0,
				1: 38,
				'-1': 62,
				total: 100,
			},
			type: 'string',
			dqType: 'FR Commune',
			dqTypeKey: 'FR_COMMUNE',
		};
		expect(getQualityValue(type)).toEqual({
			0: 0,
			1: 38,
			'-1': 62,
			total: 100,
		});
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
	it('should compute quality metrics if there are quality values', () => {
		expect(getFieldQuality(sample.schema.fields[0].type)).toEqual({
			'@talend-quality@': {
				'-1': { percentage: 62, total: 62 },
				0: { percentage: 0, total: 0 },
				1: { percentage: 38, total: 38 },
			},
		});
	});

	it('should return if there are no quality metrics', () => {
		expect(getFieldQuality(omit(sample.schema.fields[0].type, QUALITY_KEY))).toEqual({});
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
					{
						type: 'null',
						dqType: '',
						dqTypeKey: '',
					},
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
