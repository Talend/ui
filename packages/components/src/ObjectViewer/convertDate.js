const keysToConvert = [];

const DATASCHEMATYPES = [
	{
		TYPE: 'long',
		LOGICALTYPE: 'time-micros',
	},
	{
		TYPE: 'int',
		LOGICALTYPE: 'time-millis',
	},
	{
		TYPE: 'long',
		LOGICALTYPE: 'timestamp-micros',
	},
	{
		TYPE: 'long',
		LOGICALTYPE: 'timestamp-millis',
	},
	{
		TYPE: 'int',
		LOGICALTYPE: 'date',
	},
];

/**
 *
 * @param {Object} data
 * @param {Array<String>} toConvert
 */
function convertDate(data, toConvert) {
	if (!toConvert) {
		return data;
	}
	const newData = data;
	for (const elem of newData) {
		// eslint-disable-next-line no-restricted-syntax
		for (const el in elem) {
			// eslint-disable-next-line no-prototype-builtins
			if (elem.hasOwnProperty(el)) {
				if (toConvert.includes(el)) {
					elem[el] = new Date(elem[el]).toISOString();
				}
			}
		}
	}
	return newData;
}

/**
 *
 * @param {Object} dataSchema
 * @return {Array<String> | null}
 */
function checkDataSchemaToConvert(dataSchema) {
	if (dataSchema && dataSchema.fields) {
		for (const schemaField of dataSchema.fields) {
			const schemaFieldName = schemaField.name;
			const schemaFieldType = schemaField.type;
			for (const DATASCHEMATYPE of DATASCHEMATYPES) {
				if (
					schemaFieldType.type === DATASCHEMATYPE.TYPE &&
					schemaFieldType.logicalType === DATASCHEMATYPE.LOGICALTYPE
				) {
					keysToConvert.push(schemaFieldName);
				}
			}
		}
		return keysToConvert;
	}
	return null;
}

export { convertDate, checkDataSchemaToConvert };
