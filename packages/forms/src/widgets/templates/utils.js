import { randomUUID } from '@talend/utils';

export function generateId(id, suffix) {
	if (id) {
		return `${id}-${suffix}`;
	}
	return randomUUID();
}

export function generateDescriptionId(id) {
	return generateId(id, 'description');
}

export function generateErrorId(id) {
	return generateId(id, 'error');
}
