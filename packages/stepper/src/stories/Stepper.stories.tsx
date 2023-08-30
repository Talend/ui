import { useState } from 'react';

import { StepperFormContainer as StepperForm } from '../components/StepperForm/StepperFormContainer';
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
		<BusinessContext.Provider
			value={{
				setStepsData,
				stepsData,
			}}
		>
			<StepperForm steps={initialSteps} onSubmit={() => alert('You did it')} />
		</BusinessContext.Provider>
	);
};
