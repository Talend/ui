/**
* This class provides classnames for the components which compose a list:
* the list itself, the rows and the data.
*/
export default class ClassNameProvider {

  /**
  * Return a classname for the list component.
  */
  getForList() {
    return 'simple-list';
  }

  /**
  * Returns a classname for the header of the given column
  */
  getForHeader(columnKey) {
    return columnKey;
  }

  /**
  * Return a classname for an element of the list
  * @param {object} element - An element of the list.
  */
  getForRow(element) {
    return 'simple-list-row';
  }

  /**
  * Return a classname for a data of the given element.
  * @param {object} element - An element of the list.
  * @param {string} columnKey - The key identifying a column.
  */
  getForData(element, columnKey) {
    return `simple-list-row-data-${columnKey}`;
  }

}
