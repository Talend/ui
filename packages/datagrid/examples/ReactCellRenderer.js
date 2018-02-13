import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { api } from '@talend/react-cmf';

import DataGrid from '../src/components/datagrid.component';
import sample from '../.storybook/sample.json';

// function getColumnDefs(sample) {
// 	if (!sample) {
// 		return [];
// 	}
//
// 	return sample.schema.fields.map(avroField => ({
// 		headerName: avroField.doc,
// 		type: avroField.type.dqType || avroField.type.type,
// 		field: `${NAMESPACE_SAMPLE}${avroField.name}`,
// 		[TALEND_QUALITY_KEY]: avroField[TALEND_QUALITY_KEY],
// 		avro: avroField,
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
//
// function valueGetter({ colDef, data }) {
// 	return data[colDef.field];
// }

export default function ReactCellRenderer() {
	return (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				getComponent={api.component.get}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onRowsSelected={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	);
}
