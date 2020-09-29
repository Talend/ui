import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * Cell renderer that displays a label
 */
function CellLabel({ cellData, rowIndex }) {
	return (
		<small id={`${rowIndex}`} className={classNames('label', 'label-info')}>
			{cellData}
		</small>
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
