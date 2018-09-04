import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Action from '../../Actions/Action';
import styles from './CellWithIcon.scss';

/**
 * Cell renderer that displays text + icon
 */
class CellWithIcon extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.cellData !== nextProps.cellData ||
			this.props.columnData !== nextProps.columnData ||
			this.props.rowData !== nextProps.rowData
		);
	}

	render() {
		const { columnData, rowData, cellData } = this.props;
		const action = columnData.getIcon(rowData);

		return (
			<div className={classnames('cell-icon-container', styles['cell-icon-container'])}>
				<div>{cellData}</div>
				<div className={classnames('icon-container', styles['icon-container'])}>
					{action && <Action {...action} hideLabel link />}
				</div>
			</div>
		);
	}
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
