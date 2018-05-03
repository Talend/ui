/**
* This class provides data about elements displayed in a table.
*/
export default class RowDataGetter {

  /**
  * Return an unique identifier for the given element.
  * Each element is displayed in a row.
	* @param {object} element - An element of the table.
  */
	getId(element) {
    return element.id;
	}

	/**
	* Return the header data corresponding to the given column.
	* This data will be used to render the header.
	* @param {string} columnKey - The key identifying a column.
	*/
	getHeaderData(columnKey) {
		return columnKey;
	}

  /**
  * Return the data corresponding to the given element and column.
	* @param {object} element - An element of the table.
  * @param {string} columnKey - The key identifying a column.
  */
	getRowData(element, columnKey) {
		return 'No data';
	}

}
