import { StackVertical, Stepper } from '@talend/design-system';

export default {
	component: Stepper.Step,
};

export const Default = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Stepper.Step.Skeleton />
		<Stepper.Step.Validated data-index={1} title="Lorem Ipsum" />
		<Stepper.Step.InProgress data-index={2} title="Lorem Ipsum" />
		<Stepper.Step.Enabled data-index={3} title="Lorem Ipsum" />
		<Stepper.Step.Disabled data-index={3} title="Lorem Ipsum" />
		<Stepper.Step.Disabled tooltip="Here is why" data-index={3} title="Lorem Ipsum" />
	</StackVertical>
);

export const Overflow = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Stepper.Step.Validated data-index={1} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Stepper.Step.InProgress data-index={2} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Stepper.Step.Enabled data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Stepper.Step.Disabled data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Stepper.Step.Disabled
			tooltip="Here is why"
			data-index={3}
			title="Lorem Ipsum dolor sit amet non consectetur"
		/>
	</StackVertical>
);
