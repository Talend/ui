import React from 'react';
import PropTypes from 'prop-types';

import Component from '../../components/';
import DATAGRID_PROPTYPES from '../../components/DataGrid/DataGrid.proptypes';

export default function DataGrid(props) {
	const onFocusedCell = event => {
		if (props.onFocusedCell) {
			props.onFocusedCell(event);
		}

		if (props.onFocusedCellActionCreator) {
			props.dispatchActionCreator(props.onFocusedCellActionCreator, event, {
				props,
			});
		}
	};

	const onFocusedColumn = event => {
		if (props.onFocusedColumn) {
			props.onFocusedColumn(event);
		}

		if (props.onFocusedColumnActionCreator) {
			props.dispatchActionCreator(props.onFocusedColumnActionCreator, event, {
				props,
			});
		}
	};

	return (
		<Component
			{...props}
			data={props.data}
			onFocusedCell={onFocusedCell}
			onFocusedColumn={onFocusedColumn}
		/>
	);
}

DataGrid.propTypes = {
	...DATAGRID_PROPTYPES,
	onFocusedCellActionCreator: PropTypes.string,
	onFocusedColumnActionCreator: PropTypes.string,
};

DataGrid.displayName = 'Container(DataGrid)';
