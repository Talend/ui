
export const element1 = {
	id: 'elem_1',
	name: 'element 1',
	type: 'string',
	desc: 'Description of element 1',
};

export const element2 = {
	id: 'elem_2',
	name: 'element 2',
	type: 'string',
	desc: 'This element is a string',
};

export const columns = {
	NAME: {
		key: 'name',
		label: 'Name',
	},
	TYPE: {
		key: 'type',
		label: 'Type',
	},
	DESC: {
		key: 'desc',
		label: 'Description',
	},
};

export const columns1 = [columns.NAME, columns.TYPE, columns.DESC];

function getColumn(col) {
	return {
		key: col.key,
		label: col.label,
		headClassName: `classname-of-head-${col.key}`,
		cellClassName: `classname-of-row-data-${col.key}`,
	};
}

export const columns2 = [
	getColumn(columns.NAME),
	getColumn(columns.TYPE),
	getColumn(columns.DESC),
];

export const classnames = {
	table: 'classname-of-table',
	header: 'classname-of-table-header',
	body: 'classname-of-table-body',
	rows: ['classname-of-row-1', 'classname-of-row-2'],
};

export const rowDataGetter = {
	getElementId(element) {
		return element.id;
	},
	getRowData(element, columnKey) {
		switch (columnKey) {
			case columns.NAME.key:
				return element.name;
			case columns.TYPE.key:
				return element.type;
			case columns.DESC.key:
				return element.desc;
			default:
				return `No data available for ${columnKey}`;
		}
	},
};
