import get from 'lodash/get';
import round from 'lodash/round';
import {
	NAMESPACE_INDEX,
	NAMESPACE_DATA,
	COLUMN_INDEX,
	TALEND_QUALITY_KEY,
	TALEND_QUALITY_INVALID_KEY,
	TALEND_QUALITY_EMPTY_KEY,
	TALEND_QUALITY_VALID_KEY,
} from '../../constants/';

export function getQuality(qualityTotal, rowsTotal) {
	return {
		percentage: rowsTotal ? round(qualityTotal / rowsTotal * 100) : 0,
		total: qualityTotal,
	};
}

export function getFieldQuality(quality) {
	if (!quality) {
		return {};
	}

	return {
		[TALEND_QUALITY_INVALID_KEY]: getQuality(quality[TALEND_QUALITY_INVALID_KEY], quality.total),
		[TALEND_QUALITY_EMPTY_KEY]: getQuality(quality[TALEND_QUALITY_EMPTY_KEY], quality.total),
		[TALEND_QUALITY_VALID_KEY]: getQuality(quality[TALEND_QUALITY_VALID_KEY], quality.total),
	};
}

export function convertSample(sample) {
	if (sample.toJS) {
		return sample.toJS();
	}

	return sample;
}

export function getColumnDefs(sample) {
	if (!sample) {
		return [];
	}

	const plainObjectSample = convertSample(sample);

	return get(plainObjectSample, 'schema.fields', []).map(avroField => ({
		avro: avroField,
		field: `${NAMESPACE_DATA}${avroField.name}`,
		headerName: avroField.doc,
		type: avroField.type.dqType || avroField.type.type,
		[TALEND_QUALITY_KEY]: avroField[TALEND_QUALITY_KEY],
		[TALEND_QUALITY_KEY]: getFieldQuality(avroField[TALEND_QUALITY_KEY]),
	}));
}

export function getRowData(sample, startIndex = 0) {
	if (!sample) {
		return [];
	}

	const plainObjectSample = convertSample(sample);

	return get(plainObjectSample, 'data', []).map((row, index) =>
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
