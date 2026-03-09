import _get from 'lodash/get';
import { Map, List } from 'immutable';

export default function getIncludesFunction(statePath) {
	return function includes({ context }, immutablePath, value) {
		return _get(context.store.getState(), statePath, new Map())
			.getIn(immutablePath.split('.'), new List())
			.includes(value);
	};
}
