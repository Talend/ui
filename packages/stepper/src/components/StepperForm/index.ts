import StepperForm from './StepperForm.component';
import StepperFormFooter from './StepperFormFooter';
import { StepperFormContextProvider } from './StepperForm.context';

const StepperFormComponent = StepperForm as typeof StepperForm & {
	ContextProvider: typeof StepperFormContextProvider;
	Footer: typeof StepperFormFooter;
};

StepperFormComponent.ContextProvider = StepperFormContextProvider;
StepperFormComponent.Footer = StepperFormFooter;

export default StepperFormComponent;
