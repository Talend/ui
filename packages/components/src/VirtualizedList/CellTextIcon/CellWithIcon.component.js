import PropTypes from 'prop-types';
import React from 'react';

import Action from '../../Actions/Action';
import styles from './CellWithIcon.scss';

/**
 * Cell renderer that displays a badge
 */
function CellWithIcon(props) {
	const action = props.columnData.getIcon(props.rowData);

	return (
		<div className={styles['cell-icon-container']}>
			<div>{props.cellData}</div>
			<div>{action && <Action {...action} hideLabel link />}</div>
		</div>
	);
}

CellWithIcon.displayName = 'VirtualizedList(CellWithIcon)';
CellWithIcon.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// Can be any object
	rowData: PropTypes.object,
	columnData: PropTypes.shape({
		getIcon: PropTypes.func,
	}).isRequired,
};

export default CellWithIcon;
