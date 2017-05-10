/**
 * Get a value stored in properties, identified by key
 * @param {object} properties The properties store
 * @param {array} key The key chain (array of strings) to access to the value
 */
export function getValue(properties, key) {
	return key.reduce(
		(accu, nextKey) => accu[nextKey],
		properties
	);
}

/**
 * Mutate the properties, setting the value in the path identified by key
 * @param {object} properties The original properties store
 * @param {array} key The key chain (array of strings) to identify the path
 * @param {any} value The value to set
 * @returns {object} The new mutated properties store.
 */
export function mutateValue(properties, key, value) {
	if (!key.length) {
		return value;
	}

	const nextKey = key[0];
	const restKeys = key.slice(1);
	return {
		...properties,
		[nextKey]: mutateValue(properties[nextKey], restKeys, value),
	};
}
