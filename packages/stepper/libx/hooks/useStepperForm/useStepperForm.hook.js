import { useState } from 'react';
import { getStepperState } from '../../components/StepperForm/StepperForm.utils';
import { NavigationDirection } from './useStepperForm.types';
const handleStepChange = (state, navigation, direction) => {
	const { from, to } = navigation;
	const stepState = state.find(step => step.key === from);
	if (!stepState) {
		return state;
	}
	const newState = [...state];
	const index = state.indexOf(stepState);
	newState[index].navigation = {
		...stepState.navigation,
		...(direction === NavigationDirection.NEXT ? { next: to } : { previous: to }),
	};
	return newState;
};
const disableStep = (state, stepKey, cause) => {
	const stepState = state.find(step => step.key === stepKey);
	if (!stepState) {
		return state;
	}
	const nextStep = stepState.navigation?.next;
	const previousStep = stepState.navigation?.previous;
	const index = state.indexOf(stepState);
	let newState = [...state];
	newState[index].navigation = {
		...stepState.navigation,
		disableCause: cause,
	};
	if (nextStep) {
		newState = handleStepChange(
			newState,
			{ from: nextStep, to: previousStep },
			NavigationDirection.PREVIOUS,
		);
	}
	if (previousStep) {
		newState = handleStepChange(
			newState,
			{ from: previousStep, to: nextStep },
			NavigationDirection.NEXT,
		);
	}
	return newState;
};
const enableStep = (state, stepKey) => {
	const stepState = state.find(step => step.key === stepKey);
	if (!stepState) {
		return state;
	}
	const nextStep = stepState.navigation?.next;
	const previousStep = stepState.navigation?.previous;
	const index = state.indexOf(stepState);
	let newState = [...state];
	delete newState[index].navigation?.disableCause;
	if (nextStep) {
		newState = handleStepChange(
			newState,
			{ from: nextStep, to: stepKey },
			NavigationDirection.PREVIOUS,
		);
	}
	if (previousStep) {
		newState = handleStepChange(
			newState,
			{ from: previousStep, to: stepKey },
			NavigationDirection.NEXT,
		);
	}
	return newState;
};
const onChangeStep = (stepperState, stepKey) => {
	const stepToGo = stepperState.find(step => step.key === stepKey);
	if (stepToGo) {
		return stepperState.indexOf(stepToGo);
	}
	return;
};
const useStepperForm = (steps, stepIndex, onSubmit) => {
	const [currentStep, setCurrentStep] = useState(stepIndex);
	const [stepperSteps, setStepperSteps] = useState(getStepperState(steps));
	const currentNavigation = stepperSteps[currentStep].navigation;
	return {
		currentStep,
		disableStep: (stepKey, cause) => setStepperSteps(disableStep(stepperSteps, stepKey, cause)),
		enableStep: stepKey => setStepperSteps(enableStep(stepperSteps, stepKey)),
		onNextStep: () => {
			setCurrentStep(
				(currentNavigation && onChangeStep(stepperSteps, currentNavigation.next)) ?? currentStep,
			);
			if (!currentNavigation?.next) {
				onSubmit(currentStep);
			}
		},
		onPreviousStep: () =>
			setCurrentStep(
				(currentNavigation && onChangeStep(stepperSteps, currentNavigation.previous)) ??
					currentStep,
			),
		stepperSteps,
	};
};
export { useStepperForm };
//# sourceMappingURL=useStepperForm.hook.js.map
