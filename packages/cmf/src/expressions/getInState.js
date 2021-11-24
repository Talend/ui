import _get from 'lodash/get';
import Immutable from 'immutable';
import curry from 'lodash/curry';

function getInState(statePath, { context }, immutablePath, defaultValue) {
	return _get(context.store.getState(), statePath, new Immutable.Map()).getIn(
		immutablePath.split('.'),
		defaultValue,
	);
}

export default curry(getInState);
