import { NAMESPACE_INDEX, NAMESPACE_DATA, COLUMN_INDEX, QUALITY_KEY } from '../../constants';

/**
 * check if the type is null
 *
 * @param  {string|object} type  type to check
 * @return {boolean} return if the type is null
 */
function isNull(type) {
	if (typeof type === 'string') {
		return type === 'null';
	}

	return type.type === 'null';
}

/**
 * sanitize the type
 *
 * @param  {object|string} type type to sanitize
 * @return {object}      type wrapped in object
 * @example
 *  sanitizeType('string') => { type: 'string'}
 *  sanitizeType({ type: 'string'}) => { type: 'string'}
 */
function sanitizeType(type) {
	if (typeof type === 'string') {
		return {
			type,
		};
	}

	return type;
}

/**
 * remove the optional type
 *
 * @param  {object} 	avro field
 * @return {object}   return the shallow avro
 * @example
 * 	sanitizeAvro({
 *		 "name": "field0",
 *		 "doc": "Nom de la gare",
 *		 "type": [
 *			 "null",
 *			 {
 *				 "type": "string",
 *				 "dqType": "FR Commune",
 *				 "dqTypeKey": "FR_COMMUNE"
 *			 }
 *		 ],
 *		 "@talend-quality@": {
 *				 "0": 0,
 *				 "1": 38,
 *				 "-1": 62,
 *				 "total": 100
 *		 }
 *	}); {..., type: {type: "string", dqType: "FR Commune", dqTypeKey: "FR_COMMUNE"}}
 */
export function sanitizeAvro(avro) {
	if (!Array.isArray(avro.type)) {
		return avro;
	}

	return {
		...avro,
		type: sanitizeType(avro.type.find(it => !isNull(it))),
	};
}

/**
 * Extract the quality from the type.
 * @param {object or array} type
 */
export function getQualityValue(type) {
	if (Array.isArray(type)) {
		return type.find(value => value[QUALITY_KEY] !== undefined)?.[QUALITY_KEY];
	}
	return type?.[QUALITY_KEY];
}

export function getColumnDefs(sample) {
	// This is used only in storybook, it was forked by all projects...
	return (sample?.schema?.fields ?? []).map(avroField => {
		const type = Array.isArray(avroField.type)
			? avroField.type.find(it => !isNull(it))
			: avroField.type;
		return {
			avro: sanitizeAvro(avroField),
			field: `${NAMESPACE_DATA}${avroField.name}`,
			headerName: avroField.doc || avroField.name,
			headerComponentParams: {
				typeLabel: typeof type === 'string' ? type : type.type,
				semanticTypeLabel: type.dqType,
				required: !Array.isArray(avroField.type) || !avroField.type.find(it => isNull(it)),
				quality: avroField.type && getQualityValue(avroField.type),
			},
		};
	});
}

export function getRowData(sample, startIndex = 0) {
	return (sample?.data ?? []).map((row, index) =>
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
				loaded: row.loaded,
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
