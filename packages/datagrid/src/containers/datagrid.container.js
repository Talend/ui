import React from 'react';
import get from 'lodash/get';

import Component from '../components/';

export default function DataGrid(props) {
	const onFocusedCell = event => {
		if (props.onFocusedCell) {
			props.onFocusedCell();
		}

		if (get(props, 'actionCreators.onFocusedCell')) {
			props.dispatchActionCreator(get(props, 'actionCreators.onFocusedCell'), event, {
				props,
			});
		}
	};

	const onFocusedColumn = event => {
		if (props.onFocusedColumn) {
			props.onFocusedColumn();
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

DataGrid.displayName = 'Container(DataGrid)';
