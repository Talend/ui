import React from 'react';
import { get, has } from 'lodash';
import classNames from 'classnames';
import defaultGetJSONPath from '../jsonPath';
import theme from './ModelViewer.scss';

/**
 * Data type does not follow the model type.
 * Here we want to display the model
 * - item = array : the model is an array of field. This condition for root node.
 * 					we want to display each root property as a JSON object property
 * - item.fields : 	it means that it is a record.
 * 					its children fields should be displayed as a JSON object property
 * - item.items : 	it means that it is an array.
 * 				 	but we want to display the array objects fields as a JSON object property
 */
function getDataType(item) {
	if (Array.isArray(item) || has(item, 'fields') || has(item, 'items')) {
		return 'object';
	}
	return null;
}

/**
 * The node displayed text is only the key, with no value but the property type.
 * Example of a property schema model :
 *  {
		name: 'name',
		doc: 'Name',
		type: {
			type: 'string',
			dqType: 'Recipe',
			dqTypeKey: 'RECIPE',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
 * We display the DQ type if present and fallback to the simple type.
 */
function getDisplayKey({ value }) {
	const type = value.type && (value.type.dqType || value.type.type);
	return [
		value.doc,
		type && <span className={classNames(theme['tc-model-type'], 'tc-model-type')}>({type})</span>,
	];
}

/**
 * The fields are the children in case of an object or an array.
 * Just a reminder : we display a model here. We have 3 cases
 * - root: it's an array of properties. Each property is an avro schema definition.
 * - record: item.fields is an array of properties. Each property is an avro schema definition.
 * 	{
		name: 'nested',
		doc: 'Nested things',
		type: {
			type: 'record',
		},
		fields: [...]
 *	}
 * - array: item.items is a property avro definition that descrive each element of the array.
 * 			So we follow with the "record" case, item.items.fields is an array of properties.
 * 			Each property is an avro schema definition.
 *
 * The format that the generic viewer waits for is { dataKey, value }.
 * Each 3 cases produces an array of avro record
 * definition, that we adapt to this format.
 */
function getFields(item) {
	const fields = Array.isArray(item) ? item : get(item, 'fields') || get(item, 'items.fields');
	if (!Array.isArray(fields)) {
		return null;
	}
	return fields.map(field => ({ dataKey: field.name, value: field }));
}

/**
 * The jsonpath is used on node selection.
 * For example, it will indicates to highlight some nodes in the records viewer.
 * The Generic viewer allows to highlight through a regex to match the record json path.
 *
 * Unfortunately, the default jsonpath it produces, follows the displayed object.
 * So if we select a node that describes a property of arrays elements, we will have
 * $['my-array']['array-item-property']
 * There is no way to know where is the array,
 * impossible to produce a regex matching array elements from that.
 *
 * Here if we have an array, we add an extra '[]'.
 * So the previous example will produce
 * $['my-array'][]['array-item-property']
 * The array is marked, it's easy to produce the regex
 * \$\['my-array']\[[0-9]+]\['array-item-property']
 * that matches 'array-item-property' in all 'my-array' elements' jsonpath.
 */
function getCurrentParentJSONPath(parent) {
	if (has(parent, 'value.type') && get(parent, 'value.type.type') === 'array') {
		return defaultGetJSONPath('', parent.jsonpath, 'array');
	}
	return parent.jsonpath;
}

function getJSONPath({ dataKey, parent }) {
	return defaultGetJSONPath(dataKey, getCurrentParentJSONPath(parent));
}

/**
 * We don't display values, just a key with its type.
 */
function getDisplayValue() {}

export default {
	getDataType,
	getDisplayKey,
	getDisplayValue,
	getFields,
	getJSONPath,
};
