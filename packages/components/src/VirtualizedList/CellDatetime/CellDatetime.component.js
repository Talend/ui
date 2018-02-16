import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { distanceInWordsToNow, format } from 'date-fns';
import invariant from 'invariant';

import styles from './CellDatetime.scss';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function computeValue(cellData, columnData) {
	try {
		if (columnData.mode === 'ago') {
			return distanceInWordsToNow(cellData, { addSuffix: 'ago' });
		} else if (columnData.mode === 'format') {
			const manualDate = new Date(cellData);
			console.log('la date vaut', cellData);

			//const libFormatteddate = format(cellData, columnData.pattern || DATE_TIME_FORMAT);
			const isoDateStr = manualDate.toISOString();
			console.log('isoStr', isoDateStr);
			const libFormatteddate = format(isoDateStr, columnData.pattern || DATE_TIME_FORMAT);
			//console.log('en string formatté', manualDate.format(columnData.pattern || DATE_TIME_FORMAT));
			console.log('en string formatté par la lib', libFormatteddate);
			return libFormatteddate;
		}
	} catch (e) {
		invariant(true, 'Conversion error in list cell ', columnData);
	}

	return cellData;
}
/**
 * Cell renderer that displays text + icon
 */
function CellDatetime({ cellData, columnData }) {
	return (
		<div className={classnames('cell-datetime-container', styles['cell-datetime-container'])}>
			{computeValue(cellData, columnData)}
		</div>
	);
}

CellDatetime.displayName = 'VirtualizedList(CellDatetime)';
CellDatetime.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// Column data
	columnData: PropTypes.shape({
		mode: PropTypes.string.isRequired,
		pattern: PropTypes.string,
	}).isRequired,
};

export default CellDatetime;
