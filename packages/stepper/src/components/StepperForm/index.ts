import StepperForm from './StepperForm.component';
import StepFooter from './StepFooter';
import { StepperFormProvider, StepperFormContext } from './StepperForm.context';

const StepperFormComponent = StepperForm as typeof StepperForm & {
	Context: typeof StepperFormContext;
	Provider: typeof StepperFormProvider;
	Footer: typeof StepFooter;
};

StepperFormComponent.Context = StepperFormContext;
StepperFormComponent.Provider = StepperFormProvider;
StepperFormComponent.Footer = StepFooter;

export default StepperFormComponent;
