import Header from './Header';

/**
 * This class provides a header renderer for a given column key.
 * It is a default implementation which always return a Header component.
 */
export default class HeaderRenderer {
	/**
	 * Return the component used to render a header for the given column.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getHeaderComponent(columnKey) {
		return Header;
	}

	/**
	 * Return extra properties for the header component rendering the given column header.
	 * @param {string} columnKey - The key identifying a column.
	 */
	getExtraProps(columnKey) {
		return null;
	}
}
