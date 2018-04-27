/**
* This class provides data about elements displayed in a list.
*/
export default class RowDataGetter {

  /**
  * Return an unique identifier for the given element.
  * Each element is displayed in a row.
	* @param {object} element - An element of the list.
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
	* @param {object} element - An element of the list.
  * @param {string} columnKey - The key identifying a column.
  */
	getData(element, columnKey) {
		return 'No data';
	}

}
