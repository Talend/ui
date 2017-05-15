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
		(accu, nextKey) => accu[nextKey],
		properties
	);
}
