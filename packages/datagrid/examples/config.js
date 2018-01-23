const ROWS_NUMBER = 10000;
const COLUMNS_NUMBER = 20;

const columnDefs = Array(COLUMNS_NUMBER)
	.fill()
	.map((item, index) => ({
		field: `col${index}`,
	}));

const rowData = Array(ROWS_NUMBER)
	.fill()
	.map((item, index) => ({
		...Array(COLUMNS_NUMBER)
			.fill()
			.reduce(
				(acc, column, indexColumn) => ({
					...acc,
					[`col${indexColumn}`]: `row${index} col${indexColumn}`,
				}),
				{},
			),
	}));

export { rowData, columnDefs };
