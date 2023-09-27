import { Divider, StackVertical, Stepper } from '../../';

export default {
	title: 'Navigation/Stepper/Stepper',
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

export const Usage = ({ variant, ...props }: any) => {
	const StepperComponent = Stepper[variant];
	StepperComponent.displayName = `Stepper.${variant}`;
	return (
		<StepperComponent {...props}>
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
		options: ['Vertical', 'Horizontal'],
		control: {
			type: 'select',
		},
	},
	currentStepIndex: {
		description: 'Current step index',
		control: {
			type: 'number',
		},
	},
};
