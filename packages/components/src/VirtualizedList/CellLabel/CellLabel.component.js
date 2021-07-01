import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../../Tag';

/**
 * Cell renderer that displays a label
 */
function CellLabel({ cellData, rowIndex, style = 'info', ...rest }) {
	return (
		<Tag id={`${rowIndex}`} bsStyle={cellData.style}>
			{cellData.label}
		</Tag>
	);
}

CellLabel.displayName = 'VirtualizedList(CellLabel)';
CellLabel.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The collection item index.
	rowIndex: PropTypes.number,
	// the bootstrap style info, danger, warning, success
	style: PropTypes.string,
};

export default CellLabel;
