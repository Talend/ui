export const AVRO_TYPES = ['boolean', 'int', 'long', 'float', 'double', 'bytes', 'string'];
export const LOGICAL_TYPES = ['timestamp-millis'];
export const PRIMITIVES_MAPPING = {
	double: 'int',
	float: 'int',
	int: 'int',
	long: 'int',
};

export const LOGICAL_MAPPING = {
	'timestamp-millis': 'date',
};
