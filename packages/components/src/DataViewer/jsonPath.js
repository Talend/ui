/**
 * Format the key according to the type
 * @param {string} key
 * @param {string} type
 */
export function formatKey(key, type) {
	if (type === 'array') {
		return `[${key}]`;
	}
	return `['${key}']`;
}

/**
 * Return a string from the keys
 * @param {array} keys
 * @param {string} type
 */
export function readJsonKeys(keys, type) {
	return keys.reduce((acc, key) => {
		let newAcc = acc;
		newAcc += formatKey(key, type);
		return newAcc;
	}, '');
}

/**
 * Return JSONPath notation
 * @param  {array} keys    array of key
 * @param  {string} prefix current jsonpath
 * @param  {string} type   one of 'array' or 'object'
 * @return {string}        jsonpath
 */
export default function formatJSONPath(keys, prefix, type) {
	const value = readJsonKeys(keys, type);
	return `${prefix}${value}`;
}
