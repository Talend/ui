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

/**
 * Mutate the properties, setting the value in the path identified by key
 * @param {object | array} properties The original properties store
 * @param {array} key The key chain (array of strings) to identify the path
 * @param {any} value The value to set
 * @returns {object} The new mutated properties store.
 */
export function mutateValue(properties = {}, key, value) {
	if (!key.length) {
		return value;
	}

	const nextKey = key[0];
	const restKeys = key.slice(1);
	const nextValue = mutateValue(properties[nextKey], restKeys, value);

	let nextProperties;
	if (properties instanceof Array) {
		nextProperties = properties.slice(0);
	} else {
		nextProperties = { ...properties };
	}

	nextProperties[nextKey] = nextValue;
	return nextProperties;
}
