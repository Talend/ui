import Step from './Step';
import StepValidated from './variations/Step.validated';
import StepEnabled from './variations/Step.enabled';
import StepDisabled from './variations/Step.disabled';
import StepError from './variations/Step.error';
import StepInProgress from './variations/Step.progress';
import StepSkeleton from './variations/Step.skeleton';

const StepComponent = Step as typeof Step & {
	Validated: typeof StepValidated;
	Enabled: typeof StepEnabled;
	Disabled: typeof StepDisabled;
	Error: typeof StepError;
	InProgress: typeof StepInProgress;
	Skeleton: typeof StepSkeleton;
};

StepComponent.Validated = StepValidated;
StepComponent.Enabled = StepEnabled;
StepComponent.Disabled = StepDisabled;
StepComponent.Error = StepError;
StepComponent.InProgress = StepInProgress;
StepComponent.Skeleton = StepSkeleton;

export default StepComponent;
