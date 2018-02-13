import { NAMESPACE_INDEX, NAMESPACE_SAMPLE, COLUMN_INDEX, TALEND_QUALITY_KEY } from '../constants/';

export function getColumnDefsFromSample(sample) {
	if (!sample) {
		return [];
	}

	return sample.schema.fields.map(avroField => ({
		headerName: avroField.doc,
		type: avroField.type.dqType || avroField.type.type,
		field: `${NAMESPACE_SAMPLE}${avroField.name}`,
		[TALEND_QUALITY_KEY]: avroField[TALEND_QUALITY_KEY],
		avro: avroField,
	}));
}

export function getRowDataFromSample(sample) {
	if (!sample) {
		return [];
	}

	return sample.data.map((row, index) =>
		Object.keys(row.value).reduce(
			(rowData, key) => ({
				...rowData,
				[`${NAMESPACE_SAMPLE}${key}`]: {
					value: row.value[key].value,
					quality: row.value[key].quality,
					comments: [],
					type: 'string',
					avro: {},
				},
			}),
			{
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index,
			},
		),
	);
}

export function getPinnedColumnDefsFromSample(sample) {
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

export function valueGetterFromRowData({ colDef, data }) {
	return data[colDef.field];
}
