import faker from 'faker';

const ROWS_NUMBER = 10000;
const COLUMNS_NUMBER = 20;

const schema = {
	col0: 'string',
	col1: 'number',
	col2: 'boolean',
	col3: 'date',
	col4: 'string',
	col5: 'number',
	col6: 'boolean',
	col7: 'date',
	col8: 'string',
	col9: 'number',
	col10: 'boolean',
	col11: 'date',
	col12: 'string',
	col13: 'number',
	col14: 'boolean',
	col15: 'date',
	col16: 'string',
	col17: 'number',
	col18: 'boolean',
	col19: 'date',
};

function enchancedCell({ colDef, data }) {
	return {
		quality: Math.random() < 0.05 ? -1 : 1,
		value: data[colDef.field],
		valueFormatted: data[colDef.field],
		comments: ['my comment 1', 'my comment 2'],
		type: schema[colDef.field],
	};
}

function getValue(columnIndex) {
	switch (schema[columnIndex]) {
		case 'string':
			return faker.lorem.words();
		case 'number':
			return faker.random.number();
		case 'boolean':
			return faker.random.boolean().toString();
		case 'date':
			return faker.date.past().toString();
		default:
			return 'unknown';
	}
}

const pinnedColumnDefs = [
	{
		field: 'index',
		width: 100,
	},
];

const columnDefs = Array(COLUMNS_NUMBER)
	.fill()
	.map((item, index) => ({
		field: `col${index}`,
		valueGetter: enchancedCell,
	}));

const rowData = Array(ROWS_NUMBER)
	.fill()
	.map((item, index) => ({
		...Array(COLUMNS_NUMBER)
			.fill()
			.reduce(
				(acc, column, indexColumn) => ({
					...acc,
					[`col${indexColumn}`]: getValue(`col${indexColumn}`),
				}),
				{
					index,
				},
			),
	}));

export { columnDefs, rowData, pinnedColumnDefs };
