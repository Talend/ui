import Cell from './Cell';

/**
 * This class provides a cell renderer for a given column key.
 * It is a default implementation which always return a Cell component.
 */
export default class RowRenderer {
	/**
	 * Indicates if a row needs to be updated or not according to the received props.
	 * Default implementation returns true.
	 * @param {object} props - The props of the component rendering a row.
	 */
	needRowUpdate(props) {
		return true;
	}

	/**
	 * Return the component used to render a data for the given column.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getCellComponent(columnKey) {
		return Cell;
	}

	/**
	 * Return custom properties for the component displaying the data of the given column.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getExtraProps(columnKey) {
		return null;
	}
}
