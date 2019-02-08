// eslint-disable-next-line import/prefer-default-export
export function isUpdating(data = [], schema) {
	if (!Array.isArray(data) || !schema || !schema.key) {
		return false;
	}
	// we need to support current and parent path
	return !!data.find(path => schema.key.join('.').startsWith(path));
}
