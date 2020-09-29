import Stepper, {
	LOADING_STEP_STATUSES,
	isStepsLoading,
	isAllSuccessful,
	isErrorInSteps,
} from './Stepper.component';

export default Stepper;

// TODO 6.0: remove those exports, they are attached to component
export { LOADING_STEP_STATUSES, isErrorInSteps, isAllSuccessful, isStepsLoading };
