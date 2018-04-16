import { get } from 'lodash';
import getJSONPathUtils from '../jsonPath';

export function defaultGetDataType(data) {
	if (data === null) {
		return null;
	} else if (Array.isArray(data)) {
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

export function defaultGetFieldsCount(data, type) {
	if (type === 'object') {
		return Object.keys(data).length;
	}
	return get(data, 'data.value', []).length;
}

export function defaultGetDisplayKey({ dataKey }) {
	return dataKey;
}

export function defaultGetDisplayValue({ value }) {
	if (typeof value === 'string') {
		return `"${value}"`;
	} else if (typeof value === 'boolean') {
		return String(value);
	}
	return value;
}

export function defaultGetJSONPath({ dataKey, parent }) {
	return getJSONPathUtils(dataKey, parent.jsonpath, parent.type);
}

export function defaultGetQuality() {
	return null;
}

export function defaultGetIcon({ isOpened }) {
	const name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
	const transform = isOpened ? null : 'rotate-180';
	return { name, transform };
}
