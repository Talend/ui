import { ReactNode } from 'react';

export interface StepperFormFooterProps {
	children?: ReactNode;
	dataFeature?: {
		cancel?: string;
		next?: string;
		previous?: string;
		submit?: string;
	};
	isLoading?: boolean;
	onCancel(): void;
	onNext?(): void;
	onPrevious?(): void;
	onSubmit?(): void;
}

export type StepperFormFooter = StepperFormFooterProps;
