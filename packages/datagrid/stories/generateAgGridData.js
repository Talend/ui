function generateHeaders(columnsCount) {
	return Array(columnsCount)
		.fill({})
		.map((item, index) => ({
			field: `field${index}`,
			headerName: `field${index}`,
		}));
}

function makeid(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function generateRow(columnsCount) {
	return Array(columnsCount)
		.fill({})
		.reduce((acc, _, index) => ({ [`field${index}`]: makeid(10), ...acc }), {});
}

function generateAgGridRows(rowCount, columnsCount) {
	return Array(rowCount)
		.fill({})
		.map(() => generateRow(columnsCount));
}

export default function generateAgGridData(rowCount, columnsCount) {
	return {
		columnDefs: generateHeaders(columnsCount),
		rowData: generateAgGridRows(rowCount, columnsCount),
	};
}
