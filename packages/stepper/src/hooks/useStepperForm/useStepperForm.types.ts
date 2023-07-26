import { StepperStep, StepperStepNavigation } from '../../components/StepperForm/StepperForm.types';

export interface StepState extends StepperStep {
	navigation?: StepperStepNavigation;
}

export type StepperState = StepState[];
export type NavigationStep = { from: string; to: string };
