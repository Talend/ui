export interface StepperFormFooterProps {
	dataFeature?: {
		cancel?: string;
		next?: string;
		previous?: string;
		submit?: string;
	};
	extraActions?: JSX.Element[];
	isLoading?: boolean;
	onCancel(): void;
	onNext?(): void;
	onPrevious?(): void;
	onSubmit?(): void;
}

export type StepperFormFooter = StepperFormFooterProps;
