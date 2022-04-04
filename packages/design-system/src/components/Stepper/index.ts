import StepperVertical from './variations/Stepper.vertical';
import StepperHorizontal from './variations/Stepper.horizontal';
import Step from './Step';

const StepperComponent = StepperVertical as typeof StepperVertical & {
	Vertical: typeof StepperVertical;
	Horizontal: typeof StepperHorizontal;
	Step: typeof Step;
};

StepperComponent.Vertical = StepperVertical;
StepperComponent.Horizontal = StepperHorizontal;

StepperComponent.Step = Step;

export default StepperComponent;
