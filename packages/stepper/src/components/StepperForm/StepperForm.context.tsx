import { createContext, ReactNode } from 'react';

import { useStepperForm } from '../../hooks/useStepperForm/useStepperForm.hook';
import { StepperState } from '../../hooks/useStepperForm/useStepperForm.types';
import { StepperStep } from './StepperForm.types';

const emptyFn = () => {};

export interface StepperFormValues {
	currentStep: number;
	disableStep: (stepKey: string, cause: string) => void;
	enableStep: (stepKey: string) => void;
	onNext: () => void;
	onPrevious: () => void;
	steps: StepperState;
}

export const StepperFormContext = createContext<StepperFormValues>({
	disableStep: emptyFn,
	enableStep: emptyFn,
	onNext: emptyFn,
	onPrevious: emptyFn,
	steps: [],
	currentStep: 0,
});

export interface StepperFormProviderProps {
	children: ReactNode;
	initialStepIndex?: number;
	steps: StepperStep[];
	onSubmit: (currentStep: number) => void;
}

export const StepperFormProvider = ({
	children,
	initialStepIndex = 0,
	steps,
	onSubmit,
}: StepperFormProviderProps) => {
	const { currentStep, disableStep, enableStep, onNextStep, onPreviousStep, stepperSteps } =
		useStepperForm(steps, initialStepIndex, onSubmit);

	return (
		<StepperFormContext.Provider
			value={{
				currentStep,
				disableStep,
				enableStep,
				onNext: onNextStep,
				onPrevious: onPreviousStep,
				steps: stepperSteps,
			}}
		>
			{children}
		</StepperFormContext.Provider>
	);
};
