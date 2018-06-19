import StringFilterComponent from './Filters/StringFilterComponent';
import ToggleFilterComponent from './Filters/ToggleFilterComponent';
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

export const mainClassName = 'classname-of-table-root';

export const rowsClassName = {
	elem_1: 'classname-of-row-1',
	elem_2: 'classname-of-row-2',
};

export const nameFilterId = 'name-filter';

export function getNameFilter(id, match) {
	return {
		id,
		active: false,
		params: {
			value: null,
			docked: true,
		},
		match,
		renderer: StringFilterComponent,
		rendererProps: {
			placeHolder: 'Filter...',
			dockable: true,
			navbar: true,
		},
		className: id,
	};
}

export const mandatoryFieldFilterId = 'mandatory-field-filter';

export function getMandatoryFieldFilter(id, match) {
	return {
		id,
		active: false,
		match,
		renderer: ToggleFilterComponent,
		rendererProps: {
			label: 'Show Mandatory Fields (*) Only',
		},
		className: id,
	};
}

export const SortDirection = {
	NONE: 'none',
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
};

export const sorterIcons = {
	none: 'none-icon',
	ascending: 'ascending-icon',
	descending: 'descending-icon',
};

export function addSortExtraProps(column) {
	return {
		key: column.key,
		label: column.label,
		headExtraProps: {
			iconPosition: 'right',
			link: true,
		},
		headClassName: column.key,
	};
}

export function getSorter() {
	return {
		direction: SortDirection.NONE,
		icons: sorterIcons,
	};
}
