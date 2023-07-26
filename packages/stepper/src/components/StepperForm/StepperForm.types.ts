import { ComponentType } from 'react';
import { StepperFormFooter } from './StepperFormFooter/StepperFormFooter.types';
import { StepperFormHeader } from './StepperFormHeader/StepperFormHeader.types';

export interface StepperStepNavigation {
	disableCause?: string;
	previous?: string;
	next?: string;
}

export interface StepperStep {
	component: ComponentType;
	key: string;
	title: string;
	tooltip?: string;
}

export interface StepperProps {
	footer: StepperFormFooter;
	header: StepperFormHeader;
	initalStepIndex?: number;
	isLoading?: boolean;
	steps: StepperStep[];
}
