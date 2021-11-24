import get from 'lodash/get';
import Immutable from 'immutable';

export default function getAllOfFunction(statePath) {
	return function includes({ context }, immutablePath, values) {
		if (!Array.isArray(values)) {
			throw new Error('You should pass an array of values to check if all of them are present');
		}
		const arr = get(context.store.getState(), statePath, new Immutable.Map()).getIn(
			immutablePath.split('.'),
			new Immutable.List(),
		);
		return arr.size > 0 && arr.every(value => values.includes(value));
	};
}
