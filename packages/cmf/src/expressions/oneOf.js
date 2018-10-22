import get from 'lodash/get';
import Immutable from 'immutable';

export default function getOneOfFunction(statePath) {
	return function includes({ context }, immutablePath, values) {
		if (!Array.isArray(values)) {
			throw new Error('You should pass an array of values to check if one of them is present');
		}
		const arr = get(context.store.getState(), statePath, new Immutable.Map()).getIn(
			immutablePath.split('.'),
			new Immutable.List(),
		);
		return values.some(value => arr.includes(value));
	};
}
