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
		id: 'my-table-name',
		key: 'name',
		label: 'Name',
	},
	TYPE: {
		id: 'my-table-type',
		key: 'type',
		label: 'Type',
	},
	DESC: {
		id: 'my-table-desc',
		key: 'desc',
		label: 'Description',
	},
	MANDATORY: {
		id: 'my-table-mandatory',
		key: 'mandatory',
		label: '',
	},
};

export const columns1 = [Columns.NAME, Columns.TYPE, Columns.DESC];

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
		...column,
		headExtraProps: {
			iconPosition: 'right',
			link: true,
		},
	};
}

export function getSorter() {
	return {
		direction: SortDirection.NONE,
		icons: sorterIcons,
	};
}
