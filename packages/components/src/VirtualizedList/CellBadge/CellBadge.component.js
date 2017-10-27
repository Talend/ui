import PropTypes from 'prop-types';
import React from 'react';
import Badge from '../../Badge';

/**
 * Cell renderer that displays a badge
 */
function CellBadge({ cellData, rowIndex }) {
	return <Badge id={`${rowIndex}`} label={cellData} selected />;
}

CellBadge.displayName = 'VirtualizedList(CellBadge)';
CellBadge.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The collection item index.
	rowIndex: PropTypes.number,
};

export default CellBadge;
