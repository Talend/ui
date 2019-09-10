import get from 'lodash/get';

function arrayStartsWith(prefix, arrayToCheck) {
	return prefix.every((next, index) => arrayToCheck[index] === next);
}

/**
 * Insert array element index in all nested schema key
 *
 * Example with array key ['my', 'array'] :
 * {
 * 		key: ['my', 'array', ''],
 * 		widget: 'fieldset',
 * 		items: [
 * 			{
 * 				key: ['my', 'item', ''],
 *				widget: 'CustomFieldset',
 *				items: [
 *					{ key: ['my', 'array', '', path] },
 *					{ key: ['my', 'array', '', name] },
 *					{ key: ['other'] },
 *				]
 * 			}
 * 		],
 * }
 *
 * Result
 * {
 * 		key: ['my', 'array', index], // inject index in current element key
 * 		widget: 'fieldset',
 * 		items: [
 * 			{
 * 				key: ['my', 'array', index], // inject index in nster element child
 *				widget: 'CustomFieldset',
 *				items: [
 *					{ key: ['my', 'array', index, path] }, // inject index in nested element child
 *					{ key: ['my', 'array', index, name] },
 *					{ key: ['other'] }, // don't touch any element with a different key than the array
 *				]
 * 			}
 * 		],
 * },
 */
function adaptArrayItemKey(arraySchema, item, itemIndex) {
	const arrayKey = arraySchema.key;
	const itemKey = item.key;
	const itemChildren = item.items;
	const childSchemaItems = get(arraySchema, 'schema.items', undefined);
	const childTitleMap = get(arraySchema, 'titleMap', undefined);

	if (itemKey && !arrayStartsWith(arrayKey, itemKey)) {
		return item;
	}

	const schema = {
		...(childSchemaItems && { schema: childSchemaItems }),
		...(childTitleMap && { titleMap: childTitleMap }),
		...item,
	};

	if (itemKey) {
		const indexedKey = [...itemKey];
		indexedKey[arrayKey.length] = itemIndex;
		schema.key = indexedKey;
	}
	if (arraySchema.readOnly) {
		schema.readOnly = true;
	}
	if (arraySchema.disabled) {
		schema.disabled = true;
	}

	if (itemChildren) {
		schema.items = itemChildren.map(child => adaptArrayItemKey(arraySchema, child, itemIndex));
	}

	return schema;
}

/**
 * Adapt array element items with the element index
 * Example:
 * Array schema
 * {
 * 		items: [
 *			{ key: ['my', 'array', '', name], widget: 'text' },
 *			{ key: ['my', 'array', '', path], widget: 'text' },
 *		]
 * }
 *
 * Result
 * [
 *		{ key: ['my', 'array', index, 'name'], widget: 'text' }, // insert nested index
 *		{ key: ['my', 'array', index, 'path'], widget: 'text' }, // insert nested index
 * ],
 *
 * @param arraySchema
 * @param elementIndex
 */
export function getArrayElementItems(arraySchema, elementIndex) {
	return arraySchema.items.map(item => adaptArrayItemKey(arraySchema, item, elementIndex));
}

/**
 * Build schema for an array element, based on array schema
 * Example:
 * Array schema
 * {
 * 		key: ['my', 'array'],
 *		items: [
 *			{ key: ['my', 'array', '', name], widget: 'text' },
 *			{ key: ['my', 'array', '', path], widget: 'text' },
 *		]
 * }
 * Result
 * {
 * 		key: ['my', 'array', index], // insert index
 *		items: [
 *			{ key: ['my', 'array', index, 'name'], widget: 'text' }, // insert nested index
 *			{ key: ['my', 'array', index, 'path'], widget: 'text' }, // insert nested index
 *		],
 *		widget: 'fieldset', // insert item widget
 * }
 *
 * @param arraySchema The array schema
 * @param elementIndex The index of the element in the array
 */
export function getArrayElementSchema(arraySchema, elementIndex) {
	return {
		key: arraySchema.key.concat(elementIndex),
		items: getArrayElementItems(arraySchema, elementIndex),
		widget: arraySchema.itemWidget || 'fieldset',
		title: arraySchema.itemTitle,
	};
}
