import get from 'lodash/get';
import isArray from 'lodash/isArray';

import {
	NAMESPACE_INDEX,
	NAMESPACE_DATA,
	COLUMN_INDEX,
	TALEND_QUALITY_KEY,
} from '../../constants/';

export function getType(type) {
	if (isArray(type)) {
		const notNullType = type.find(subType => subType !== 'null');
		const nullType = type.find(subType => subType === 'null');

		if (notNullType && nullType) {
			return `${getType(notNullType)}*`;
		}
	}
	return type.dqType || type.type;
}

export function getColumnDefs(sample) {
	if (!sample) {
		return [];
	}

	return get(sample, 'schema.fields', []).map(avroField => ({
		headerName: avroField.doc,
		type: getType(avroField.type),
		field: `${NAMESPACE_DATA}${avroField.name}`,
		[TALEND_QUALITY_KEY]: avroField[TALEND_QUALITY_KEY],
		avro: avroField,
	}));
}

export function getRowData(sample, startIndex = 0) {
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
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index + startIndex,
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
