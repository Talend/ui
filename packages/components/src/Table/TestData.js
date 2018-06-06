// This module defines data, objects and functions used by the unit tests.

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

export const element3 = {
	id: 'elem_3',
	name: 'Firstname',
	type: 'string',
	desc: 'The firstname of the customer (optional)',
	mandatory: false,
};

export const element4 = {
	id: 'elem_4',
	name: 'Lastname',
	type: 'string',
	desc: 'The lastname of the customer (mandatory)',
	mandatory: true,
};

export const element5 = {
	id: 'elem_5',
	name: 'Birthday',
	type: 'date',
	desc: 'The birthday of the customer (optional)',
	mandatory: false,
};

export const element6 = {
	id: 'elem_6',
	name: 'Address',
	type: 'address',
	desc: 'The address of the customer (mandatory)',
	mandatory: true,
};

export const Columns = {
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
	MANDATORY: {
		key: 'mandatory',
		label: '',
	},
};

export const columns1 = [Columns.NAME, Columns.TYPE, Columns.DESC];

function getColumn(col) {
	return {
		key: col.key,
		label: col.label,
		headClassName: `classname-of-head-${col.key}`,
		cellClassName: `classname-of-row-data-${col.key}`,
	};
}

export const columns2 = [getColumn(Columns.NAME), getColumn(Columns.TYPE), getColumn(Columns.DESC)];

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
			case Columns.NAME.key:
				return element.name;
			case Columns.TYPE.key:
				return element.type;
			case Columns.DESC.key:
				return element.desc;
			case Columns.MANDATORY.key:
				return element.mandatory ? '*' : '';
			default:
				return `No data available for ${columnKey}`;
		}
	},
};
