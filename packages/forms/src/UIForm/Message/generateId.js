import uuid from 'uuid';

export function generateId(id, suffix) {
	if (id) {
		return `${id}-${suffix}`;
	}
	return uuid.v4();
}

export function generateDescriptionId(id) {
	return generateId(id, 'description');
}

export function generateErrorId(id) {
	return generateId(id, 'error');
}
