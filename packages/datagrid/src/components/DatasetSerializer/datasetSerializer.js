import get from 'lodash/get';
import {
	NAMESPACE_INDEX,
	NAMESPACE_DATA,
	COLUMN_INDEX,
	TALEND_QUALITY_KEY,
} from '../../constants/';

export function getColumnDefs(sample) {
	if (!sample) {
		return [];
	}

	return get(sample, 'schema.fields', []).map(avroField => ({
		headerName: avroField.doc,
		type: avroField.type.dqType || avroField.type.type,
		field: `${NAMESPACE_DATA}${avroField.name}`,
		[TALEND_QUALITY_KEY]: avroField[TALEND_QUALITY_KEY],
		avro: avroField,
	}));
}

export function getRowData(sample) {
	if (!sample) {
		return [];
	}

	return get(sample, 'data', []).map((row, index) =>
		Object.keys(row.value).reduce(
			(rowData, key) => ({
				...rowData,
				[`${NAMESPACE_DATA}${key}`]: {
					value: row.value[key].value,
					quality: row.value[key].quality,
					comments: [],
					avro: {},
				},
			}),
			{
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index,
			},
		),
	);
}

export function getPinnedColumnDefs(sample) {
	if (!sample) {
		return [];
	}

	return [
		{
			field: `${NAMESPACE_INDEX}${COLUMN_INDEX}`,
			width: 100,
		},
	];
}

export function getCellValue({ colDef, data }) {
	return data[colDef.field];
}
