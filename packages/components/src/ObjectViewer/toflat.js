/**
 * take an object and create a new FLAT object
 * { foo: { bar: 'baz' } } -> { "$['foo']['bar']": 'baz' }
 * @param  {any} data   [description]
 * @param  {Object} buffer because it's recursive
 * @param  {String} path   to keep the json path
 * @return {Object}        flatten
 */
export default function toFlat(data, buffer = {}, path = '$') {
	if (Array.isArray(data)) {
		data.forEach((value, index) => {
			toFlat(value, buffer, `${path}[${index}]`);
		});
	} else if (!!data && typeof data === 'object') {
		Object.keys(data).forEach(key => {
			toFlat(data[key], buffer, `${path}['${key}']`);
		});
	} else {
		buffer[path] = data; // eslint-disable-line no-param-reassign
	}
	return buffer;
}
