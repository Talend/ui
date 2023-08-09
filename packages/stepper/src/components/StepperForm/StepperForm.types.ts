import { ComponentType } from 'react';
import { StepHeader } from './StepHeader/StepHeader.types';

export interface StepperStepNavigation {
	disableCause?: string;
	previous?: string;
	next?: string;
}

export interface StepperStep {
	component: ComponentType;
	key: string;
	name: string;
	tooltip?: string;
	header: StepHeader;
}

export interface StepperProps {
	isLoading?: boolean;
}
