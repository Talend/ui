import { useState } from 'react';
import { StepperStep } from '../../components/StepperForm/StepperForm.types';
import { NavigationStep, StepperState } from './useStepperForm.types';

const getStepperState = (initialSteps: StepperStep[]) => {
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

const setPrevious = (state: StepperState, navigation: NavigationStep): StepperState => {
	const { from, to } = navigation;
	const stepState = state.find(step => step.key === from);

	if (!stepState) {
		return state;
	}

	const newState: StepperState = [...state];
	const index = state.indexOf(stepState);

	newState[index].navigation = {
		...stepState.navigation,
		previous: to,
	};

	return newState;
};

const setNext = (state: StepperState, navigation: NavigationStep): StepperState => {
	const { from, to } = navigation;
	const stepState = state.find(step => step.key === from);
	if (!stepState) {
		return state;
	}
	const newState: StepperState = [...state];
	const index = state.indexOf(stepState);

	newState[index].navigation = {
		...stepState.navigation,
		next: to,
	};

	return newState;
};

const disableStep = (state: StepperState, stepKey: string, cause: string): StepperState => {
	const stepState = state.find(step => step.key === stepKey);

	if (!stepState) {
		return state;
	}

	const nextStep = stepState.navigation?.next;
	const previousStep = stepState.navigation?.previous;
	const index = state.indexOf(stepState);
	let newState: StepperState = [...state];

	newState[index].navigation = {
		...stepState.navigation,
		disableCause: cause,
	};

	if (nextStep && previousStep) {
		newState = setPrevious(newState, { from: nextStep, to: previousStep });
		newState = setNext(newState, { from: previousStep, to: nextStep });
	}

	return newState;
};

const onChangeStep = (stepperState: StepperState, stepKey?: string) => {
	const stepToGo = stepperState.find(step => step.key === stepKey);

	if (stepToGo) {
		return stepperState.indexOf(stepToGo);
	}

	return;
};

export const useStepperForm = (initialSteps: StepperStep[], initialStepIndex: number) => {
	const [currentStep, setCurrentStep] = useState(initialStepIndex);
	const [stepperState, setStepperState] = useState(getStepperState(initialSteps));

	const currentNavigation = stepperState[currentStep].navigation;

	return {
		currentStep: currentStep,
		steps: stepperState,
		disableStep: (stepKey: string, cause: string) =>
			setStepperState(disableStep(stepperState, stepKey, cause)),
		onNextStep: () =>
			setCurrentStep(
				(currentNavigation && onChangeStep(stepperState, currentNavigation.next)) ?? currentStep,
			),
		onPreviousStep: () =>
			setCurrentStep(
				(currentNavigation && onChangeStep(stepperState, currentNavigation.previous)) ??
					currentStep,
			),
	};
};
