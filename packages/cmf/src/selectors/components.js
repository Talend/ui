import getToJSMemoized from './toJS';

/**
 * return a collection or subset of a collection from a cmf store
 * this function returns collection from cmf.components, where the local state of some components
 * @param {Object} state
 * @param {String or Array<String>} collectionPath
 * @example
 *  get('foo.bar', true) === state.cmf.components.getIn(['foo', 'bar'], true)
 */
export function get(state, collectionPath, defaultValue) {
	let path;
	if (typeof collectionPath === 'string') {
		path = collectionPath.split('.');
	} else if (Array.isArray(collectionPath)) {
		path = collectionPath;
	}
	if (path) {
		return state.cmf.components.getIn(path, defaultValue);
	}
	throw Error(`Type mismatch: collectionPath should be a string or an array of string
got ${collectionPath}`);
}

const selectors = {};

export function toJSMemoized(state, path) {
	const joinedPath = Array.isArray(path) ? path.join('.') : path;
	if (!selectors[joinedPath]) {
		selectors[joinedPath] = getToJSMemoized(calledState => get(calledState, path));
	}
	return selectors[joinedPath](state);
}

export function getFormDataToJS(state, formId) {
	return toJSMemoized(state, `Container(Form).${formId}.data`);
}

export function getFormData(state, formId, defaultValue) {
	return get(state, `Container(Form).${formId}.data`, defaultValue);
}
