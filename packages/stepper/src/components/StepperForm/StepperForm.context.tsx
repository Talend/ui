import { createContext, ReactNode } from 'react';

import { useStepperForm } from '../../hooks/useStepperForm/useStepperForm.hook';
import { StepperState } from '../../hooks/useStepperForm/useStepperForm.types';
import { StepperStep } from './StepperForm.types';

const emptyFn = () => {};

interface StepperFormValues {
	currentStep: number;
	onDisableStep: (stepKey: string, cause: string) => void;
	onEnableStep: (stepKey: string) => void;
	onNext: () => void;
	onPrevious: () => void;
	steps: StepperState;
}

export const StepperFormContext = createContext<StepperFormValues>({
	onDisableStep: emptyFn,
	onEnableStep: emptyFn,
	onNext: emptyFn,
	onPrevious: emptyFn,
	steps: [],
	currentStep: 0,
});

export interface StepperFormProviderProps {
	children: ReactNode;
	initialStepIndex: number;
	steps: StepperStep[];
}

export const StepperFormContextProvider = ({
	children,
	initialStepIndex,
	steps,
}: StepperFormProviderProps) => {
	const { currentStep, onDisableStep, onEnableStep, onNextStep, onPreviousStep, stepperSteps } =
		useStepperForm(steps, initialStepIndex);

	return (
		<StepperFormContext.Provider
			value={{
				currentStep,
				onDisableStep,
				onEnableStep,
				onNext: onNextStep,
				onPrevious: onPreviousStep,
				steps: stepperSteps,
			}}
		>
			{children}
		</StepperFormContext.Provider>
	);
};
