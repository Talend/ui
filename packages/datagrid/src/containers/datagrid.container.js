import React from 'react';

import Component from '../components/';

export default function DataGrid(props) {
	const onFocusedCell = event => {
		if (props.onFocusedCell) {
			props.onFocusedCell();
		}

		if (props.actionCreators && props.actionCreators.onFocusedCell) {
			props.dispatchActionCreator(props.actionCreators.onFocusedCell, event, {
				props,
			});
		}
	};

	const onFocusedColumn = event => {
		if (props.onFocusedColumn) {
			props.onFocusedColumn();
		}

		if (props.actionCreators && props.actionCreators.onFocusedColumn) {
			props.dispatchActionCreator(props.actionCreators.onFocusedColumn, event, {
				props,
			});
		}
	};

	return (
		<Component
			{...props}
			columnDefs={props.getColumnDefs(props.sourceData)}
			onFocusedCell={onFocusedCell}
			onFocusedColumn={onFocusedColumn}
			pinnedColumnDefs={props.getPinnedColumnDefs(props.sourceData)}
			rowData={props.getRowData(props.sourceData)}
			valueGetter={props.getValueGetter}
		/>
	);
}

DataGrid.displayName = 'Container(DataGrid)';
