import Cell from './Cell';
import Header from './Header';

export const element1 = {
	id: 'elem_1',
	name: 'element 1',
	type: 'string',
	description: 'Description of element 1',
};

export const element2 = {
	id: 'elem_2',
	name: 'element 2',
	type: 'string',
	description: 'This element is a string',
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
    return `classname-of-row-(${element.id})`;
  },
	getForRowData(element, columnKey) {
    return `classname-of-row-data-(${element.id},${columnKey})`;
  },
};

export const rowDataGetter = {
	getId(element) {
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
				return element.description;
			default:
				return `No data available for ${columnKey}`;
		}
	},
};

export const rowRenderer = {
	needRowUpdate(props) {
		return true;
	},
	getCellComponent(columnKey) {
		return Cell;
	},
	getExtraProps(columnKey) {
		return null;
	},
};

export const headerRenderer = {
	getHeaderComponent(columnKey) {
		return Header;
	},
	getExtraProps(columnKey) {
		return null;
	},
};
