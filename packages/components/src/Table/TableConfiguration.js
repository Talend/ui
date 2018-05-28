import TableCell from './Cell/TableCell';
import TableHeaderCell from './Header/TableHeaderCell';

const rootClassname = 'tc-table';

/**
 * This object provides classnames for the components which compose a table:
 * the table itself, the header, the rows and the data.
 */
export const classNameProvider = {
	/**
	 * Return a classname for the table component.
	 */
	getForTable() {
		return rootClassname;
	},
	/*
	 * Return a classname for the table header.
	 */
	getForHeader() {
		return `${rootClassname}-header`;
	},
	/**
	 * Returns a classname for the header cell of the given column
	 * @param {string} columnKey - The key identifying a column.
	 */
	getForHeaderCell(columnKey) {
		return `${rootClassname}-header-cell-${columnKey}`;
	},
	/*
	 * Returns a classname for the table body.
	 */
	getForBody() {
		return `${rootClassname}-body`;
	},
	/**
	 * Return a classname for an element of the table
	 * @param {object} element - An element of the table.
	 */
	getForRow() {
		return `${rootClassname}-row`;
	},
	/**
	 * Return a classname for a data of the given element.
	 * @param {string} columnKey - The key identifying a column.
	 * @param {object} element - An element of the table.
	 */
	getForRowData(columnKey) {
		return `${rootClassname}-row-data-${columnKey}`;
	},
};

/**
 * This object provides a cell renderer for a given column key.
 * It is a default implementation which always return a TableCell component.
 */
export const rowRenderer = {
	/**
	 * Indicates if a row needs to be updated or not according to the received props.
	 * Default implementation returns true.
	 * @param {object} props - The props of the component rendering a row.
	 */
	needRowUpdate() {
		return true;
	},
	/**
	 * Return the component used to render a data for the given column.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getCellComponent() {
		return TableCell;
	},
	/**
	 * Return custom properties for the component displaying the data of the given column.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getExtraProps() {
		return null;
	},
};

/**
 * This object provides a header renderer for a given column key.
 * It is a default implementation which always return a TableHeaderCell component.
 */
export const headerRenderer = {
	/**
	 * Return the component used to render a header for the given column.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getHeaderComponent() {
		return TableHeaderCell;
	},
	/**
	 * Return extra properties for the header component rendering the given column header.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getExtraProps() {
		return null;
	},
};

/**
 * This object provides data about elements displayed in a table.
 */
export const rowDataGetter = {
	/**
	 * Return an unique identifier for the given element.
	 * Each element is displayed in a row.
	 * @param {object} element - An element of the table.
	 */
	getElementId(element) {
		return element.id;
	},
	/**
	 * Return the header data corresponding to the given column.
	 * This data will be used to render the header.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getHeaderData(columnKey) {
		return columnKey;
	},
	/**
	 * Return the data corresponding to the given element and column.
	 * @param {object} element - An element of the table.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getRowData(element, columnKey) {
		return element[columnKey];
	},
};

const defaultConfiguration = {
	classNameProvider,
	rowRenderer,
	headerRenderer,
	rowDataGetter,
};

export default defaultConfiguration;
