import { useState } from 'react';
import StepperForm from '../components/StepperForm';
import { StepperState } from '../hooks/useStepperForm/useStepperForm.types';
import {
	BusinessContext,
	FormComponentStep1,
	FormComponentStep2,
	FormComponentStep3,
} from './Stepper.components';

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
	const initialSteps: StepperState = [
		{
			key: 'STEP1',
			name: 'Step 1',
			component: () => <FormComponentStep1 />,
			header: {
				title: 'This is step 1 title',
			},
		},
		{
			key: 'STEP2',
			name: 'Step 2',
			component: () => <FormComponentStep2 />,
			header: {
				title: 'This is step 2 title',
			},
		},
		{
			key: 'STEP3',
			name: 'Step 3',
			component: () => <FormComponentStep3 />,
			header: {
				title: 'This is step 3 title',
			},
		},
	];
	const [stepsData, setStepsData] = useState<any>({});

	return (
		<StepperForm.Provider initialStepIndex={0} steps={initialSteps}>
			<BusinessContext.Provider
				value={{
					setStepsData,
					stepsData,
				}}
			>
				<StepperForm />
			</BusinessContext.Provider>
		</StepperForm.Provider>
	);
};
