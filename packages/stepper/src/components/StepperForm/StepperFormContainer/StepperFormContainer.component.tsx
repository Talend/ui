import StepperForm from '../StepperForm.component';
import { StepperFormProvider } from '../StepperForm.context';
import { StepperStep } from '../StepperForm.types';

export interface StepperFormContainerProps {
	initialStepIndex?: number;
	onSubmit: (currentStep: number) => void;
	steps: StepperStep[];
}

export const StepperFormContainer = ({
	initialStepIndex,
	steps,
	onSubmit,
}: StepperFormContainerProps) => {
	return (
		<StepperFormProvider initialStepIndex={initialStepIndex} steps={steps} onSubmit={onSubmit}>
			<StepperForm />
		</StepperFormProvider>
	);
};

StepperFormContainer.displayName = 'StepperFormContainer';
