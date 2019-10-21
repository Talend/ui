function generateHeaders(columnsCount) {
	return Array(columnsCount)
		.fill({})
		.map((item, index) => ({
			field: `field${index}`,
			headerName: `field${index}`,
		}));
}

function generateAgGridRows(rowCount, columnsCount) {
	const dataRow = Array(columnsCount)
		.fill({})
		.reduce((acc, _, index) => ({ [`field${index}`]: 1, ...acc }), {});

	return Array(rowCount)
		.fill({})
		.map(() => dataRow);
}

export default function generateAgGridData(rowCount, columnsCount) {
	return {
		columnDefs: generateHeaders(columnsCount),
		rowData: generateAgGridRows(rowCount, columnsCount),
	};
}
