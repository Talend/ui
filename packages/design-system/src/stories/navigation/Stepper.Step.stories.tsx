import { StackVertical, Stepper } from '../../';

export default {
	title: 'Navigation/Stepper/Step',
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

export const Usage = ({ variant, index, title }) => {
	const StepComponent = Stepper.Step[variant];
	StepComponent.displayName = `Step.${variant}`;
	return <StepComponent data-index={index} title={title} />;
};
Usage.argTypes = {
	variant: {
		description: 'Step variation',
		control: {
			type: 'select',
			options: ['Skeleton', 'Enabled', 'Validated', 'InProgress'],
		},
	},
	index: {
		description: 'Step number',
		control: {
			type: 'number',
		},
	},
	title: {
		description: 'Step title',
		control: {
			type: 'text',
		},
	},
};
Usage.args = {
	variant: 'Skeleton',
	index: 1,
	title: 'Lorem ipsum',
};
