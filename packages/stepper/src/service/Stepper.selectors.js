import get from 'lodash/get';
import { STATE_KEY } from '../Stepper.constants';
import { getStepperKey, isStepsLoading } from './Stepper.utils';

export function getStepsForResource(store, resourceType, resourceId) {
	return get(store, [STATE_KEY, getStepperKey({ resourceType, resourceId }), 'steps'], []);
}

export function isResourceLoading(store, resourceType, resourceId) {
	return isStepsLoading(getStepsForResource(store, resourceType, resourceId));
}
