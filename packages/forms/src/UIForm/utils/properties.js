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
 * Omit a property from an object
 * @param properties The object
 * @param key The key to omit
 */
export function omit(properties, key) {
	if (!key) {
		return properties;
	}
	const result = {};
	Object.keys(properties)
		.filter(nextKey => nextKey !== key)
		.forEach((nextKey) => {
			result[nextKey] = properties[nextKey];
		});
	return result;
}
