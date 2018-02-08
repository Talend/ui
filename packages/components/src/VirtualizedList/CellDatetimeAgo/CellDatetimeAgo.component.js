import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Action from '../../Actions/Action';
import styles from './CellDatetimeAgo.scss';

/**
 * Cell renderer that displays text + icon
 */
function CellDatetimeAgo({ columnData, rowData, cellData }) {
	return (
		<div className={classnames('cell-datetimeago-container', styles['cell-datetimeago-container'])}>
			{distanceInWordsToNow(cellData, { addSuffix: 'ago' })}
		</div>
	);
}

CellDatetimeAgo.displayName = 'VirtualizedList(CellDatetimeAgo)';
CellDatetimeAgo.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// Can be any object
	rowData: PropTypes.object,
};

export default CellWithIcon;
