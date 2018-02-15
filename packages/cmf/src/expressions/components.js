export function getIn({ context }, path, defaultValue) {
	return context.store.getState().cmf.components.getIn(path, defaultValue);
}

export function get(fullContext, id, defaultValue) {
	const path = id.split('.');
	return getIn(fullContext, path, defaultValue);
}
