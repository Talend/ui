import getJSONPathUtils from '../jsonPath';

export function defaultFormatValue(value) {
	if (typeof value === 'string') {
		return `"${value}"`;
	}
	return value;
}

export function defaultGetDataType(data) {
	if (Array.isArray(data)) {
		return 'array';
	}
	return typeof data;
}

export function defaultGetFields(data, type) {
	if (type === 'object') {
		return Object.keys(data).map(dataKey => ({ dataKey, value: data[dataKey] }));
	}
	return data.map((datum, index) => ({ dataKey: index, value: datum }));
}

export function defaultGetDisplayKey({ dataKey }) {
	return dataKey;
}

export function defaultGetJSONPath({ dataKey, parent }) {
	return getJSONPathUtils(dataKey, parent.jsonpath, parent.type);
}

export function defaultGetQuality() {
	return null;
}

export function defaultGetValue({ value }) {
	return value;
}

export function defaultGetIcon({ isOpened }) {
	const name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const transform = isOpened ? null : 'rotate-180';

	return { name, transform };
}
