function generateHeaders(columnsCount) {
	return Array(columnsCount)
		.fill({})
		.map((item, index) => ({
			name: `field${index}`,
			doc: `field${index}`,
			type: [
				{
					type: 'string',
					dqType: 'FR Commune',
					dqTypeKey: 'FR_COMMUNE',
					'@talend-quality@': {
						0: 0,
						1: 38,
						'-1': 62,
						total: 100,
					},
				},
			],
		}));
}

function generateRows(rowCount, columnsCount) {
	const dataRow = Array(columnsCount)
		.fill({})
		.reduce((acc, _, index) => ({ [`field${index}`]: { value: null, quality: 1 }, ...acc }), {});

	return Array(rowCount)
		.fill({})
		.map(() => ({
			value: dataRow,
			quality: 1,
		}));
}

function generateAgGridRows(rowCount, columnsCount) {
	const dataRow = Array(columnsCount)
		.fill({})
		.reduce((acc, _, index) => ({ [`field${index}`]: 1 }), {});

	return Array(rowCount)
		.fill({})
		.map(() => dataRow);
}

export function generateAgGridData(rowCount, columnsCount) {
	return {
		schema: {
			type: 'record',
			name: 'StringArrayRecord',
			fields: generateHeaders(columnsCount),
		},
		data: generateAgGridRows(rowCount, columnsCount),
		encoding: 'JSON',
		'@talend-quality@': {
			0: 30,
			1: 62,
			'-1': 7,
		},
	};
}

export function generateTalendData(rowCount, columnsCount) {
	return {
		schema: {
			type: 'record',
			name: 'StringArrayRecord',
			fields: generateHeaders(columnsCount),
		},
		data: generateRows(rowCount, columnsCount),
		encoding: 'JSON',
		'@talend-quality@': {
			0: 30,
			1: 62,
			'-1': 7,
		},
	};
}
