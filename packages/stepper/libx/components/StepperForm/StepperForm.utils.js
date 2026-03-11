import { Stepper } from '@talend/design-system';
const getStepComponent = (current, index, isDisabled = false) => {
	if (isDisabled) {
		return Stepper.Step.Disabled;
	} else if (current === index) {
		return Stepper.Step.InProgress;
	} else if (current > index) {
		return Stepper.Step.Validated;
	}
	return Stepper.Step.Enabled;
};
const getStepperState = initialSteps => {
	const steps = [];
	initialSteps.forEach((step, index) => {
		steps.push({
			...step,
			navigation: {
				previous: index - 1 >= 0 ? initialSteps[index - 1].key : void 0,
				next: index + 1 < initialSteps.length ? initialSteps[index + 1].key : void 0,
			},
		});
	});
	return steps;
};
export { getStepComponent, getStepperState };
//# sourceMappingURL=StepperForm.utils.js.map
