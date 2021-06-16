import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../../Tag';

/**
 * Cell renderer that displays a label
 */
function CellLabel({ cellData, rowIndex }) {
	return (
		<Tag id={`${rowIndex}`} bsStyle="info">
			{cellData}
		</Tag>
	);
}

CellLabel.displayName = 'VirtualizedList(CellLabel)';
CellLabel.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The collection item index.
	rowIndex: PropTypes.number,
};

export default CellLabel;
