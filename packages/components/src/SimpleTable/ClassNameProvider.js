/**
* This class provides classnames for the components which compose a table:
* the table itself, the header, the rows and the data.
*/
export default class ClassNameProvider {

  /**
  * Return a classname for the table component.
  */
  getForTable() {
    return 'simple-table';
  }

  /**
  * Returns a classname for the header of the given column
  * @param {string} columnKey - The key identifying a column.
  */
  getForHeader(columnKey) {
    return `simple-table-header-${columnKey}`;
  }

  /**
  * Return a classname for an element of the table
  * @param {object} element - An element of the table.
  */
  getForRow(element) {
    return 'simple-table-row';
  }

  /**
  * Return a classname for a data of the given element.
  * @param {object} element - An element of the table.
  * @param {string} columnKey - The key identifying a column.
  */
  getForRowData(element, columnKey) {
    return `simple-table-row-data-${columnKey}`;
  }

}
