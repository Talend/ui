import type { ElementType } from 'react';

import { Stepper } from '@talend/design-system';
import { StepperStep } from './StepperForm.types';
import { StepperState } from '../../hooks/useStepperForm/useStepperForm.types';

export const getStepComponent = (
	current: number,
	index: number,
	isDisabled = false,
): ElementType => {
	if (isDisabled) {
		return Stepper.Step.Disabled;
	} else if (current === index) {
		return Stepper.Step.InProgress;
	} else if (current > index) {
		return Stepper.Step.Validated;
	}
	return Stepper.Step.Enabled;
};

export const getStepperState = (initialSteps: StepperStep[]) => {
	const steps: StepperState = [];

	initialSteps.forEach((step: StepperStep, index: number) => {
		steps.push({
			...step,
			navigation: {
				previous: index - 1 >= 0 ? initialSteps[index - 1].key : undefined,
				next: index + 1 < initialSteps.length ? initialSteps[index + 1].key : undefined,
			},
		});
	});

	return steps;
};
