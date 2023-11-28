import { StepperVertical, StepperVerticalProps } from './variations/Stepper.vertical';
import { StepperHorizontal, StepperHorizontalProps } from './variations/Stepper.horizontal';
import Step from './Step';

const Stepper = StepperVertical as typeof StepperVertical & {
	Vertical: typeof StepperVertical;
	Horizontal: typeof StepperHorizontal;
	Step: typeof Step;
};

Stepper.Vertical = StepperVertical;
Stepper.Horizontal = StepperHorizontal;

Stepper.Step = Step;

export type { StepperVerticalProps, StepperHorizontalProps };
export { Stepper };
