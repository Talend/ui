import { useState } from 'react';
import StepperForm from '../src/components/StepperForm/StepperForm.component';
import { useStepperForm } from '../src/hooks/useStepperForm/useStepperForm.hook';
import { StepperState } from '../src/hooks/useStepperForm/useStepperForm.types';

export default {
	title: 'Stepper',
	component: StepperForm,
	parameters: {
		docs: {
			description: {
				component: 'Deprecated icons will be removed in the next major version.',
			},
		},
	},
};

export const DefaultStory = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const initialSteps: StepperState = [
		{
			key: 'SELECTION',
			title: 'Selection',
			component: () => <>Selection</>,
		},
		{
			key: 'SHARING',
			title: 'Sharing',
			component: () => <>Sharing</>,
		},
		{
			key: 'SCHEDULING',
			title: 'Scheduling',
			component: () => <>Scheduling</>,
		},
		{
			key: 'DETAILS',
			title: 'Details',
			component: () => <>Details</>,
		},
	];

	return (
		<>
			<StepperForm
				initalStepIndex={0}
				footer={{
					onCancel: () => alert('Cancel action'),
					onSubmit: () => alert('You did it!'),
				}}
				header={{
					title: 'This is step 1 title',
				}}
				steps={initialSteps}
			/>
		</>
	);
};
