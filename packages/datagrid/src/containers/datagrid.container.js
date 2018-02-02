import React from 'react';

import DataGrid from '../components/datagrid.component';

const NAMESPACE_INDEX = 'index.';
const NAMESPACE_SAMPLE = 'sample.';
const COLUMN_INDEX = 'index';
const TALEND_QUALITY_KEY = '@talend-quality@';

function valueGetter({ colDef, data }) {
	return data[colDef.field];
}

function getColumnDefs(sample) {
	return sample.schema.fields.map(field => ({
		headerName: field.doc,
		type: field.type.dqType || field.type.type,
		field: `${NAMESPACE_SAMPLE}${field.name}`,
		[TALEND_QUALITY_KEY]: field[TALEND_QUALITY_KEY],
	}));
}

function getRowData(sample) {
	return sample.data.map((row, index) =>
		Object.keys(row.value).reduce(
			(rowData, key) => ({
				...rowData,
				[`${NAMESPACE_SAMPLE}${key}`]: {
					value: row.value[key].value,
					quality: row.value[key].quality,
					comments: [],
					type: 'string',
				},
			}),
			{
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index,
			},
		),
	);
}

function getPinnedColumnDefs() {
	return [
		{
			field: `${NAMESPACE_INDEX}${COLUMN_INDEX}`,
			width: 100,
		},
	];
}

export default function ContainerDataGrid({ sample }) {
	console.log(getRowData(sample));
	return (
		<DataGrid
			rowData={getRowData(sample)}
			pinnedColumnDefs={getPinnedColumnDefs()}
			columnDefs={getColumnDefs(sample)}
			rowSelection="single"
			onFocusedCell={event => console.log(event)}
			onFocusedColumn={event => console.log(event)}
			onRowsSelected={event => console.log(event)}
			valueGetter={valueGetter}
		/>
	);
}
