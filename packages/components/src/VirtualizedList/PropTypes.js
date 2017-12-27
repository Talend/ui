import PropTypes from 'prop-types';
import { SORT_BY, listTypes } from './utils/constants';

const { TABLE, LARGE } = listTypes;

export default {
	// <VirtualizedList.Content> elements to configure the content fields
	children: PropTypes.arrayOf(PropTypes.element),
	// The collection items
	collection: PropTypes.arrayOf(PropTypes.object),
	// Default height to render list
	defaultHeight: PropTypes.number,
	// Disable header on TABLE
	disableHeader: PropTypes.boolean,
	// label used when the list is empty
	noRowsRenderer: PropTypes.oneOf(PropTypes.element, PropTypes.func),
	// The id. The sub-ids will be based on the ids as prefix
	id: PropTypes.string,
	// Highlight row on click
	isActive: PropTypes.func,
	/** Function : (collectionItem) => Boolean
	 *  This is called to determine if the element is selected.
	 *  Note that this is not used/displayed if the selectionToggle props is not passed */
	isSelected: PropTypes.func,
	// Show spinner during loading
	inProgress: PropTypes.bool,
	// The row click
	onRowClick: PropTypes.func,
	// The row height in ListGrid rendering
	rowHeight: PropTypes.number,
	/** Function to call on element selection
	 *  This determines the display of the selection checkboxes. */
	selectionToggle: PropTypes.func,
	// Function to call on sort change in ListTable rendering (header click)
	sort: PropTypes.func,
	// Content field of the current sort
	sortBy: PropTypes.string,
	// Current sort direction ('ASC' | 'DESC')
	sortDirection: PropTypes.oneOf([SORT_BY.ASC, SORT_BY.DESC]),
	// List type ('TABLE' | 'LARGE' | ...)
	type: PropTypes.oneOf([TABLE, LARGE]),
	// i18next translate helper
	t: PropTypes.func,
};
