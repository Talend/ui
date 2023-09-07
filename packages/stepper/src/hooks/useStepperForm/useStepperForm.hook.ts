import { useState } from 'react';

import { StepperStep } from '../../components/StepperForm/StepperForm.types';
import { getStepperState } from '../../components/StepperForm/StepperForm.utils';
import { NavigationDirection, NavigationStep, StepperState } from './useStepperForm.types';

const handleStepChange = (
	state: StepperState,
	navigation: NavigationStep,
	direction: NavigationDirection,
): StepperState => {
	const { from, to } = navigation;
	const stepState = state.find(step => step.key === from);

	if (!stepState) {
		return state;
	}

	const newState: StepperState = [...state];
	const index = state.indexOf(stepState);

	newState[index].navigation = {
		...stepState.navigation,
		...(direction === NavigationDirection.NEXT ? { next: to } : { previous: to }),
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

const onChangeStep = (stepperState: StepperState, stepKey?: string) => {
	const stepToGo = stepperState.find(step => step.key === stepKey);

	if (stepToGo) {
		return stepperState.indexOf(stepToGo);
	}

	return;
};

export const useStepperForm = (
	steps: StepperStep[],
	stepIndex: number,
	onSubmit: (currentStep: number) => void,
) => {
	const [currentStep, setCurrentStep] = useState(stepIndex);
	const [stepperSteps, setStepperSteps] = useState(getStepperState(steps));

	const currentNavigation = stepperSteps[currentStep].navigation;

	return {
		currentStep,
		disableStep: (stepKey: string, cause: string) =>
			setStepperSteps(disableStep(stepperSteps, stepKey, cause)),

		enableStep: (stepKey: string) => setStepperSteps(enableStep(stepperSteps, stepKey)),
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
