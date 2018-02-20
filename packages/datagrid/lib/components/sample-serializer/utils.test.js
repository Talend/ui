'use strict';

var _utils = require('./utils');

var sample = {
	schema: {
		type: 'record',
		name: 'StringArrayRecord',
		fields: [{
			name: 'field0',
			doc: 'Nom de la gare',
			type: {
				type: 'string',
				dqType: 'FR Commune',
				dqTypeKey: 'FR_COMMUNE'
			},
			'@talend-quality@': {
				0: 0,
				1: 38,
				'-1': 62
			}
		}, {
			name: 'field1',
			doc: 'Code UIC',
			type: {
				type: 'int',
				dqType: '',
				dqTypeKey: ''
			},
			'@talend-quality@': {
				0: 0,
				1: 100,
				'-1': 0
			}
		}]
	},
	data: [{
		value: {
			field2: {
				value: '95716',
				quality: 1
			},
			field8: {
				value: '10771660',
				quality: 0
			},
			field5: {
				value: '33929307',
				quality: -1
			},
			field4: {
				value: '10748798',
				quality: 1
			},
			field7: {
				value: '11030795',
				quality: 1
			},
			field3: {
				value: '',
				quality: 1
			},
			field1: {
				value: '271494',
				quality: 1
			},
			field0: {
				value: 'Aéroport Charles de Gaulle 2 TGV',
				quality: 1
			},
			field9: {
				value: '10880464',
				quality: 1
			},
			field6: {
				value: '10920487',
				quality: 1
			}
		},
		quality: 1
	}, {
		value: {
			field4: {
				value: '9560',
				quality: 1
			},
			field2: {
				value: '2190',
				quality: 1
			},
			field1: {
				value: '171702',
				quality: 0
			},
			field3: {
				value: 'c',
				quality: -1
			},
			field0: {
				value: 'Aguilcourt-Variscourt',
				quality: 1
			},
			field9: {
				value: '',
				quality: -1
			},
			field7: {
				value: '',
				quality: 0
			},
			field5: {
				value: '',
				quality: 0
			},
			field6: {
				value: '9812',
				quality: 1
			},
			field8: {
				value: '8919',
				quality: 1
			}
		},
		quality: 1
	}],
	encoding: 'JSON',
	'@talend-quality@': {
		0: 30,
		1: 62,
		'-1': 7
	}
};

describe('#getColumnDefsFromSample', function () {
	it('should returns the columns definitions', function () {
		var columnDefs = (0, _utils.getColumnDefsFromSample)(sample);

		expect(columnDefs).toMatchSnapshot();
	});

	it('should returns an empty columns definitions', function () {
		var columnDefs = (0, _utils.getColumnDefsFromSample)();

		expect(columnDefs).toEqual([]);
	});
});

describe('#getRowDataFromSample', function () {
	it('should returns the row data', function () {
		var rowData = (0, _utils.getRowDataFromSample)(sample);

		expect(rowData).toMatchSnapshot();
	});

	it('should returns an empty row data', function () {
		var rowData = (0, _utils.getRowDataFromSample)();

		expect(rowData).toEqual([]);
	});
});

describe('#getPinnedColumnDefsFromSample', function () {
	it('should returns the pinned columns defintions', function () {
		var pinnedColumnsDefs = (0, _utils.getPinnedColumnDefsFromSample)(sample);

		expect(pinnedColumnsDefs).toMatchSnapshot();
	});

	it('should returns an empty row data', function () {
		var pinnedColumnsDefs = (0, _utils.getPinnedColumnDefsFromSample)();

		expect(pinnedColumnsDefs).toEqual([]);
	});
});

describe('#valueGetterFromRowData', function () {
	it('should returns the pinned columns defintions', function () {
		var value = (0, _utils.valueGetterFromRowData)({
			colDef: {
				field: 'colId'
			},
			data: {
				colId: 'myData'
			}
		});

		expect(value).toMatchSnapshot('myData');
	});
});