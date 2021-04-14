import Stepper from './Stepper';
import Step from './Step';

const StepperComponent = Stepper as typeof Stepper & {
	Step: typeof Step;
};

StepperComponent.Step = Step;

export default StepperComponent;
