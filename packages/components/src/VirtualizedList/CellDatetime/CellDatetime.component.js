import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { distanceInWordsToNow, format } from 'date-fns';
import invariant from 'invariant';
import enLocale from 'date-fns/locale/en';
import frLocale from 'date-fns/locale/fr';
import jaLocale from 'date-fns/locale/ja';

import styles from './CellDatetime.scss';
import { getCurrentLanguage } from '../../translate';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function getDateFnsLocale(language) {
	switch (language) {
		case 'en':
			return enLocale;
		case 'fr':
			return frLocale;
		case 'ja':
			return jaLocale;
		default:
			return enLocale;
	}
}

export function computeValue(cellData, columnData) {
	try {
		if (columnData.mode === 'ago') {
			const currentLocale = getCurrentLanguage();
			return distanceInWordsToNow(cellData, {
				addSuffix: 'ago',
				locale: getDateFnsLocale(currentLocale),
			});
		} else if (columnData.mode === 'format') {
			return format(cellData, columnData.pattern || DATE_TIME_FORMAT);
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
