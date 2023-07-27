import { ComponentType } from 'react';
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
	header: StepperFormHeader;
	isLoading?: boolean;
}
