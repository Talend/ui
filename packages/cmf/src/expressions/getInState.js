import _get from 'lodash/get';
import curry from 'lodash/curry';

function getInState(statePath, { context }, path, defaultValue) {
	const stateSlice = _get(context.store.getState(), statePath, {});
	return _get(stateSlice, path.split('.'), defaultValue);
}

export default curry(getInState);
