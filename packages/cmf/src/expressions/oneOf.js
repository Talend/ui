import get from 'lodash/get';
import { Map, List } from 'immutable';

export default function getOneOfFunction(statePath) {
	return function includes({ context }, immutablePath, values) {
		if (!Array.isArray(values)) {
			throw new Error('You should pass an array of values to check if one of them is present');
		}
		const arr = get(context.store.getState(), statePath, new Map()).getIn(
			immutablePath.split('.'),
			new List(),
		);
		return values.some(value => arr.includes(value));
	};
}
