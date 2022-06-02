import { ColDef } from 'ag-grid-community';

import { QUALITY_KEY } from '../constants';
import { DefaultColDef, DefaultPinnedColDef } from '../constants/column-definition.constants';
import { AvroField, Sample } from '../types';

/**
 * check if the type is null
 *
 * @param  {string|object} type  type to check
 * @return {boolean} return if the type is null
 */
function isNull(type: AvroField['type']) {
	if (typeof type === 'string') {
		return type === 'null';
	}

	return type.type === 'null';
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
export function sanitizeAvro(avroField: AvroField) {
	const rawType = Array.isArray(avroField.type)
		? avroField.type.find(it => !isNull(it))
		: avroField.type;

	return typeof rawType === 'string'
		? {
				type: rawType,
				typeLabel: rawType,
		  }
		: {
				type: rawType.type,
				typeLabel: rawType.type,
				semanticTypeId: rawType.dqTypeKey,
				semanticTypeLabel: rawType.dqType,
				logicalType: rawType.logicalType,
		  };
}

/**
 * Extract the quality from the type.
 * @param {object or array} type
 */
export function getQualityValue(type: AvroField['type']) {
	if (Array.isArray(type)) {
		return type.find(value => value[QUALITY_KEY] !== undefined)?.[QUALITY_KEY];
	}
	return type?.[QUALITY_KEY];
}

/**
 * Return column definitions for a dataset sample
 * @param sample
 */
export function getColumnDefs(sample: Sample): ColDef[] {
	return [
		DefaultPinnedColDef,
		...sample.schema.fields.map(avroField => {
			const type = sanitizeAvro(avroField);
			return {
				...DefaultColDef,
				valueGetter: `data.value.${avroField.name}`,
				field: avroField.name,
				headerName: avroField.doc || avroField.name,
				cellRendererParams: {
					...type,
					avro: type,
				},
				headerComponentParams: {
					avro: type,
					...type,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					required: !Array.isArray(avroField.type) || !avroField.type.find(isNull),
					quality: avroField.type && getQualityValue(avroField.type),
				},
			};
		}),
	];
}
