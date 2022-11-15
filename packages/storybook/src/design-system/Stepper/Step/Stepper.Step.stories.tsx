import React from 'react';
import { StackVertical, Step } from '@talend/design-system';

export default {
	component: Step,
};

export const Default = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Step.Skeleton />
		<Step.Validated data-index={1} title="Lorem Ipsum" />
		<Step.InProgress data-index={2} title="Lorem Ipsum" />
		<Step.Enabled data-index={3} title="Lorem Ipsum" />
		<Step.Disabled data-index={3} title="Lorem Ipsum" />
		<Step.Disabled tooltip="Here is why" data-index={3} title="Lorem Ipsum" />
	</StackVertical>
);

export const Overflow = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Step.Validated data-index={1} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Step.InProgress data-index={2} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Step.Enabled data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Step.Disabled data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
		<Step.Disabled
			tooltip="Here is why"
			data-index={3}
			title="Lorem Ipsum dolor sit amet non consectetur"
		/>
	</StackVertical>
);
