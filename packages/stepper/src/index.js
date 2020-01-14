import stepperReducer from './service/Stepper.reducer';
import { initStepper, proceedLoadingEvent, removeStepper } from './service/Stepper.actions';
import { getStepsForResource, isResourceLoading } from './service/Stepper.selectors';
import { isAllSuccessful, isStepsLoading, isErrorInSteps } from './service/Stepper.utils';
import Stepper from './containers/Stepper.connect';
import { STATE_KEY, LOADING_STEP_STATUSES } from './Stepper.constants';

const cmfModule = {
	id: 'dataset-stepper',
	reducer: {
		[STATE_KEY]: stepperReducer,
	},
};

export const StepperActions = {
	initStepper,
	proceedLoadingEvent,
	removeStepper,
};

export const StepperSelectors = {
	getStepsForResource,
	isResourceLoading,
};

export const StepperComponents = {
	Stepper,
};

export const StepperUtils = {
	isAllSuccessful,
	isErrorInSteps,
	isStepsLoading,
};

export const StepperConstants = {
	LOADING_STEP_STATUSES,
};

export default cmfModule;
