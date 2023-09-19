import { Divider, StackVertical, Stepper } from '../';

export default {
	title: 'Layout/Stepper',
	component: Stepper,
};

export const Vertical = () => (
	<Stepper>
		<Stepper.Step.Validated title="Validated step" />
		<Stepper.Step.InProgress title="Current step" />
		<Stepper.Step.Enabled title="Next step" />
		<Stepper.Step.Enabled title="Next step" />
	</Stepper>
);

export const Horizontal = () => (
	<Stepper.Horizontal>
		<Stepper.Step.Validated title="Validated step" />
		<Stepper.Step.InProgress title="Current step" />
		<Stepper.Step.Enabled title="Next step" />
	</Stepper.Horizontal>
);

export const VerticalLoading = () => (
	<Stepper>
		<Stepper.Step.Skeleton />
		<Stepper.Step.Skeleton />
		<Stepper.Step.Skeleton />
		<Stepper.Step.Skeleton />
	</Stepper>
);

export const HorizontalLoading = () => (
	<Stepper.Horizontal>
		<Stepper.Step.Skeleton />
		<Stepper.Step.Skeleton />
		<Stepper.Step.Skeleton />
	</Stepper.Horizontal>
);

export const Overflows = () => (
	<StackVertical gap="M" justify="center" align="center">
		<h4>Vertical stepper</h4>
		<Stepper>
			<Stepper.Step.Validated title="Validated step with copy that breaks the width limit" />
			<Stepper.Step.InProgress title="Current step with copy that breaks the width limit" />
		</Stepper>
		<Divider />
		<h4>Horizontal stepper</h4>
		<Stepper.Horizontal>
			<Stepper.Step.Validated title="Validated step with copy that breaks the width limit" />
			<Stepper.Step.InProgress title="Current step with copy that breaks the width limit" />
		</Stepper.Horizontal>
	</StackVertical>
);

export const Usage = ({ currentStepIndex, variant }: any) => {
	const StepperComponent = Stepper[variant];
	StepperComponent.displayName = `Stepper.${variant}`;
	return (
		<StepperComponent currentStepIndex={currentStepIndex}>
			<Stepper.Step.Validated title="Validated" />
			<Stepper.Step.InProgress title="In progress" />
			<Stepper.Step.Enabled title="Enabled" />
		</StepperComponent>
	);
};

Usage.args = {
	variant: 'Vertical',
	currentStepIndex: 1,
};
Usage.argTypes = {
	variant: {
		description: 'Stepper variation',
		control: {
			type: 'select',
			options: ['Vertical', 'Horizontal'],
		},
	},
	currentStepIndex: {
		description: 'Current step index',
		control: {
			type: 'number',
		},
	},
};
