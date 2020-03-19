/**
 * Get a value stored in properties, identified by key
 * @param {object} properties The properties store
 * @param {object} schema The schema containing the key chain (array of strings)
 * to access to the value
 */
export function getValue(properties, schema) {
	if (!schema.key) {
		return undefined;
	}

	return schema.key.reduce((accu, nextKey) => accu && accu[nextKey], properties);
}

/**
 * Convert a string value to the wanted type
 * @param type The string type
 * @param value The value to convert
 */
export function convertValue(type, value) {
	if (value === '') {
		return undefined;
	}
	if (type === 'number') {
		return parseFloat(value);
	}
	return value;
}

/**
 * Mutate the properties, setting the value in the path identified by key
 * @param {object | array} properties The original properties store
 * @param {array} key The key chain (array of strings) to identify the path
 * @param {any} value The value to set
 * @returns {object} The new mutated properties.
 */
function mutateValueFromKey(properties = {}, key, value) {
	if (!key || !key.length) {
		return value;
	}

	const nextKey = key[0];
	const restKeys = key.slice(1);
	const nextValue = mutateValueFromKey(properties[nextKey], restKeys, value);

	let nextProperties;
	if (properties instanceof Array) {
		nextProperties = properties.slice(0);
	} else {
		nextProperties = { ...properties };
	}

	if (nextValue === undefined) {
		delete nextProperties[nextKey];
		return nextProperties;
	}
	nextProperties[nextKey] = nextValue;
	return nextProperties;
}

/**
 * Mutate the properties, setting the value in the input identified by schema
 * @param {object | array} properties The original properties store
 * @param {object} schema The input schema
 * @param {any} value The value to set
 * @returns {object} The new mutated properties.
 */
export function mutateValue(properties, schema, value) {
	return mutateValueFromKey(properties, schema.key, value);
}
