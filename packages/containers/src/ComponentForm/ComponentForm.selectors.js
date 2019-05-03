import get from 'lodash/get';
import Immutable from 'immutable';
import { TCompForm } from './ComponentForm.component';

export function getComponentFormState(state, componentName) {
	return get(state, ['cmf', 'components'], Immutable.Map()).getIn(
		[TCompForm.displayName, componentName],
		Immutable.Map(),
	);
}

export function isComponentFormDirty(state, componentName) {
	return getComponentFormState(state, componentName).get('dirty', false);
}

export default isComponentFormDirty;
