import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Action from '../../Actions/Action';
import styles from './CellWithIcon.scss';

/**
 * Cell renderer that displays text + icon
 */
function CellWithIcon({
	columnData,
	rowData,
	cellData,
}) {
	const action = columnData.getIcon(rowData);

	return (
		<div className={classnames('cell-icon-container', styles['cell-icon-container'])}>
			<div>{cellData}</div>
			<div>
				{action && <Action {...action} hideLabel link />}
			</div>
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
		getIcon: PropTypes.func.isRequired,
	}).isRequired,
};

export default CellWithIcon;
