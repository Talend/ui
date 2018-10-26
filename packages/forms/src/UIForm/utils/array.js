function arrayStartsWith(prefix, arrayToCheck) {
	return prefix.every((next, index) => arrayToCheck[index] === next);
}

function adaptArrayItemKey(arraySchema, item, itemIndex) {
	const arrayKey = arraySchema.key;
	const itemKey = item.key;
	const itemChildren = item.items;

	if (itemKey && !arrayStartsWith(arrayKey, itemKey)) {
		return item;
	}

	const schema = {
		...item,
	};

	if (itemKey) {
		const indexedKey = [...itemKey];
		indexedKey[arrayKey.length] = itemIndex;
		schema.key = indexedKey;
	}

	if (itemChildren) {
		schema.items = itemChildren.map(child => adaptArrayItemKey(arraySchema, child, itemIndex));
	}

	return schema;
}

/**
 * Build the array content.
 * @param arraySchema
 * @param elementIndex
 * @returns {*}
 */
export function getArrayElementItems(arraySchema, elementIndex) {
	return arraySchema.items.map(item => adaptArrayItemKey(arraySchema, item, elementIndex));
}

/**
 * Build schema for an array element, based on array schema
 * @param arraySchema The array schema
 * @param elementIndex The index of the element in the array
 */
export function getArrayElementSchema(arraySchema, elementIndex) {
	return {
		key: arraySchema.key.concat(elementIndex),
		items: getArrayElementItems(arraySchema, elementIndex),
		widget: arraySchema.itemWidget || 'fieldset',
	};
}
