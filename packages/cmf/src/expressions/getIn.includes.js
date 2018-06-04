import _get from 'lodash/get';
import Immutable from 'immutable';

export default function getInIncludesClosure(statePath) {
	return function getInIncludes({ context }, immutablePath, value) {
		return _get(context.store.getState(), statePath, new Immutable.Map())
			.getIn(immutablePath.split('.'), new Immutable.List())
			.includes(value);
	};
}
