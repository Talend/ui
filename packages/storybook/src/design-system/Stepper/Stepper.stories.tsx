import { Divider, StackVertical, Stepper } from '@talend/design-system';

export default {
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
