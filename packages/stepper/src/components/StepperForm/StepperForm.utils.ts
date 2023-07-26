import type { ElementType } from 'react';

import { Stepper } from '@talend/design-system';

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
