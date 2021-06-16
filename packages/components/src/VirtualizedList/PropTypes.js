import PropTypes from 'prop-types';
import { SORT_BY, SELECTION_MODE } from './utils/constants';

export default {
	// <VirtualizedList.Content> elements to configure the content fields
	children: PropTypes.arrayOf(PropTypes.element),
	// The collection items
	collection: PropTypes.arrayOf(PropTypes.object),
	// Default height to render list
	defaultHeight: PropTypes.number,
	// Disable header on TABLE
	disableHeader: PropTypes.bool,
	// label used when the list is empty
	noRowsRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	// The id. The sub-ids will be based on the ids as prefix
	id: PropTypes.string,
	// Highlight row on click
	isActive: PropTypes.func,
	/** Function : (collectionItem) => { disabled: Boolean, message: String }
	 *  This is called to determine if the element is disabled. */
	getRowState: PropTypes.func,
	/** Function : (collectionItem) => Boolean
	 *  This is called to determine if the element is selected.
	 *  Note that this is not used/displayed if the selectionToggle props is not passed */
	isSelected: PropTypes.func,
	// Show spinner during loading
	inProgress: PropTypes.bool,
	// The row click
	onRowClick: PropTypes.func,
	onRowsRendered: PropTypes.func,
	// The row double click
	onRowDoubleClick: PropTypes.func,
	// The list scroll
	onScroll: PropTypes.func,
	// handler for selecting all items
	onToggleAll: PropTypes.func,
	registerChild: PropTypes.func,
	// Total number of rows
	rowCount: PropTypes.number,
	// The row height in ListGrid rendering
	rowHeight: PropTypes.number,
	// List of row renderers
	rowRenderers: PropTypes.object,
	// Scroll to a given index
	scrollToIndex: PropTypes.number,
	/** Function to call on element selection
	 *  This determines the display of the selection checkboxes. */
	selectionToggle: PropTypes.func,
	// Current selection mode ('MULTI' | 'SINGLE')
	selectionMode: PropTypes.oneOf([SELECTION_MODE.MULTI, SELECTION_MODE.SINGLE]),
	// Function to call on sort change in ListTable rendering (header click)
	sort: PropTypes.func,
	// Content field of the current sort
	sortBy: PropTypes.string,
	// Current sort direction ('ASC' | 'DESC')
	sortDirection: PropTypes.oneOf([SORT_BY.ASC, SORT_BY.DESC]),
	// List type ('TABLE' | 'LARGE' | ...)
	type: PropTypes.string,
};
