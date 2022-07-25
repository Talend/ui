import { ColDef, GetRowIdFunc, ValueGetterFunc } from 'ag-grid-community';

import {
	QUALITY_EMPTY_KEY,
	QUALITY_INVALID_KEY,
	QUALITY_KEY,
	QUALITY_VALID_KEY,
} from '../constants';
import { DefaultColDef, DefaultPinnedColDef } from '../constants/column-definition.constants';
import { AvroField, Schema } from '../types';

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

const valueGetter: ValueGetterFunc = ({ data, colDef }) => data.value?.[colDef.field!];

/**
 * Return row identifier, used when updating data
 */
export const getRowId: GetRowIdFunc = params => params.data.id;

/**
 * Add a row identifier
 */
export const parseRow = (data: any, index: number) => ({
	...data,
	// getRowId needs a string
	id: index.toString(),
});

/**
 * Return column definitions for a dataset sample
 */
export function getColumnDefs(schema: Schema): ColDef[] {
	return [
		DefaultPinnedColDef,
		...schema.fields.map(avroField => {
			const type = sanitizeAvro(avroField);
			const quality = avroField.type && getQualityValue(avroField.type);
			return {
				...DefaultColDef,
				valueGetter: valueGetter,
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
					quality: quality && {
						invalid: quality[QUALITY_INVALID_KEY],
						empty: quality[QUALITY_EMPTY_KEY],
						valid: quality[QUALITY_VALID_KEY],
					},
				},
			};
		}),
	];
}
