import { createContext } from 'react';
import { StepperState } from '../../hooks/useStepperForm/useStepperForm.types';

const stepperFormContext = createContext({});

const StepperFormProvider = stepperFormContext.Provider;

export { StepperFormProvider };

export interface StepperFormContextApi {
	currentStep: number;
	isLoading?: boolean;
	stepperSteps: StepperState;
}

export default createContext({} as StepperFormContextApi);
