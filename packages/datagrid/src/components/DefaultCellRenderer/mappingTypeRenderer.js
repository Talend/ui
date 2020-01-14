import {
	DATE_TYPE_FORMATER,
	LONG_TYPE,
	PRIMITIVES_MAPPING,
	TIMESTAMP_MILLIS_LOGICAL_TYPES,
} from '../../constants/avro-type.constant';

// eslint-disable-next-line import/prefer-default-export
export function getTypeRenderer(schemaType) {
	if (schemaType.type === LONG_TYPE && schemaType.logicalType === TIMESTAMP_MILLIS_LOGICAL_TYPES) {
		return DATE_TYPE_FORMATER;
	}

	if (PRIMITIVES_MAPPING[schemaType.type]) {
		return PRIMITIVES_MAPPING[schemaType.type];
	}

	return schemaType.type;
}
