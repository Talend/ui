export function getIn({ context }, path, defaultValue) {
	return context.store.getState().cmf.collections.getIn(path, defaultValue);
}

export function get(fullContext, id, defaultValue) {
	const path = id.split('.');
	return getIn(fullContext, path, defaultValue);
}
