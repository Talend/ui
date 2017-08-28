import React from 'react';
import PropTypes from 'prop-types';

import theme from './<%= props.name %>.scss';

/**
 * cellData : the data from collection (rowData[dataKey])
 * columnData : the data passed from VirtualizedList.Content > columnData, enhanced with the list id
 * dataKey : the property key
 * rowData : the collection item
 * rowIndex : the row (item) index
 */
function <%= props.name %>({ cellData, columnData, dataKey, rowData, rowIndex }) {
	return (
		<div className={`<%= props.cssSelector %> ${theme['<%= props.cssSelector %>']}`} />
	);
}

<%= props.name %>.displayName = 'VirtualizedList(<%= props.name %>)';
<%= props.name %>.propTypes = {
	/** The cell value : props.rowData[props.dataKey] */
	cellData: PropTypes.string,
	/** The custom props passed to <VirtualizedList.Content columnData={}>. */
	columnData: PropTypes.shape({}),
		/** The data property key. */
	dataKey: PropTypes.string,
	/** The collection item. */
	rowData: PropTypes.object, // eslint-disable-line
	/** The collection item index. */
	rowIndex: PropTypes.number,
};

export default <%= props.name %>;
