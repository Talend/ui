import { useState } from 'react';
import { getStepperState } from '../../components/StepperForm/StepperForm.utils';
import { NavigationStep, StepperState } from './useStepperForm.types';

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

	if (nextStep) {
		newState = setPrevious(newState, { from: nextStep, to: previousStep });
	}

	if (previousStep) {
		newState = setNext(newState, { from: previousStep, to: nextStep });
	}

	return newState;
};

const enableStep = (state: StepperState, stepKey: string): StepperState => {
	const stepState = state.find(step => step.key === stepKey);

	if (!stepState) {
		return state;
	}

	const nextStep = stepState.navigation?.next;
	const previousStep = stepState.navigation?.previous;
	const index = state.indexOf(stepState);
	let newState: StepperState = [...state];

	delete newState[index].navigation?.disableCause;

	if (nextStep) {
		newState = setPrevious(newState, { from: nextStep, to: stepKey });
	}

	if (previousStep) {
		newState = setNext(newState, { from: previousStep, to: stepKey });
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

export const useStepperForm = (steps: StepperState, stepIndex: number) => {
	const [currentStep, setCurrentStep] = useState(stepIndex);
	const [stepperSteps, setStepperSteps] = useState(getStepperState(steps));

	const currentNavigation = stepperSteps[currentStep].navigation;

	return {
		stepperSteps,
		currentStep,
		onDisableStep: (stepKey: string, cause: string) =>
			setStepperSteps(disableStep(stepperSteps, stepKey, cause)),

		onEnableStep: (stepKey: string) => setStepperSteps(enableStep(stepperSteps, stepKey)),
		onNextStep: () =>
			setCurrentStep(
				(currentNavigation && onChangeStep(stepperSteps, currentNavigation.next)) ?? currentStep,
			),
		onPreviousStep: () =>
			setCurrentStep(
				(currentNavigation && onChangeStep(stepperSteps, currentNavigation.previous)) ??
					currentStep,
			),
	};
};
