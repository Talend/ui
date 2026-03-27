import get from 'lodash/get';

export default function getOneOfFunction(statePath) {
	return function includes({ context }, path, values) {
		if (!Array.isArray(values)) {
			throw new Error('You should pass an array of values to check if one of them is present');
		}
		const stateSlice = get(context.store.getState(), statePath, {});
		const arr = get(stateSlice, path.split('.'), []);
		return Array.isArray(arr) && values.some(value => arr.includes(value));
	};
}
