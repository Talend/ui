import _get from 'lodash/get';

export default function getIncludesFunction(statePath) {
	return function includes({ context }, path, value) {
		const stateSlice = _get(context.store.getState(), statePath, {});
		const arr = _get(stateSlice, path.split('.'), []);
		return Array.isArray(arr) && arr.includes(value);
	};
}
