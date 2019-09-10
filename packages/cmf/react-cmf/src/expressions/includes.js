import _get from 'lodash/get';
import Immutable from 'immutable';

export default function getIncludesFunction(statePath) {
	return function includes({ context }, immutablePath, value) {
		return _get(context.store.getState(), statePath, new Immutable.Map())
			.getIn(immutablePath.split('.'), new Immutable.List())
			.includes(value);
	};
}
