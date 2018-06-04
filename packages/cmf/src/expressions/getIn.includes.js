import _get from 'lodash/get';
import Immutable from 'immutable';
import curry from 'lodash/curry';

function getInIncludes(statePath, { context }, immutablePath, value) {
	return _get(context.store.getState(), statePath, new Immutable.Map())
		.getIn(immutablePath.split('.'), new Immutable.List())
		.includes(value);
}

export default curry(getInIncludes);
