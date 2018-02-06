import React from 'react';

import Component from '../components/datagrid.component';

const NAMESPACE_INDEX = 'index.';
const NAMESPACE_SAMPLE = 'sample.';
const COLUMN_INDEX = 'index';
const TALEND_QUALITY_KEY = '@talend-quality@';

function valueGetter({ colDef, data }) {
	return data[colDef.field];
}

// function getColumnDefs(sample) {
// 	if (!sample) {
// 		return [];
// 	}
//
// 	return sample.schema.fields.map(field => ({
// 		headerName: field.doc,
// 		type: field.type.dqType || field.type.type,
// 		field: `${NAMESPACE_SAMPLE}${field.name}`,
// 		[TALEND_QUALITY_KEY]: field[TALEND_QUALITY_KEY],
// 	}));
// }
//
// function getRowData(sample) {
// 	if (!sample) {
// 		return [];
// 	}
//
// 	return sample.data.map((row, index) =>
// 		Object.keys(row.value).reduce(
// 			(rowData, key) => ({
// 				...rowData,
// 				[`${NAMESPACE_SAMPLE}${key}`]: {
// 					value: row.value[key].value,
// 					quality: row.value[key].quality,
// 					comments: [],
// 					type: 'string',
// 					avro: {},
// 				},
// 			}),
// 			{
// 				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index,
// 			},
// 		),
// 	);
// }
//
// function getPinnedColumnDefs(sample) {
// 	if (!sample) {
// 		return [];
// 	}
//
// 	return [
// 		{
// 			field: `${NAMESPACE_INDEX}${COLUMN_INDEX}`,
// 			width: 100,
// 		},
// 	];
// }

export default function DataGrid(props) {
	console.log(props);
	return (
		<Component
			columnDefs={props.getColumnDefs(props.sourceData)}
			onFocusedCell={event => console.log(event)}
			onFocusedColumn={event => console.log(event)}
			pinnedColumnDefs={props.getPinnedColumnDefs(props.sourceData)}
			rowData={props.getRowData(props.sourceData)}
			rowSelection={props.rowSelection}
			valueGetter={valueGetter}
		/>
	);
}

DataGrid.displayName = 'Container(DataGrid)';
