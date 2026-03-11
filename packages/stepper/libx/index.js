import { Stepper } from '@talend/react-components';
import * as constants from './Stepper.constants';
import StepperForm from './components/StepperForm';
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
const StepperActions = {
	initStepper,
	proceedLoadingEvent,
	removeStepper,
};
const StepperSelectors = {
	getStepsForResource,
	isResourceLoading,
};
const StepperComponents = {
	Stepper: StepperContainer,
};
const StepperUtils = {
	isAllSuccessful,
	isErrorInSteps,
	isStepsLoading,
	getStepperKey,
};
const StepperConstants = constants;
var index_default = { ...cmfModule };
export {
	StepperActions,
	StepperComponents,
	StepperConstants,
	StepperForm,
	StepperSelectors,
	StepperUtils,
	index_default as default,
	useStepperForm,
};
//# sourceMappingURL=index.js.map
