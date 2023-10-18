import { ComponentType } from 'react';

import { StepHeaderProps } from './StepHeader/StepHeader.types';

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
	header: StepHeaderProps;
}

export interface StepperProps {
	isLoading?: boolean;
}
