import Stepper from '@talend/react-components/lib/Stepper';
import stepperReducer from './service/Stepper.reducer';
import { getStepperKey } from './service/Stepper.utils';
import { initStepper, proceedLoadingEvent, removeStepper } from './service/Stepper.actions';
import { getStepsForResource, isResourceLoading } from './service/Stepper.selectors';
import StepperContainer from './containers/Stepper.connect';
import { STATE_KEY, LOADING_STEP_STATUSES } from './Stepper.constants';

const { isAllSuccessful, isStepsLoading, isErrorInSteps } = Stepper;

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
	Stepper: StepperContainer,
};

export const StepperUtils = {
	isAllSuccessful,
	isErrorInSteps,
	isStepsLoading,
	getStepperKey,
};

export const StepperConstants = {
	LOADING_STEP_STATUSES,
};

export default cmfModule;
