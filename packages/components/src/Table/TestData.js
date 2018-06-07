import FilterFactory from './Filters/FilterFactory';

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

export const firstname = {
	id: 'elem_firstname',
	name: 'Firstname',
	type: 'string',
	desc: 'The firstname of the customer (optional)',
	mandatory: false,
};

export const lastname = {
	id: 'elem_lastname',
	name: 'Lastname',
	type: 'string',
	desc: 'The lastname of the customer (mandatory)',
	mandatory: true,
};

export const birthday = {
	id: 'elem_birthday',
	name: 'Birthday',
	type: 'date',
	desc: 'The birthday of the customer (optional)',
	mandatory: false,
};

export const address = {
	id: 'elem_address',
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
	titleBar: 'classname-of-title-bar',
	title: 'classname-of-title',
	filtersBar: 'classname-of-filters-bar',
	table: 'classname-of-table',
	header: 'classname-of-table-header',
	body: 'classname-of-table-body',
	row: 'classname-of-row',
	rows: {
		elem_1: 'classname-of-row-1',
		elem_2: 'classname-of-row-2',
	},
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

const nameFilterId = 'name-filter';
const nameFilterExtra = {
	placeHolder: 'Filter...',
	dockable: true,
	navbar: true,
};
const mandatoryFieldFilterId = 'mandatory-field-filter';
const mandatoryFieldFilterExtra = {
	label: 'Show Mandatory Fields (*) Only',
};

export const nameFilter = FilterFactory.createRegexpFilter(
	nameFilterId,
	'name',
	false,
	nameFilterId,
	nameFilterExtra,
);

export const mandatoryFieldFilter = FilterFactory.createBooleanFilter(
	mandatoryFieldFilterId,
	'mandatory',
	false,
	mandatoryFieldFilterId,
	mandatoryFieldFilterExtra,
);
