import { PRIMITIVES_MAPPING, LOGICAL_MAPPING } from '../../constants/avro-type.constant';

// eslint-disable-next-line import/prefer-default-export
export function getTypeRenderer(schemaType) {
	return (
		LOGICAL_MAPPING[schemaType.logicalType] ||
		PRIMITIVES_MAPPING[schemaType.type] ||
		schemaType.type
	);
}
