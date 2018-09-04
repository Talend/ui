import uuid from 'uuid';

export function generateDescriptionId(id) {
	return id ? `${id}-description` : uuid.v4();
}

export function generateErrorId(id) {
	return id ? `${id}-error` : uuid.v4();
}
