import { useState } from 'react';
import StepperForm from '../src/components/StepperForm';
import { StepperState } from '../src/hooks/useStepperForm/useStepperForm.types';
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
			title: 'Step 1',
			component: () => <FormComponentStep1 />,
		},
		{
			key: 'STEP2',
			title: 'Step 2',
			component: () => <FormComponentStep2 />,
		},
		{
			key: 'STEP3',
			title: 'Step 3',
			component: () => <FormComponentStep3 />,
		},
	];
	const [stepsData, setStepsData] = useState<any>({});

	const BusinessComponent = () => {
		return (
			<StepperForm
				header={{
					title: 'This is step 1 title',
				}}
			/>
		);
	};

	return (
		<StepperForm.ContextProvider initialStepIndex={0} steps={initialSteps}>
			<BusinessContext.Provider
				value={{
					setStepsData,
					stepsData,
				}}
			>
				<BusinessComponent />
			</BusinessContext.Provider>
		</StepperForm.ContextProvider>
	);
};
