export const DATE_TYPE_FORMATER = 'date';
export const LONG_TYPE = 'long';
export const AVRO_TYPES = [
	'boolean',
	'int',
	LONG_TYPE,
	'float',
	'double',
	'bytes',
	'string',
	'unknown',
	'date',
];
export const TIMESTAMP_MILLIS_LOGICAL_TYPES = 'timestamp-millis';
export const LOGICAL_TYPES = [TIMESTAMP_MILLIS_LOGICAL_TYPES];
export const PRIMITIVES_MAPPING = {
	double: 'int',
	float: 'int',
	int: 'int',
	long: 'int',
};
