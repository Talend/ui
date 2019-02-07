// eslint-disable-next-line import/prefer-default-export
export function isUpdating(data = [], schema) {
	if (!Array.isArray(data)) {
		return data;
	}
	if (!schema) {
		return false;
	}
	return !!data.find(path => path === schema.key.join('.'));
}
