import get from 'lodash/get';
import formatJSONPath from '../jsonPath';

/**
 * Get the next branch of schema.
 * @param {object} schema
 */

export function getNextSchemaItems(schema) {
	return (
		get(schema, 'type.items') ||
		get(schema, 'type.values') ||
		get(schema, 'type.fields') ||
		get(schema, 'values') ||
		get(schema, 'fields') ||
		get(schema, 'items') ||
		get(schema, 'type') ||
		schema
	);
}

/**
 * We are reading the schema, using its keys to construct the next records branch.
 * Return an array of items transformed.
 * @param {object} value
 * @param {object} schema
 */
export function transformObjectBranch(itemChilds, schema) {
	if (get(schema, 'type.values') || get(schema, 'values')) {
		return Object.entries(itemChilds).map(obj => {
			const OBJECT_KEY = 0;
			const OBJECT_VALUE = 1;
			return {
				dataKey: obj[OBJECT_KEY],
				value: {
					schema: get(schema, 'type.values', schema),
					data: { ...obj[OBJECT_VALUE] },
				},
			};
		});
	}
	return getNextSchemaItems(schema).map(itemSchema => {
		const item = itemChilds[itemSchema.name];
		return {
			dataKey: itemSchema.name,
			value: {
				schema: itemSchema,
				data: item,
			},
		};
	});
}

/**
 * We are associating the schema with the array of items.
 * Return an array of items transformed.
 * @param {array} itemChilds
 * @param {object} schema
 */
export function transformArrayBranch(itemChilds, schema) {
	return itemChilds.map((data, index) => ({
		dataKey: index,
		value: {
			schema: getNextSchemaItems(schema),
			data,
		},
	}));
}

/**
 * Return the item value.
 * @param {object} item
 */
export function getItemValue(item) {
	if (typeof get(item, 'data.value.bytes') === 'string') {
		return item.data.value.bytes;
	}
	return get(item, 'data.value', item.value);
}

/**
 * If type is an array, we return the matching name, or null type (optional)
 * @param {obj} schema
 * @param {string} unionKey
 */
export function findSchemaUnion(schema, unionKey) {
	const type = get(schema, 'type');
	if (!Array.isArray(type)) {
		return false;
	}

	return type.find(elt => elt.name === unionKey || elt.type === unionKey);
}

/**
 * If the item is an union, we are searching for the union name,
 * else the datakey is suffisant.
 * @param {string} dataKey
 * @param {obj} value
 */
export function getObjectBranchDatakey(dataKey, value) {
	const schema = get(value, 'schema');
	const item = get(value, 'data');
	if (schema && item) {
		const unionKey = get(item, 'unionKey');
		if (Array.isArray(schema.type)) {
			const typeArray = schema.type.find(elt => elt.type === 'array');
			if (typeArray && typeof typeArray.items === 'object') {
				return typeArray.items.name || typeArray.items.type;
			}
		}
		if (findSchemaUnion(schema, unionKey)) {
			return unionKey;
		}
	}
	return dataKey;
}

/**
 * If item is a union, we use the union key to find the good schema.
 * @param {object} item
 * @param {object} schema
 */
export function getSchemaUnion(item, schema) {
	const union = findSchemaUnion(schema, get(item, 'data.unionKey'));
	if (union) {
		return union;
	}
	return schema;
}

/**
 * Return a string, representing the current jsonpath.
 * We are looking if our parent is an union.
 * If so we get the name or make it optional.
 * @param {string} dataKey
 * @param {object} parent
 */
export function getJSONPath(dataKey, parent) {
	/*
		This code fixed a bug in very few cases
		(multiple record in union optional).
		But it creates also regression.
	/*
	const union = findSchemaUnion(
		get(parent, 'value.value.schema'),
		get(parent, 'value.value.data.unionKey'),
	);
	const dataKeys = [dataKey];
	if (union) {
		dataKeys.push(get(union, 'name', 'optional'));
	}
	*/
	return formatJSONPath([dataKey], parent.jsonpath, parent.type);
}

/**
 * Use in branch. Called to create a new branch.
 * Return transform item for a object or an array.
 */
export function getChilds(item, schema, type) {
	const checkSchema = getSchemaUnion(item, schema);
	const itemsBranch = getItemValue(item);
	if (type === 'object') {
		return transformObjectBranch(itemsBranch, checkSchema);
	}
	return transformArrayBranch(itemsBranch, checkSchema);
}

/**
 * Return the length of the item childs.
 * @param {object} data
 */
export function getChildsCount(item) {
	const value = getItemValue(item);
	if (Array.isArray(value)) {
		return value.length;
	} else if (typeof value === 'object') {
		return Object.keys(value).length;
	}
	return 0;
}

/**
 * Used in TreeNode to get the type of the value.
 * Help  determines if the current element is a branch or a leaf.
 * @param {object} avroSample
 */
export function getItemType(item) {
	const value = getItemValue(item);
	if (Array.isArray(value)) {
		return 'array';
	} else if (value === null) {
		return 'string';
	}
	return typeof value;
}
