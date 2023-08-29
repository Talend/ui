import { Stepper } from '@talend/react-components';

import * as constants from './Stepper.constants';
import StepperForm from './components/StepperForm/StepperFormContainer';
import StepperContainer from './containers/Stepper.connect';
import { useStepperForm } from './hooks/useStepperForm/useStepperForm.hook';
import { initStepper, proceedLoadingEvent, removeStepper } from './service/Stepper.actions';
import stepperReducer from './service/Stepper.reducer';
import { getStepsForResource, isResourceLoading } from './service/Stepper.selectors';
import { getStepperKey } from './service/Stepper.utils';

const { isAllSuccessful, isStepsLoading, isErrorInSteps } = Stepper;

const cmfModule = {
	id: 'dataset-stepper',
	reducer: {
		[constants.STATE_KEY]: stepperReducer,
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

export const StepperConstants = constants;

export { StepperForm, useStepperForm };
export default { ...cmfModule };
