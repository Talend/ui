import get from 'lodash/get';

export default function getAllOfFunction(statePath) {
	return function includes({ context }, path, values) {
		if (!Array.isArray(values)) {
			throw new Error('You should pass an array of values to check if all of them are present');
		}
		const stateSlice = get(context.store.getState(), statePath, {});
		const arr = get(stateSlice, path.split('.'), []);
		// Checks that every item in the stored array is among the provided values (subset check)
		return Array.isArray(arr) && arr.length > 0 && arr.every(value => values.includes(value));
	};
}
