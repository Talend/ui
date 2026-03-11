import { jsx } from 'react/jsx-runtime';
import { createContext } from 'react';
import { useStepperForm } from '../../hooks/useStepperForm/useStepperForm.hook';
const emptyFn = () => {};
const StepperFormContext = createContext({
	disableStep: emptyFn,
	enableStep: emptyFn,
	onNext: emptyFn,
	onPrevious: emptyFn,
	steps: [],
	currentStep: 0,
});
const StepperFormProvider = ({ children, initialStepIndex = 0, steps, onSubmit }) => {
	const { currentStep, disableStep, enableStep, onNextStep, onPreviousStep, stepperSteps } =
		useStepperForm(steps, initialStepIndex, onSubmit);
	return /* @__PURE__ */ jsx(StepperFormContext.Provider, {
		value: {
			currentStep,
			disableStep,
			enableStep,
			onNext: onNextStep,
			onPrevious: onPreviousStep,
			steps: stepperSteps,
		},
		children,
	});
};
export { StepperFormContext, StepperFormProvider };
//# sourceMappingURL=StepperForm.context.js.map
