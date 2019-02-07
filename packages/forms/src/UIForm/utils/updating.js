// eslint-disable-next-line import/prefer-default-export
export function isUpdating(data = [], schema) {
	if (!Array.isArray(data)) {
		return data;
	}
	if (!schema) {
		console.log('no schema');
		return false;
	}
	return !!data.find(path => path === schema.key.join('.'));
}
