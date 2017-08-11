/**
 * Get a value stored in properties, identified by key
 * @param {object} properties The properties store
 * @param {array} key The key chain (array of strings) to access to the value
 */
export function getValue(properties, key) {
	if (!key) {
		return undefined;
	}

	return key.reduce(
		(accu, nextKey) => accu && accu[nextKey],
		properties
	);
}

/**
 * Omit multiple properties from an object
 * @param properties The object
 * @param keys The array of keys to omit
 */
export function omitAll(properties, keys) {
	if (!keys || !keys.length) {
		return properties;
	}
	const result = {};
	Object.keys(properties)
		.filter(nextKey => keys.indexOf(nextKey) === -1)
		.forEach((nextKey) => {
			result[nextKey] = properties[nextKey];
		});
	return result;
}

/**
 * Omit a property from an object
 * @param properties The object
 * @param key The key to omit
 */
export function omit(properties, key) {
	if (!key) {
		return properties;
	}
	return omitAll(properties, [key]);
}

/**
 * Convert a string value to the wanted type
 * @param type The string type
 * @param value The value to convert
 */
export function convertValue(type, value) {
	if (type === 'number') {
		return parseFloat(value);
	}
	return value;
}
