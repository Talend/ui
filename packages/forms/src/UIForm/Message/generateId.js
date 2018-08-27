export function generateDescriptionId(id) {
	return id && `${id}-description`;
}

export function generateErrorId(id) {
	return id && `${id}-error`;
}

export function generateDescribedBy(id) {
	return id && `${generateDescriptionId(id)} ${generateErrorId(id)}`;
}
