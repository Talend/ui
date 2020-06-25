import get from 'lodash/get';
import Stepper from '@talend/react-components/lib/Stepper';
import { STATE_KEY } from '../Stepper.constants';
import { getStepperKey } from './Stepper.utils';

export function getStepsForResource(store, resourceType, resourceId) {
	return get(store, [STATE_KEY, getStepperKey({ resourceType, resourceId }), 'steps'], []);
}

export function isResourceLoading(store, resourceType, resourceId) {
	return Stepper.isStepsLoading(getStepsForResource(store, resourceType, resourceId));
}
