import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Component from '../components/';
import DATAGRID_PROPTYPES from '../components/datagrid.proptypes';

export default function DataGrid(props) {
	const onFocusedCell = event => {
		if (props.onFocusedCell) {
			props.onFocusedCell(event);
		}

		if (get(props, 'actionCreators.onFocusedCell')) {
			props.dispatchActionCreator(get(props, 'actionCreators.onFocusedCell'), event, {
				props,
			});
		}
	};

	const onFocusedColumn = event => {
		if (props.onFocusedColumn) {
			props.onFocusedColumn(event);
		}

		if (get(props, 'actionCreators.onFocusedColumn')) {
			props.dispatchActionCreator(get(props, 'actionCreators.onFocusedColumn'), event, {
				props,
			});
		}
	};

	return (
		<Component
			{...props}
			data={props.sourceData}
			onFocusedCell={onFocusedCell}
			onFocusedColumn={onFocusedColumn}
		/>
	);
}

DataGrid.propTypes = {
	...DATAGRID_PROPTYPES,
	sourceData: PropTypes.object,
	actionCreators: PropTypes.shape({
		onFocusedCell: PropTypes.string,
		onFocusedColumn: PropTypes.string,
	}),
};

DataGrid.displayName = 'Container(DataGrid)';
