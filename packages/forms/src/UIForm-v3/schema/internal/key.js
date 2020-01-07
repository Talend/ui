export function serializeKey(schema) {
	return schema.key.reduce((accu, nextPart) => {
		const partIsNumber = !isNaN(nextPart);
		const adaptedPart = partIsNumber ? `[${nextPart}]` : nextPart;
		const accuWithSeparator = accu && !partIsNumber ? `${accu}.` : accu;
		return `${accuWithSeparator}${adaptedPart}`;
	}, '');
}

export function generateKey(parentKey = '', childKey, parentType) {
	if (parentType === 'array') {
		return `${parentKey}[${childKey}]`;
	}
	const keyPrefix = parentKey ? `${parentKey}.` : '';
	return `${keyPrefix}${childKey}`;
}
