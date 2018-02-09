import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { distanceInWordsToNow, format } from 'date-fns';

import styles from './CellDatetime.scss';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function computeValue(cellData, columnData) {
	try {
		if (columnData.mode === 'ago') {
			return distanceInWordsToNow(cellData, { addSuffix: 'ago' });
		} else if (columnData.mode === 'format') {
			return format(cellData, columnData.pattern || DATE_TIME_FORMAT);
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Conversion error in list cell ', columnData);
	}

	return cellData;
}
/**
 * Cell renderer that displays text + icon
 */
function CellDatetimeAgo({ cellData, columnData }) {
	return (
		<div className={classnames('cell-datetimeago-container', styles['cell-datetimeago-container'])}>
			{computeValue(cellData, columnData)}
		</div>
	);
}

CellDatetimeAgo.displayName = 'VirtualizedList(CellDatetimeAgo)';
CellDatetimeAgo.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// Can be any object
	rowData: PropTypes.object,
	// Column data
	columnData: PropTypes.shape({
		mode: PropTypes.string.isRequired,
		pattern: PropTypes.string,
	}).isRequired,
};

export default CellDatetimeAgo;
