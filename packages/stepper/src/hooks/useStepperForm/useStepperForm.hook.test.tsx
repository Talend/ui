import { renderHook, act } from '@testing-library/react-hooks';

import { useStepperForm } from './useStepperForm.hook';
import { StepperState } from './useStepperForm.types';

const initialSteps: StepperState = [
	{
		key: 'STEP1',
		name: 'Step 1',
		component: () => {
			return <></>;
		},
		header: {
			title: 'This is step 1 title',
		},
	},
	{
		key: 'STEP2',
		name: 'Step 2',
		component: () => {
			return <></>;
		},
		header: {
			title: 'This is step 2 title',
		},
	},
	{
		key: 'STEP3',
		name: 'Step 3',
		component: () => {
			return <></>;
		},
		header: {
			title: 'This is step 3 title',
		},
	},
];

describe('useStepperForm', () => {
	it('should change to the next step', async () => {
		const { result } = renderHook(() => useStepperForm(initialSteps, 0, jest.fn()));

		act(() => {
			result.current.onNextStep();
		});

		expect(result.current.currentStep).toBe(1);
	});

	it('should change to the previous step', async () => {
		const { result } = renderHook(() => useStepperForm(initialSteps, 1, jest.fn()));

		act(() => {
			result.current.onPreviousStep();
		});

		expect(result.current.currentStep).toBe(0);
	});

	it('should disable and enable step', async () => {
		const { result } = renderHook(() => useStepperForm(initialSteps, 1, jest.fn()));

		act(() => {
			result.current.disableStep('STEP2', 'cause');
		});

		expect(result.current.stepperSteps[0].navigation?.next).toBe('STEP3');
		expect(result.current.stepperSteps[1].navigation?.disableCause).toBe('cause');
		expect(result.current.stepperSteps[2].navigation?.previous).toBe('STEP1');

		act(() => {
			result.current.enableStep('STEP2');
		});

		expect(result.current.stepperSteps[0].navigation?.next).toBe('STEP2');
		expect(result.current.stepperSteps[1].navigation?.disableCause).toBeUndefined();
		expect(result.current.stepperSteps[2].navigation?.previous).toBe('STEP2');
	});
});
