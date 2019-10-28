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

function makeid(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function generateRow(columnsCount) {
	return Array(columnsCount)
		.fill({})
		.reduce(
			(acc, _, index) => ({ [`field${index}`]: { value: makeid(10), quality: 1 }, ...acc }),
			{},
		);
}

function generateRows(rowCount, columnsCount) {
	return Array(rowCount)
		.fill({})
		.map(() => ({
			value: generateRow(columnsCount),
			quality: 1,
		}));
}

// function generateAgGridRows(rowCount, columnsCount) {
// 	const dataRow = Array(columnsCount)
// 		.fill({})
// 		.reduce((acc, _, index) => ({ [`field${index}`]: 1 }), {});
//
// 	return Array(rowCount)
// 		.fill({})
// 		.map(() => dataRow);
// }

// export function generateAgGridData(rowCount, columnsCount) {
// 	return {
// 		schema: {
// 			type: 'record',
// 			name: 'StringArrayRecord',
// 			fields: generateHeaders(columnsCount),
// 		},
// 		data: generateAgGridRows(rowCount, columnsCount),
// 		encoding: 'JSON',
// 		'@talend-quality@': {
// 			0: 30,
// 			1: 62,
// 			'-1': 7,
// 		},
// 	};
// }

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
