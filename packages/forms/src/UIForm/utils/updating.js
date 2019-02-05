// eslint-disable-next-line import/prefer-default-export
export function isUpdating(data = [], schema) {
	if (!Array.isArray(data)) {
		return data;
	}
	return !!data.find(path => path === schema.key.join('.'));
}
