/**
 * return JSONPath braket notation
 * @param  {string} key    object key
 * @param  {string} prefix current jsonpath
 * @param  {string} type   one of 'array' or 'object'
 * @return {string}        jsonpath
 */
export default function getJSONPath(key, prefix, type) {
	if (type === 'array') {
		return `${prefix}[${key}]`;
	}
	return `${prefix}['${key}']`;
}
