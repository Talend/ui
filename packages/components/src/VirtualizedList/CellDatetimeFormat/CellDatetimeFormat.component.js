import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import format from 'date-fns/format';

import styles from './CellDatetimeFormat.scss';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Cell renderer that displays text + icon
 */
function CellDatetimeFormat({ cellData }) {
	return (
		<div className={classnames('cell-datetimeformat-container', styles['cell-datetimeformat-container'])}>
			{cellData}=>{format(cellData, DATE_TIME_FORMAT)}
		</div>
	);
}

CellDatetimeFormat.displayName = 'VirtualizedList(CellDatetimeFormat)';
CellDatetimeFormat.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
};

export default CellDatetimeFormat;
