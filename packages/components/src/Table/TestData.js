import TableCell from './Cell/TableCell';
import TableHeaderCell from './Header/TableHeaderCell';

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

export const KEYS = {
	NAME: 'name',
	TYPE: 'type',
	DESC: 'desc',
};

export const columnKeys = [KEYS.NAME, KEYS.TYPE, KEYS.DESC];

export const classNameProvider = {
	getForTable() {
		return 'classname-of-simple-table';
	},
	getForHeader(columnKey) {
		return `classname-of-header-${columnKey}`;
	},
	getForRow(element) {
		return `classname-of-row-${element.id}`;
	},
	getForRowData(columnKey, element) {
		return `classname-of-row-data-${element.id}-${columnKey}`;
	},
};

export const rowDataGetter = {
	getElementId(element) {
		return element.id;
	},
	getHeaderData(columnKey) {
		return columnKey;
	},
	getRowData(element, columnKey) {
		switch (columnKey) {
			case KEYS.NAME:
				return element.name;
			case KEYS.TYPE:
				return element.type;
			case KEYS.DESC:
				return element.desc;
			default:
				return `No data available for ${columnKey}`;
		}
	},
};

export const rowRenderer = {
	needRowUpdate() {
		return true;
	},
	getCellComponent() {
		return TableCell;
	},
	getExtraProps() {
		return null;
	},
};

export const headerRenderer = {
	getHeaderComponent() {
		return TableHeaderCell;
	},
	getExtraProps() {
		return null;
	},
};
