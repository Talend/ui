import { StoryFn } from '@storybook/react';

import {
	Tag,
	TagDefault,
	TagDestructive,
	TagInformation,
	TagSuccess,
	TagWarning,
	TagBeta,
} from '../../';

export default {
	component: Tag,
	title: 'Messaging/Tag',
};

export const Default: StoryFn<typeof TagDefault> = props => (
	<TagDefault {...props}>Example</TagDefault>
);

export const Information: StoryFn<typeof TagInformation> = props => (
	<TagInformation {...props}>Example</TagInformation>
);

export const Success: StoryFn<typeof TagSuccess> = props => (
	<TagSuccess {...props}>Example</TagSuccess>
);

export const Warning: StoryFn<typeof TagWarning> = props => (
	<TagWarning {...props}>Example</TagWarning>
);

export const Destructive: StoryFn<typeof TagDestructive> = props => (
	<TagDestructive {...props}>Example</TagDestructive>
);

export const Beta: StoryFn<typeof TagDestructive> = props => <TagBeta {...props}>Example</TagBeta>;

export const VariantDefault: StoryFn<typeof Tag> = props => (
	<Tag {...props} variant="default">
		Example
	</Tag>
);
VariantDefault.parameters = {
	chromatic: { disableSnapshot: true },
};

export const VariantInformation: StoryFn<typeof Tag> = props => (
	<Tag {...props} variant="information">
		Example
	</Tag>
);
VariantInformation.parameters = {
	chromatic: { disableSnapshot: true },
};

export const VariantSuccess: StoryFn<typeof Tag> = props => (
	<Tag {...props} variant="success">
		Example
	</Tag>
);
VariantSuccess.parameters = {
	chromatic: { disableSnapshot: true },
};

export const VariantWarning: StoryFn<typeof Tag> = props => (
	<Tag {...props} variant="warning">
		Example
	</Tag>
);
VariantWarning.parameters = {
	chromatic: { disableSnapshot: true },
};

export const VariantDestructive: StoryFn<typeof Tag> = props => (
	<Tag {...props} variant="destructive">
		Example
	</Tag>
);
VariantDestructive.parameters = {
	chromatic: { disableSnapshot: true },
};

export const VariantBeta: StoryFn<typeof Tag> = props => (
	<Tag {...props} variant="beta">
		Example
	</Tag>
);
VariantBeta.parameters = {
	chromatic: { disableSnapshot: true },
};

export const Ellipsis: StoryFn<typeof TagDefault> = props => (
	<TagDefault {...props}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum nunc non diam vehicula
		gravida. Pellentesque nisi velit, porttitor nec facilisis at, egestas quis magna. Sed tempus
		convallis orci, quis aliquet risus porta eu. In hac habitasse platea dictumst. Vestibulum porta,
		magna quis porta commodo, lacus elit venenatis eros, varius fringilla enim justo sed lectus.
		Donec at tortor imperdiet, tincidunt lacus ac, viverra nisi. Vivamus feugiat, ligula in
		venenatis faucibus, quam justo molestie libero, bibendum feugiat sapien turpis in neque.
	</TagDefault>
);

export const Usage: StoryFn<typeof Tag> = props => <Tag {...props}>Example</Tag>;
Usage.args = {
	variant: 'default',
	children: 'Lorem ipsum',
};
Usage.argTypes = {
	variant: {
		control: 'select',
		options: ['default', 'information', 'success', 'warning', 'destructive'],
	},
	children: {
		description: 'Tag content',
	},
};
