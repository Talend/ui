import uuid from 'uuid';

function generateId(id, suffix) {
	return id ? `${id}-${suffix}` : uuid.v4();
}

export function generateDescriptionId(id) {
	return generateId(id, 'description');
}

export function generateErrorId(id) {
	return generateId(id, 'error');
}
