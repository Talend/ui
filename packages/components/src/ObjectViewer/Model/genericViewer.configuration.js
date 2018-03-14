import React from 'react';
import defaultGetJSONPath from '../jsonPath';
import theme from './ModelViewer.scss';

function getDataType(item) {
	return Array.isArray(item) || item.fields || item.items ? 'object' : null;
}

function getDisplayKey({ value }) {
	const type = value.type && (value.type.dqType || value.type.type);
	return [
		value.doc,
		type && <span className={theme.type}>({type})</span>,
	];
}

function getFields(item) {
	let fields;
	if (Array.isArray(item)) {
		fields = item;
	} else {
		fields = item.fields || (item.items && item.items.fields);
	}
	if (fields) {
		return fields.map(field => ({ dataKey: field.name, value: field }));
	}
	return null;
}

function getJSONPath({ dataKey, parent }) {
	let currentJsonPathAsParent = parent.jsonpath;
	if (parent.value.type && parent.value.type.type === 'array') {
		currentJsonPathAsParent = defaultGetJSONPath('', parent.jsonpath, 'array');
	}
	return defaultGetJSONPath(dataKey, currentJsonPathAsParent);
}

function getValue() {
	return;
}

export default {
	getDataType,
	getDisplayKey,
	getFields,
	getJSONPath,
	getValue,
};
